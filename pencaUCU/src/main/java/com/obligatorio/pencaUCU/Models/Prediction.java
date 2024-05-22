package com.obligatorio.pencaUCU.Models;

public class Prediction {
    private int id;
    private int userId;
    private int matchId;
    private int teamOneScore;
    private int teamTwoScore;
    private int points;

    // Constructors
    public Prediction() {}

    public Prediction(int userId, int matchId, int teamOneScore, int teamTwoScore) {
        this.userId = userId;
        this.matchId = matchId;
        this.teamOneScore = teamOneScore;
        this.teamTwoScore = teamTwoScore;
        this.points = 0; // Default points to 0
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMatchId() {
        return matchId;
    }

    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

    public int getTeamOneScore() {
        return teamOneScore;
    }

    public void setTeamOneScore(int teamOneScore) {
        this.teamOneScore = teamOneScore;
    }

    public int getTeamTwoScore() {
        return teamTwoScore;
    }

    public void setTeamTwoScore(int teamTwoScore) {
        this.teamTwoScore = teamTwoScore;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
