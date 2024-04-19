package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CartItemRequest;
import com.example.demo.models.Cart;
import com.example.demo.models.CartItem;
import com.example.demo.services.CartService;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private CartService cartService;
    

    @PostMapping("/carts")
    public ResponseEntity<Cart> createCart() {
        Cart cart = cartService.getOrCreateCart();
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/carts/{cartId}/items")
    public ResponseEntity<CartItem> addItemToCart(@PathVariable Long cartId, @RequestBody CartItemRequest cartItemRequest) {
        CartItem newItem = cartService.addCartItem(cartId, cartItemRequest.getMenuItemId(), cartItemRequest.getQuantity());
        return ResponseEntity.ok(newItem);
    }

    @GetMapping("/carts/{cartId}/items")
    public ResponseEntity<List<CartItem>> listCartItems(@PathVariable Long cartId) {
        List<CartItem> items = cartService.listCartItems(cartId);
        return ResponseEntity.ok(items);
    }
}
