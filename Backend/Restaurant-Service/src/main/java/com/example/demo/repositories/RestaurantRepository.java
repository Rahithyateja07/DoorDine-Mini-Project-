package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	List<Restaurant> findByNameContainingIgnoreCase(String name);

}
