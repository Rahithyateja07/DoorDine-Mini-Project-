package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
	 List<MenuItem> findByRestaurantId(Long restaurantId);
	

}
