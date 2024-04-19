package com.example.demo.services;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Cart;
import com.example.demo.models.CartItem;
import com.example.demo.models.MenuItem;
import com.example.demo.repositories.CartItemRepository;
import com.example.demo.repositories.CartRepository;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Transactional
    public Cart getOrCreateCart() {
        
        return cartRepository.save(new Cart());
    }

    public CartItem addCartItem(Long cartId, Long menuItemId, int quantity) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        CartItem newItem = new CartItem();
        newItem.setCart(cart);
        newItem.setMenuItem(new MenuItem()); // Ideally, fetch from MenuItemRepository
        newItem.setQuantity(quantity);
        return cartItemRepository.save(newItem);
    }

    public List<CartItem> listCartItems(Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }
}