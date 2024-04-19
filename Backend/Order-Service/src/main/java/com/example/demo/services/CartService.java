package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.entities.CartItem;
import com.example.demo.repositories.CartItemRepository;
import com.example.demo.repositories.CartRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MenuItemRepository menuItemRepository;

    @Autowired
    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, MenuItemRepository menuItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Transactional
    public Cart getOrCreateCartForUser(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    return cartRepository.save(newCart);
                });
    }

    @Transactional
    public CartItem addCartItem(Long userId, Long menuItemId, Integer quantity) {
        Cart cart = getOrCreateCartForUser(userId);
        Optional<MenuItem> menuItem = menuItemRepository.findById(menuItemId);
        if (!menuItem.isPresent()) {
            throw new RuntimeException("Menu item not found.");
        }

        Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndMenuItemId(cart, menuItemId);
        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            return cartItemRepository.save(cartItem);
        } else {
            CartItem newCartItem = new CartItem();
            newCartItem.setCart(cart);
            newCartItem.setMenuItemId(menuItemId);
            newCartItem.setQuantity(quantity);
            return cartItemRepository.save(newCartItem);
        }
    }

    @Transactional
    public void removeCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found."));
        cartItemRepository.delete(cartItem);
    }

    public List<CartItem> getCartItems(Long userId) {
        Cart cart = getOrCreateCartForUser(userId);
        return cartItemRepository.findByCart(cart);
    }
    
 
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new IllegalStateException("Cart not found for user: " + userId));
        cartItemRepository.deleteByCart(cart);
    }


}
