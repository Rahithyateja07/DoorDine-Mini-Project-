package com.example.demo.controllers;//package com.example.demo.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.demo.services.OrderService;
//
//@RestController
//@RequestMapping("/api/orders")
//public class OrderController {
//    @Autowired
//    private OrderService orderService;
//
//    @PostMapping("/")
//    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
//        return new ResponseEntity<>(orderService.createOrder(order), HttpStatus.CREATED);
//    }
//}
import com.example.demo.models.Order;
import com.example.demo.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("http://localhost:3000/")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitOrder(@RequestBody Order order) {

        orderService.saveOrder(order); // Save order
        return ResponseEntity.ok("Order submitted successfully");
    }
    @GetMapping("/getAllOrders/{email}")
    public List<Order> getOrdersThroughEmail(@PathVariable String email) {
        return orderService.getOrdersByEmail(email);
    }
}
