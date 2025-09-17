package com.snapcart.service;

import com.snapcart.model.Receipt;
import com.snapcart.model.ReceiptItem;
import com.snapcart.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;
    
    @Autowired
    private OCRService ocrService;

    public Receipt processReceipt(MultipartFile file) throws IOException {
        // Extract text from image
        String extractedText = ocrService.extractTextFromImage(file);
        
        // Parse items from text
        List<ReceiptItem> items = ocrService.parseReceiptItems(extractedText);
        
        // Extract store name
        String storeName = ocrService.extractStoreName(extractedText);
        
        // Calculate total
        Double totalAmount = ocrService.calculateTotal(items);
        
        // Create receipt entity
        Receipt receipt = new Receipt(
            file.getOriginalFilename(),
            null, // imageUrl - could be implemented with file storage service
            extractedText,
            items,
            totalAmount,
            storeName
        );
        
        return receiptRepository.save(receipt);
    }

    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    public Optional<Receipt> getReceiptById(String id) {
        return receiptRepository.findById(id);
    }

    public void deleteReceipt(String id) {
        receiptRepository.deleteById(id);
    }

    public Receipt updateReceipt(String id, Receipt receipt) {
        receipt.setId(id);
        return receiptRepository.save(receipt);
    }
}