package com.example.demo.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.CartItem;
import com.example.demo.entities.Order;
import com.example.demo.entities.OrderDetail;
import com.example.demo.repositories.OrderDetailRepository;
import com.example.demo.repositories.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private PaymentService paymentService;

    @Transactional
    public Order placeOrder(Long userId, String deliveryAddress, PaymentDetails paymentDetails) {
        List<CartItem> cartItems = cartService.getCartItems(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Cart is empty");
        }

        // Fetch prices for each menu item and calculate total price
        double totalPrice = cartItems.stream()
            .mapToDouble(cartItem -> {
                MenuItem menuItem = menuItemRepository.findById(cartItem.getMenuItemId())
                    .orElseThrow(() -> new IllegalStateException("Menu item not found."));
                return menuItem.getPrice() * cartItem.getQuantity();
            })
            .sum();

        Order newOrder = new Order();
        newOrder.setUserId(userId);
        newOrder.setTotalPrice(totalPrice);
        newOrder.setStatus("Pending");
        newOrder.setOrderTime(LocalDateTime.now());
        newOrder.setDeliveryAddress(deliveryAddress);
        Order savedOrder = orderRepository.save(newOrder);

        // Create order details
        List<OrderDetail> orderDetails = cartItems.stream().map(cartItem -> {
            MenuItem menuItem = menuItemRepository.findById(cartItem.getMenuItemId())
                .orElseThrow(() -> new IllegalStateException("Menu item not found."));

            OrderDetail detail = new OrderDetail();
            detail.setOrder(savedOrder);
            detail.setMenuItemId(cartItem.getMenuItemId());
            detail.setQuantity(cartItem.getQuantity());
            detail.setPriceAtOrder(menuItem.getPrice());
            return detail;
        }).collect(Collectors.toList());

        orderDetailRepository.saveAll(orderDetails);

        boolean paymentSuccess = paymentService.processPayment(savedOrder, paymentDetails);
        if (paymentSuccess) {
            savedOrder.setStatus("Confirmed");
            orderRepository.save(savedOrder);
            cartService.clearCart(userId);
        } else {
            throw new IllegalStateException("Payment failed");
        }
        
        return savedOrder;
    }

   
}