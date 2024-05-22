package com.obligatorio.pencaUCU.Models;

import java.sql.Timestamp;

public class Match {
    private int id;
    private Timestamp date;
    private Integer teamOneScore;
    private Integer teamTwoScore;
    private String phase;
    private int teamOneId;
    private int teamTwoId;

    // Constructors
    public Match() {}

    public Match(Timestamp date, String phase, int teamOneId, int teamTwoId) {
        this.date = date;
        this.phase = phase;
        this.teamOneId = teamOneId;
        this.teamTwoId = teamTwoId;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public Integer getTeamOneScore() {
        return teamOneScore;
    }

    public void setTeamOneScore(Integer teamOneScore) {
        this.teamOneScore = teamOneScore;
    }

    public Integer getTeamTwoScore() {
        return teamTwoScore;
    }

    public void setTeamTwoScore(Integer teamTwoScore) {
        this.teamTwoScore = teamTwoScore;
    }

    public String getPhase() {
        return phase;
    }

    public void setPhase(String phase) {
        this.phase = phase;
    }

    public int getTeamOneId() {
        return teamOneId;
    }

    public void setTeamOneId(int teamOneId) {
        this.teamOneId = teamOneId;
    }

    public int getTeamTwoId() {
        return teamTwoId;
    }

    public void setTeamTwoId(int teamTwoId) {
        this.teamTwoId = teamTwoId;
    }
}
