package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.MatchLogic;
import com.obligatorio.pencaUCU.Dtos.MatchDTO;
import com.obligatorio.pencaUCU.Models.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchLogic matchLogic;

    @PostMapping
    public ResponseEntity<Void> createMatch(@RequestBody MatchDTO matchDTO) {
        Match match = new Match(
                matchDTO.getDate(),
                matchDTO.getPhase(),
                matchDTO.getTeamOneId(),
                matchDTO.getTeamTwoId());
        matchLogic.saveMatch(match);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDTO> getMatchById(@PathVariable int id) {
        Match match = matchLogic.getMatchById(id);
        MatchDTO matchDTO = new MatchDTO(match);
        return ResponseEntity.ok(matchDTO);
    }

    @GetMapping
    public ResponseEntity<List<MatchDTO>> getAllMatches() {
        List<Match> matches = matchLogic.getAllMatches();
        List<MatchDTO> matchDTOs = matches.stream().map(MatchDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(matchDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMatch(@PathVariable int id, @RequestBody MatchDTO matchDTO) {
        Match match = new Match(
                matchDTO.getDate(),
                matchDTO.getPhase(),
                matchDTO.getTeamOneId(),
                matchDTO.getTeamTwoId());
        match.setId(id);
        match.setTeamOneScore(matchDTO.getTeamOneScore());
        match.setTeamTwoScore(matchDTO.getTeamTwoScore());
        matchLogic.updateMatch(match);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable int id) {
        matchLogic.deleteMatch(id);
        return ResponseEntity.ok().build();
    }
}
