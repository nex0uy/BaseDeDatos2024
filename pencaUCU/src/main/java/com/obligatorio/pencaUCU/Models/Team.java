package com.obligatorio.pencaUCU.Models;

public class Team {
    private int id;
    private String name;

    // Constructors
    public Team() {}

    public Team(String name) {
        this.name = name;
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
}
