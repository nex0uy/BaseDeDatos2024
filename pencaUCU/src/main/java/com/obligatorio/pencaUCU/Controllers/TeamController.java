package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.TeamLogic;
import com.obligatorio.pencaUCU.Dtos.TeamDTO;
import com.obligatorio.pencaUCU.Models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamLogic teamLogic;

    @PostMapping
    public ResponseEntity<Void> createTeam(@RequestBody TeamDTO teamDTO) {
        Team team = new Team(teamDTO.getName());
        teamLogic.saveTeam(team);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable int id) {
        Team team = teamLogic.getTeamById(id);
        TeamDTO teamDTO = new TeamDTO(team);
        return ResponseEntity.ok(teamDTO);
    }

    @GetMapping
    public ResponseEntity<List<TeamDTO>> getAllTeams() {
        List<Team> teams = teamLogic.getAllTeams();
        List<TeamDTO> teamDTOs = teams.stream().map(TeamDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(teamDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTeam(@PathVariable int id, @RequestBody TeamDTO teamDTO) {
        Team team = new Team(teamDTO.getName());
        team.setId(id);
        teamLogic.updateTeam(team);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable int id) {
        teamLogic.deleteTeam(id);
        return ResponseEntity.ok().build();
    }
}
