package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Cart;
import com.example.demo.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	List<CartItem> findByCart(Cart cart);

	Optional<CartItem> findByCartAndMenuItemId(Cart cart, Long menuItemId);
	void deleteByCart(Cart cart);

}
