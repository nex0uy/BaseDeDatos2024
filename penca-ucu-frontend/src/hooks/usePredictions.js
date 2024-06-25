import { useState, useEffect } from 'react';
import { fetchTeams } from '../services/teamService';
import { fetchMatches } from '../services/matchService';
import { submitPrediction, fetchPredictionsByUser, updatePrediction } from '../services/predictionService';
import { fetchFinalPredictionByUser } from '../services/finalPredictionService';

export const usePredictions = (user) => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState({});
  const [predictions, setPredictions] = useState({});
  const [finalPrediction, setFinalPrediction] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllData();
  }, [user.id]);

  const fetchAllData = async () => {
    try {
      const teamsData = await fetchTeams();
      const teamsMap = teamsData.reduce((acc, team) => {
        acc[team.id] = team.name;
        return acc;
      }, {});
      setTeams(teamsMap);

      const matchesData = await fetchMatches();
      setMatches(matchesData);

      const predictionsData = await fetchPredictionsByUser(user.id);
      const predictionsMap = predictionsData.reduce((acc, prediction) => {
        acc[prediction.matchId] = prediction;
        return acc;
      }, {});
      setPredictions(predictionsMap);

      const finalPredictionData = await fetchFinalPredictionByUser(user.id);
      setFinalPrediction(finalPredictionData);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    }
  };

  const isMatchPlayed = (matchDate) => {
    return new Date(matchDate) < new Date();
  };

  const isPredictionDisabled = (matchDate) => {
    return new Date(matchDate) <= new Date(new Date().getTime() + 60 * 60 * 1000);
  };

  const handleSubmitPrediction = async (matchId, teamOneScore, teamTwoScore, existingPrediction) => {
    try {
      if (existingPrediction) {
        await updatePrediction(existingPrediction.id, {
          userId: user.id,
          matchId,
          teamOneScore: parseInt(teamOneScore, 10),
          teamTwoScore: parseInt(teamTwoScore, 10)
        });
      } else {
        await submitPrediction({
          userId: user.id,
          matchId,
          teamOneScore: parseInt(teamOneScore, 10),
          teamTwoScore: parseInt(teamTwoScore, 10)
        });
      }
      alert('Prediction submitted successfully');
      fetchAllData(); 
    } catch (error) {
      alert('Failed to submit prediction: ' + error.message);
    }
  };

  return {
    matches,
    teams,
    predictions,
    finalPrediction,
    error,
    isMatchPlayed,
    isPredictionDisabled,
    handleSubmitPrediction
  };
};
