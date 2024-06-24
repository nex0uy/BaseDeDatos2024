package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.UserLogic;
import com.obligatorio.pencaUCU.Models.User;
import com.obligatorio.pencaUCU.Security.JWTAuthenticationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserLogic userLogic;

    @Autowired
    private JWTAuthenticationConfig jwtAuthenticationConfig;

@PostMapping("/login")
public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginRequest) {
    User user = userLogic.findUserByEmail(loginRequest.getEmail());
    if (user != null && userLogic.passwordMatches(loginRequest.getPassword(), user.getPassword())) {
        String token = jwtAuthenticationConfig.getJWTToken(user.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(401).body(Map.of("error", "Email o password invalidos!"));
    }
}


    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        user.setRoleId(1); // Asumiendo que el rol USER tiene el id 1
        user.setPassword(userLogic.encodePassword(user.getPassword())); // Encriptar la contraseña
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
