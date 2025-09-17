package com.snapcart.service;

import com.snapcart.model.AnalyticsData;
import com.snapcart.model.Receipt;
import com.snapcart.model.ReceiptItem;
import com.snapcart.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private ReceiptRepository receiptRepository;

    public AnalyticsData getAnalyticsSummary() {
        List<Receipt> allReceipts = receiptRepository.findAll();
        
        Double totalSpent = allReceipts.stream()
                .mapToDouble(receipt -> receipt.getTotalAmount() != null ? receipt.getTotalAmount() : 0.0)
                .sum();
        
        Integer totalReceipts = allReceipts.size();
        
        Double averageReceiptAmount = totalReceipts > 0 ? totalSpent / totalReceipts : 0.0;
        
        Map<String, Double> monthlySpending = getMonthlySpending(allReceipts);
        Map<String, Long> topItems = getTopItems(allReceipts);
        Map<String, Double> categorySpending = getCategorySpending(allReceipts);
        
        return new AnalyticsData(totalSpent, totalReceipts, averageReceiptAmount,
                monthlySpending, topItems, categorySpending);
    }

    public Map<String, Double> getMonthlySpending(List<Receipt> receipts) {
        Map<String, Double> monthlySpending = new LinkedHashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        
        receipts.stream()
                .collect(Collectors.groupingBy(
                        receipt -> receipt.getCreatedDate() != null ? 
                                receipt.getCreatedDate().format(formatter) : "Unknown",
                        Collectors.summingDouble(receipt -> 
                                receipt.getTotalAmount() != null ? receipt.getTotalAmount() : 0.0)
                ))
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> monthlySpending.put(entry.getKey(), entry.getValue()));
        
        return monthlySpending;
    }

    public Map<String, Long> getTopItems(List<Receipt> receipts) {
        Map<String, Long> itemCounts = new HashMap<>();
        
        receipts.stream()
                .filter(receipt -> receipt.getItems() != null)
                .flatMap(receipt -> receipt.getItems().stream())
                .forEach(item -> {
                    String itemName = item.getName();
                    if (itemName != null && !itemName.trim().isEmpty()) {
                        itemCounts.merge(itemName, 1L, Long::sum);
                    }
                });
        
        return itemCounts.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(10)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    public Map<String, Double> getCategorySpending(List<Receipt> receipts) {
        return receipts.stream()
                .collect(Collectors.groupingBy(
                        receipt -> receipt.getCategory() != null ? receipt.getCategory() : "General",
                        Collectors.summingDouble(receipt -> 
                                receipt.getTotalAmount() != null ? receipt.getTotalAmount() : 0.0)
                ));
    }

    public List<Receipt> getRecentReceipts(int limit) {
        return receiptRepository.findAll()
                .stream()
                .sorted((r1, r2) -> {
                    if (r1.getCreatedDate() == null) return 1;
                    if (r2.getCreatedDate() == null) return -1;
                    return r2.getCreatedDate().compareTo(r1.getCreatedDate());
                })
                .limit(limit)
                .collect(Collectors.toList());
    }
}