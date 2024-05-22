package com.obligatorio.pencaUCU.Dtos;

import com.obligatorio.pencaUCU.Models.Match;

import java.sql.Timestamp;

public class MatchDTO {
    private int id;
    private Timestamp date;
    private Integer teamOneScore;
    private Integer teamTwoScore;
    private String phase;
    private int teamOneId;
    private int teamTwoId;

    // Constructors
    public MatchDTO() {}

    public MatchDTO(Match match) {
        this.id = match.getId();
        this.date = match.getDate();
        this.teamOneScore = match.getTeamOneScore();
        this.teamTwoScore = match.getTeamTwoScore();
        this.phase = match.getPhase();
        this.teamOneId = match.getTeamOneId();
        this.teamTwoId = match.getTeamTwoId();
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
