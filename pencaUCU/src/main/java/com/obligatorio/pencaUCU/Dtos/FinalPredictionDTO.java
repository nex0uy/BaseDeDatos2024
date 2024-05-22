package com.obligatorio.pencaUCU.Dtos;

import com.obligatorio.pencaUCU.Models.FinalPrediction;

public class FinalPredictionDTO {
    private int id;
    private int userId;
    private int winningTeamId;
    private int runnerUpTeamId;

    // Constructors
    public FinalPredictionDTO() {}

    public FinalPredictionDTO(FinalPrediction finalPrediction) {
        this.id = finalPrediction.getId();
        this.userId = finalPrediction.getUserId();
        this.winningTeamId = finalPrediction.getWinningTeamId();
        this.runnerUpTeamId = finalPrediction.getRunnerUpTeamId();
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
