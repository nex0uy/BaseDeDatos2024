package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.DataAccess.FinalPredictionDataAccess;
import com.obligatorio.pencaUCU.DataAccess.PredictionDataAccess;
import com.obligatorio.pencaUCU.DataAccess.UserDataAccess;
import com.obligatorio.pencaUCU.Models.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLogic {

    @Autowired
    private UserDataAccess userDataAccess;

    @Autowired
    private PredictionDataAccess predictionDataAccess;

    @Autowired
    private FinalPredictionDataAccess finalPredictionDataAccess;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    public void saveUser(User user) {
        userDataAccess.save(user);
    }

    public User getUserById(int id) {
        return userDataAccess.findById(id);
    }

    public List<User> getAllUsers() {
        return userDataAccess.findAll();
    }

    public User findUserByEmail(String email) {
        return userDataAccess.findByEmail(email);
    }

    public boolean passwordMatches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public int calculateTotalPointsByUserId(int userId) {
        int predictionPoints = predictionDataAccess.calculateTotalPointsByUserId(userId);
        int finalPredictionPoints = finalPredictionDataAccess.calculateTotalPointsByUserId(userId);
        return predictionPoints + finalPredictionPoints;
    }


    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

}
