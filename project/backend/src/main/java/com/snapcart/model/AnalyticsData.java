package com.snapcart.model;

import java.util.Map;

public class AnalyticsData {
    private Double totalSpent;
    private Integer totalReceipts;
    private Double averageReceiptAmount;
    private Map<String, Double> monthlySpending;
    private Map<String, Long> topItems;
    private Map<String, Double> categorySpending;

    // Constructors
    public AnalyticsData() {}

    public AnalyticsData(Double totalSpent, Integer totalReceipts, 
                        Double averageReceiptAmount, Map<String, Double> monthlySpending,
                        Map<String, Long> topItems, Map<String, Double> categorySpending) {
        this.totalSpent = totalSpent;
        this.totalReceipts = totalReceipts;
        this.averageReceiptAmount = averageReceiptAmount;
        this.monthlySpending = monthlySpending;
        this.topItems = topItems;
        this.categorySpending = categorySpending;
    }

    // Getters and Setters
    public Double getTotalSpent() { return totalSpent; }
    public void setTotalSpent(Double totalSpent) { this.totalSpent = totalSpent; }

    public Integer getTotalReceipts() { return totalReceipts; }
    public void setTotalReceipts(Integer totalReceipts) { this.totalReceipts = totalReceipts; }

    public Double getAverageReceiptAmount() { return averageReceiptAmount; }
    public void setAverageReceiptAmount(Double averageReceiptAmount) { 
        this.averageReceiptAmount = averageReceiptAmount; 
    }

    public Map<String, Double> getMonthlySpending() { return monthlySpending; }
    public void setMonthlySpending(Map<String, Double> monthlySpending) { 
        this.monthlySpending = monthlySpending; 
    }

    public Map<String, Long> getTopItems() { return topItems; }
    public void setTopItems(Map<String, Long> topItems) { this.topItems = topItems; }

    public Map<String, Double> getCategorySpending() { return categorySpending; }
    public void setCategorySpending(Map<String, Double> categorySpending) { 
        this.categorySpending = categorySpending; 
    }
}