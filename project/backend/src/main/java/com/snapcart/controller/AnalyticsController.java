package com.snapcart.controller;

import com.snapcart.model.AnalyticsData;
import com.snapcart.model.Receipt;
import com.snapcart.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<AnalyticsData> getAnalyticsSummary() {
        try {
            AnalyticsData analytics = analyticsService.getAnalyticsSummary();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Double>> getMonthlySpending() {
        try {
            AnalyticsData analytics = analyticsService.getAnalyticsSummary();
            return ResponseEntity.ok(analytics.getMonthlySpending());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/top-items")
    public ResponseEntity<Map<String, Long>> getTopItems() {
        try {
            AnalyticsData analytics = analyticsService.getAnalyticsSummary();
            return ResponseEntity.ok(analytics.getTopItems());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/recent-receipts")
    public ResponseEntity<List<Receipt>> getRecentReceipts(@RequestParam(defaultValue = "5") int limit) {
        try {
            List<Receipt> recentReceipts = analyticsService.getRecentReceipts(limit);
            return ResponseEntity.ok(recentReceipts);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}