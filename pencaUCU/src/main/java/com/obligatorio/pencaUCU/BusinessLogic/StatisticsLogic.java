package com.obligatorio.pencaUCU.BusinessLogic;

import com.obligatorio.pencaUCU.DataAccess.PredictionDataAccess;
import com.obligatorio.pencaUCU.DataAccess.FinalPredictionDataAccess;
import com.obligatorio.pencaUCU.DataAccess.UserDataAccess;
import com.obligatorio.pencaUCU.Models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StatisticsLogic {

    @Autowired
    private UserDataAccess userDataAccess;

    @Autowired
    private PredictionDataAccess predictionDataAccess;

    @Autowired
    private FinalPredictionDataAccess finalPredictionDataAccess;

    public List<Map<String, Object>> getAccuracyByCareer() {
        // Obtener puntos de predicciones y predicciones finales por carrera
        List<Map<String, Object>> predictionPointsByCareer = predictionDataAccess.findPredictionPointsByCareer();
        List<Map<String, Object>> finalPredictionPointsByCareer = finalPredictionDataAccess.findFinalPredictionPointsByCareer();

        // Combinar los resultados y calcular el total de puntos obtenidos por todas las carreras
        int totalPointsAllCareers = predictionPointsByCareer.stream()
                .mapToInt(prediction -> ((Number) prediction.get("total_points")).intValue())
                .sum() + finalPredictionPointsByCareer.stream()
                .mapToInt(finalPrediction -> ((Number) finalPrediction.get("total_points")).intValue())
                .sum();

        // Calcular el porcentaje de aciertos por carrera en relación con el total de puntos obtenidos por todas las carreras
        return predictionPointsByCareer.stream().map(prediction -> {
            String career = (String) prediction.get("career");
            int totalPredictionPoints = ((Number) prediction.get("total_points")).intValue();

            Optional<Map<String, Object>> optionalFinalPrediction = finalPredictionPointsByCareer.stream()
                    .filter(fp -> fp.get("career").equals(career))
                    .findFirst();

            int totalFinalPoints = 0;

            if (optionalFinalPrediction.isPresent()) {
                Map<String, Object> finalPrediction = optionalFinalPrediction.get();
                totalFinalPoints = ((Number) finalPrediction.get("total_points")).intValue();
            }

            int totalPoints = totalPredictionPoints + totalFinalPoints;

            // Calcular el porcentaje de aciertos en relación con el total de puntos obtenidos por todas las carreras
            double accuracyPercentage = totalPointsAllCareers > 0 ? ((double) totalPoints / totalPointsAllCareers) * 100 : 0;

            return Map.<String, Object>of(
                    "career", career,
                    "accuracyPercentage", accuracyPercentage
            );
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getUserRanking() {
        // Obtener todos los usuarios
        List<User> users = userDataAccess.findAll();
    
        // Obtener puntos de predicciones y predicciones finales
        List<Map<String, Object>> predictionPointsByUser = predictionDataAccess.findPredictionPointsByUser();
        List<Map<String, Object>> finalPredictionPointsByUser = finalPredictionDataAccess.findFinalPredictionPointsByUser();
    
        // Combinar los resultados y calcular el ranking
        return users.stream()
            .filter(user -> user.getRoleId() != 2) // Filtrar usuarios con roleId 2
            .map(user -> {
                int userId = user.getId();
                int totalPredictionPoints = predictionPointsByUser.stream()
                        .filter(p -> ((Number) p.get("user_id")).intValue() == userId)
                        .mapToInt(p -> ((Number) p.get("total_points")).intValue())
                        .sum();
                int totalFinalPoints = finalPredictionPointsByUser.stream()
                        .filter(fp -> ((Number) fp.get("user_id")).intValue() == userId)
                        .mapToInt(fp -> ((Number) fp.get("total_points")).intValue())
                        .sum();
    
                int totalPoints = totalPredictionPoints + totalFinalPoints;
    
                return Map.<String, Object>of(
                        "userId", userId,
                        "userName", user.getName(),
                        "totalPoints", totalPoints
                );
            }).sorted((a, b) -> Integer.compare((Integer) b.get("totalPoints"), (Integer) a.get("totalPoints")))
            .collect(Collectors.toList());
    }
    
}
