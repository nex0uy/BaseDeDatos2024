import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Typography } from '@mui/material';
import { fetchTeams } from '../../services/teamService';

const FinalPrediction = ({ onPredictionChange }) => {
  const [teams, setTeams] = useState([]);
  const [champion, setChampion] = useState('');
  const [runnerUp, setRunnerUp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data);
      } catch (error) {
        setError('Error fetching teams. Please try again later.');
      }
    };
    getTeams();
  }, []);

  useEffect(() => {
    onPredictionChange({ champion, runnerUp });
  }, [champion, runnerUp, onPredictionChange]);

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        select
        label="Campeón"
        value={champion}
        onChange={(e) => setChampion(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">
          <em>Seleccionar Equipo</em>
        </MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            {team.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Subcampeón"
        value={runnerUp}
        onChange={(e) => setRunnerUp(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">
          <em>Seleccionar Equipo</em>
        </MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            {team.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default FinalPrediction;
