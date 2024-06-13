package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.UserLogic;
import com.obligatorio.pencaUCU.Models.User;
import com.obligatorio.pencaUCU.Security.JwtUtil;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserLogic userLogic;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User loginRequest) {
        User user = userLogic.findUserByEmail(loginRequest.getEmail());
        if (user != null && userLogic.passwordMatches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Email o password invalidos!"));
        }
    }


    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        user.setRoleId(1); // Asumiendo que el rol USER tiene el id 1
        userLogic.saveUser(user);
  
        User savedUser = userLogic.findUserByEmail(user.getEmail());
        Map<String, Object> response = Map.of(
            "message", "Usuario registrado con exito!",
            "userId", savedUser.getId()
        );
        return ResponseEntity.ok(response);
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
        int points = userLogic.calculateTotalPointsByUserId(userId);
        return ResponseEntity.ok(Map.of("userId", userId, "points", points));
    }

}
