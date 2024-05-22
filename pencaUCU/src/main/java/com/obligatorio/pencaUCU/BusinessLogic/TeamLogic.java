package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.DataAccess.TeamDataAccess;
import com.obligatorio.pencaUCU.Models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamLogic {

    @Autowired
    private TeamDataAccess teamDataAccess;

    public void saveTeam(Team team) {
        teamDataAccess.save(team);
    }

    public Team getTeamById(int id) {
        return teamDataAccess.findById(id);
    }

    public List<Team> getAllTeams() {
        return teamDataAccess.findAll();
    }

    public void updateTeam(Team team) {
        teamDataAccess.update(team);
    }

    public void deleteTeam(int id) {
        teamDataAccess.delete(id);
    }
}
