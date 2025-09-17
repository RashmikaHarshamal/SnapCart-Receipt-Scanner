package com.snapcart.model;

public class ReceiptItem {
    private String name;
    private Double price;
    private Integer quantity;
    private String category;

    // Constructors
    public ReceiptItem() {}

    public ReceiptItem(String name, Double price, Integer quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity != null ? quantity : 1;
        this.category = "General";
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getTotalPrice() {
        return price != null && quantity != null ? price * quantity : price;
    }
}