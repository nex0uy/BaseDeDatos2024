package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.FinalPredictionLogic;
import com.obligatorio.pencaUCU.Dtos.FinalPredictionDTO;
import com.obligatorio.pencaUCU.Models.FinalPrediction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/finalPredictions")
public class FinalPredictionController {

    @Autowired
    private FinalPredictionLogic finalPredictionLogic;

    @PostMapping
    public ResponseEntity<String> createFinalPrediction(@RequestBody FinalPredictionDTO finalPredictionDTO) {
        try {
            FinalPrediction finalPrediction = new FinalPrediction(
                    finalPredictionDTO.getUserId(),
                    finalPredictionDTO.getWinningTeamId(),
                    finalPredictionDTO.getRunnerUpTeamId());
            finalPredictionLogic.saveFinalPrediction(finalPrediction);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinalPredictionDTO> getFinalPredictionById(@PathVariable int id) {
        FinalPrediction finalPrediction = finalPredictionLogic.getFinalPredictionById(id);
        if (finalPrediction == null) {
            return ResponseEntity.notFound().build();
        }
        FinalPredictionDTO finalPredictionDTO = new FinalPredictionDTO(finalPrediction);
        return ResponseEntity.ok(finalPredictionDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<FinalPredictionDTO> getFinalPredictionByUserId(@PathVariable int userId) {
        FinalPrediction finalPrediction = finalPredictionLogic.getFinalPredictionByUserId(userId);
        if (finalPrediction == null) {
            return ResponseEntity.notFound().build();
        }
        FinalPredictionDTO finalPredictionDTO = new FinalPredictionDTO(finalPrediction);
        return ResponseEntity.ok(finalPredictionDTO);
    }

    @GetMapping
    public ResponseEntity<List<FinalPredictionDTO>> getAllFinalPredictions() {
        List<FinalPrediction> finalPredictions = finalPredictionLogic.getAllFinalPredictions();
        List<FinalPredictionDTO> finalPredictionDTOs = finalPredictions.stream().map(FinalPredictionDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(finalPredictionDTOs);
    }

}
