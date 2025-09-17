package com.snapcart.repository;

import com.snapcart.model.Receipt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReceiptRepository extends MongoRepository<Receipt, String> {
    
    List<Receipt> findByCreatedDateBetween(LocalDateTime start, LocalDateTime end);
    
    List<Receipt> findByStoreContainingIgnoreCase(String store);
    
    List<Receipt> findByCategoryIgnoreCase(String category);
    
    @Aggregation(pipeline = {
        "{ $unwind: '$items' }",
        "{ $group: { _id: '$items.name', count: { $sum: 1 }, totalPrice: { $sum: '$items.price' } } }",
        "{ $sort: { count: -1 } }",
        "{ $limit: 10 }"
    })
    List<Object> findTopItems();
    
    @Aggregation(pipeline = {
        "{ $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdDate' } }, " +
        "totalAmount: { $sum: '$totalAmount' }, count: { $sum: 1 } } }",
        "{ $sort: { '_id': 1 } }"
    })
    List<Object> getMonthlySpendingSummary();
}