import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, MenuItem } from '@mui/material';

const FinalPrediction = ({ onPredictionChange }) => {
  const [teams, setTeams] = useState([]);
  const [champion, setChampion] = useState('');
  const [runnerUp, setRunnerUp] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/teams');
        if (Array.isArray(response.data)) {
          setTeams(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    onPredictionChange({ champion, runnerUp });
  }, [champion, runnerUp, onPredictionChange]);

  return (
    <div>
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
