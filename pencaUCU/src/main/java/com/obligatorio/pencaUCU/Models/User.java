package com.obligatorio.pencaUCU.Models;

import java.sql.Timestamp;

public class User {
    private int id;
    private String name;
    private String email;
    private String password;
    private Timestamp registrationDate;
    private int roleId;
    private String career;

    public User() {}

    public User(String name, String email, String password, Timestamp registrationDate, int roleId, String career) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.registrationDate = registrationDate;
        this.roleId = roleId;
        this.career = career;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Timestamp registrationDate) {
        this.registrationDate = registrationDate;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }
}
