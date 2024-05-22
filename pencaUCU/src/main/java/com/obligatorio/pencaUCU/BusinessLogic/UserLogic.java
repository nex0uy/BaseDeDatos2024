package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.Models.User;
import com.obligatorio.pencaUCU.DataAccess.UserDataAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLogic {

    @Autowired
    private UserDataAccess userDataAccess;

    public void saveUser(User user) {
        userDataAccess.save(user);
    }

    public User getUserById(int id) {
        return userDataAccess.findById(id);
    }

    public List<User> getAllUsers() {
        return userDataAccess.findAll();
    }
}
