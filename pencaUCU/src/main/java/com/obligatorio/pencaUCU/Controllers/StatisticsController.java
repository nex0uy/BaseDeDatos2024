package com.obligatorio.pencaUCU.Controllers;

import com.obligatorio.pencaUCU.BusinessLogic.StatisticsLogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsLogic statisticsLogic;

    @GetMapping("/accuracyByCareer")
    public ResponseEntity<List<Map<String, Object>>> getAccuracyByCareer() {
        List<Map<String, Object>> statistics = statisticsLogic.getAccuracyByCareer();
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/userRanking")
    public ResponseEntity<List<Map<String, Object>>> getUserRanking() {
        List<Map<String, Object>> ranking = statisticsLogic.getUserRanking();
        return ResponseEntity.ok(ranking);
    }
}
