package com.example.UserServiceSecurity.services;

import com.example.UserServiceSecurity.models.User;
import com.example.UserServiceSecurity.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public List<User> getUsers()
    {
        return userRepository.findAll();
    }
    public User createUser(User user)
    {
        user.setId(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return user;
    }
    public User getUserByEmail(String username)
    {
        User user=userRepository.findByEmail(username).orElseThrow(()->new RuntimeException("User not found"));

        return user;
    }
    public User updateUserPassword(User user)
    {
        User user1=userRepository.findByEmail(user.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        user1.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user1);
    }
}
