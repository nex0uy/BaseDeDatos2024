package com.obligatorio.pencaUCU.Models;

public class FinalPrediction {
    private int id;
    private int userId;
    private int winningTeamId;
    private int runnerUpTeamId;

    // Constructors
    public FinalPrediction() {}

    public FinalPrediction(int userId, int winningTeamId, int runnerUpTeamId) {
        this.userId = userId;
        this.winningTeamId = winningTeamId;
        this.runnerUpTeamId = runnerUpTeamId;
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

    public int getWinningTeamId() {
        return winningTeamId;
    }

    public void setWinningTeamId(int winningTeamId) {
        this.winningTeamId = winningTeamId;
    }

    public int getRunnerUpTeamId() {
        return runnerUpTeamId;
    }

    public void setRunnerUpTeamId(int runnerUpTeamId) {
        this.runnerUpTeamId = runnerUpTeamId;
    }
}
