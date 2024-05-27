package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.FinalPredictionLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tournament")
public class TournamentController {

    @Autowired
    private FinalPredictionLogic finalPredictionLogic;

    @PostMapping("/updateChampion")
    public ResponseEntity<String> updateChampion(@RequestParam int championTeamId, @RequestParam int runnerUpTeamId) {
        finalPredictionLogic.calculateFinalPredictionPoints(championTeamId, runnerUpTeamId);
        return ResponseEntity.ok("Campeon y Sub-Campeon ingresados con exito!.");
    }
}
