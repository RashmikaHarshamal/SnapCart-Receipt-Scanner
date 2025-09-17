package com.snapcart.service;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import com.snapcart.model.ReceiptItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OCRService {

    @Autowired
    private ImageAnnotatorClient imageAnnotatorClient;

    public String extractTextFromImage(MultipartFile file) throws IOException {
        byte[] data = file.getBytes();
        ByteString imgBytes = ByteString.copyFrom(data);

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                .addFeatures(feat)
                .setImage(img)
                .build();

        BatchAnnotateImagesResponse response = imageAnnotatorClient
                .batchAnnotateImages(Arrays.asList(request));
        
        List<AnnotateImageResponse> responses = response.getResponsesList();

        for (AnnotateImageResponse res : responses) {
            if (res.hasError()) {
                throw new RuntimeException("Error: " + res.getError().getMessage());
            }

            for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                return annotation.getDescription();
            }
        }
        
        return "";
    }

    public List<ReceiptItem> parseReceiptItems(String text) {
        List<ReceiptItem> items = new ArrayList<>();
        
        // Enhanced regex patterns for better extraction
        Pattern pricePattern = Pattern.compile("\\$?([0-9]+\\.?[0-9]*)", Pattern.CASE_INSENSITIVE);
        Pattern itemPattern = Pattern.compile("^([A-Za-z][A-Za-z0-9\\s\\-&']{2,30}).*?\\$?([0-9]+\\.?[0-9]*)$", Pattern.MULTILINE);
        
        String[] lines = text.split("\n");
        
        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty() || line.length() < 3) continue;
            
            // Skip common receipt headers/footers
            if (isHeaderFooterLine(line)) continue;
            
            Matcher itemMatcher = itemPattern.matcher(line);
            if (itemMatcher.find()) {
                String itemName = itemMatcher.group(1).trim();
                String priceStr = itemMatcher.group(2);
                
                try {
                    Double price = Double.parseDouble(priceStr);
                    if (price > 0 && price < 1000) { // reasonable price range
                        items.add(new ReceiptItem(itemName, price, 1));
                    }
                } catch (NumberFormatException e) {
                    // Skip invalid prices
                }
            }
        }
        
        // Fallback: extract prices from lines
        if (items.isEmpty()) {
            items = extractItemsWithFallback(lines);
        }
        
        return items;
    }
    
    private List<ReceiptItem> extractItemsWithFallback(String[] lines) {
        List<ReceiptItem> items = new ArrayList<>();
        Pattern pricePattern = Pattern.compile("\\$?([0-9]+\\.[0-9]{2})");
        
        for (String line : lines) {
            line = line.trim();
            if (isHeaderFooterLine(line)) continue;
            
            Matcher priceMatcher = pricePattern.matcher(line);
            if (priceMatcher.find()) {
                String priceStr = priceMatcher.group(1);
                String itemName = line.replaceAll("\\$?[0-9]+\\.[0-9]{2}", "").trim();
                
                if (!itemName.isEmpty() && itemName.length() > 2) {
                    try {
                        Double price = Double.parseDouble(priceStr);
                        if (price > 0 && price < 1000) {
                            items.add(new ReceiptItem(itemName, price, 1));
                        }
                    } catch (NumberFormatException e) {
                        // Skip invalid prices
                    }
                }
            }
        }
        
        return items;
    }
    
    private boolean isHeaderFooterLine(String line) {
        String lowerLine = line.toLowerCase();
        return lowerLine.contains("total") || 
               lowerLine.contains("subtotal") ||
               lowerLine.contains("tax") ||
               lowerLine.contains("change") ||
               lowerLine.contains("cash") ||
               lowerLine.contains("card") ||
               lowerLine.contains("receipt") ||
               lowerLine.contains("thank") ||
               lowerLine.length() < 3 ||
               lowerLine.matches(".*[0-9]{3,}.*"); // Skip long numbers (like transaction IDs)
    }
    
    public String extractStoreName(String text) {
        String[] lines = text.split("\n");
        
        // Usually store name is in the first few lines
        for (int i = 0; i < Math.min(5, lines.length); i++) {
            String line = lines[i].trim();
            if (line.length() > 3 && line.length() < 50 && 
                !line.matches(".*[0-9]+.*") && // No numbers
                !line.toLowerCase().contains("receipt")) {
                return line;
            }
        }
        
        return "Unknown Store";
    }
    
    public Double calculateTotal(List<ReceiptItem> items) {
        return items.stream()
                .mapToDouble(item -> item.getTotalPrice() != null ? item.getTotalPrice() : 0.0)
                .sum();
    }
}