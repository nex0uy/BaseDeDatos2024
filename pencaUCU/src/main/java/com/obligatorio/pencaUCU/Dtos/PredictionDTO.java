package com.obligatorio.pencaUCU.Dtos;

import com.obligatorio.pencaUCU.Models.Prediction;

public class PredictionDTO {
    private int id;
    private int userId;
    private int matchId;
    private int teamOneScore;
    private int teamTwoScore;
    private int points;

    // Constructors
    public PredictionDTO() {}

    public PredictionDTO(Prediction prediction) {
        this.id = prediction.getId();
        this.userId = prediction.getUserId();
        this.matchId = prediction.getMatchId();
        this.teamOneScore = prediction.getTeamOneScore();
        this.teamTwoScore = prediction.getTeamTwoScore();
        this.points = prediction.getPoints();
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
