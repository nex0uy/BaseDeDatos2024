import { useState, useEffect } from 'react';
import { fetchTeams } from '../services/teamService';
import { fetchMatches } from '../services/matchService';
import { submitPrediction } from '../services/predictionService';

export const usePredictions = (user) => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
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
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchAllData();
  }, []);

  const isMatchPlayed = (matchDate) => {
    return new Date(matchDate) < new Date();
  };

  const handleSubmitPrediction = async (matchId, teamOneScore, teamTwoScore) => {
    try {
      await submitPrediction({
        userId: user.id, // Aquí se asegura de que el userId se está enviando
        matchId,
        teamOneScore: parseInt(teamOneScore, 10),
        teamTwoScore: parseInt(teamTwoScore, 10)
      });
      alert('Prediction submitted successfully');
    } catch (error) {
      alert('Failed to submit prediction: ' + error.message);
    }
  };

  return {
    matches,
    teams,
    error,
    isMatchPlayed,
    handleSubmitPrediction
  };
};
