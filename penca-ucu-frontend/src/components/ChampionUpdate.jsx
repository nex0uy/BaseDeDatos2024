import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { updateChampion } from '../services/tournamentService';
import { fetchTeams } from '../services/teamService';

const ChampionUpdate = () => {
  const [teams, setTeams] = useState([]);
  const [champion, setChampion] = useState('');
  const [runnerUp, setRunnerUp] = useState('');

  useEffect(() => {
    fetchTeams().then(setTeams);
  }, []);

  const handleUpdateChampion = async () => {
    await updateChampion(champion, runnerUp);
    alert('Campeón y Subcampeón actualizados');
  };

  return (
    <Box mb={4}>
      <Typography variant="h5">Actualizar Campeón y Subcampeón</Typography>
      <Box display="flex" flexDirection="column" mb={2}>
        <TextField
          select
          label="Campeón"
          value={champion}
          onChange={(e) => setChampion(e.target.value)}
          sx={{ mb: 2 }}
        >
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
          sx={{ mb: 2 }}
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={handleUpdateChampion} variant="contained" color="primary">Actualizar</Button>
      </Box>
    </Box>
  );
};

export default ChampionUpdate;
