import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Typography, Box, Paper } from '@mui/material';
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
        setError('Error al obtener equipos. Por favor intente nuevamente.');
      }
    };
    getTeams();
  }, []);

  useEffect(() => {
    onPredictionChange({ champion, runnerUp });
  }, [champion, runnerUp, onPredictionChange]);

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
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
      </Paper>
    </Box>
  );
};

export default FinalPrediction;
