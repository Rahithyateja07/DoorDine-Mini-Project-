package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.entities.Order;
import com.example.demo.entities.PaymentaDetails;

@Service
public class PaymentService {

    public boolean processPayment(Order order, PaymentaDetails paymentDetails) {
        // Simulate payment validation and processing
        //integrate with a payment gateway here
        // This example always returns true for simplicity
        return true;
    }
}
