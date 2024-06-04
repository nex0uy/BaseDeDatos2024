package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.PredictionLogic;
import com.obligatorio.pencaUCU.BusinessLogic.UserLogic;
import com.obligatorio.pencaUCU.Models.User;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserLogic userLogic;

    @Autowired
    private PredictionLogic predictionLogic;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        user.setRoleId(1); // Asumiendo que el rol USER tiene el id 1
        userLogic.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userLogic.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userLogic.getAllUsers());
    }

    @GetMapping("/points/{userId}")
    public ResponseEntity<Map<String, Object>> getUserPoints(@PathVariable int userId) {
        int points = predictionLogic.calculateTotalPointsByUserId(userId);
        return ResponseEntity.ok(Map.of("userId", userId, "points", points));
    }

}
