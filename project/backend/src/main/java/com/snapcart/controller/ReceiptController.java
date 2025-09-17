package com.snapcart.controller;

import com.snapcart.model.Receipt;
import com.snapcart.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/receipts")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadReceipt(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please select a file to upload");
            }
            
            Receipt receipt = receiptService.processReceipt(file);
            return ResponseEntity.ok(receipt);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process receipt: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Receipt>> getAllReceipts() {
        List<Receipt> receipts = receiptService.getAllReceipts();
        return ResponseEntity.ok(receipts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receipt> getReceiptById(@PathVariable String id) {
        Optional<Receipt> receipt = receiptService.getReceiptById(id);
        return receipt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receipt> updateReceipt(@PathVariable String id, 
                                               @RequestBody Receipt receipt) {
        try {
            Receipt updatedReceipt = receiptService.updateReceipt(id, receipt);
            return ResponseEntity.ok(updatedReceipt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceipt(@PathVariable String id) {
        try {
            receiptService.deleteReceipt(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}