package com.obligatorio.pencaUCU.Dtos;

import com.obligatorio.pencaUCU.Models.Team;

public class TeamDTO {
    private int id;
    private String name;

    // Constructors
    public TeamDTO() {}

    public TeamDTO(Team team) {
        this.id = team.getId();
        this.name = team.getName();
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
