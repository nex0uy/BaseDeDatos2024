import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchMatches, addMatch, deleteMatch, updateMatch } from '../services/matchService';
import { fetchTeams } from '../services/teamService';

const formatDate = (date) => {
  const d = new Date(date);
  const pad = (num) => num.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const MatchManagement = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [newMatch, setNewMatch] = useState({ date: '', teamOneId: '', teamTwoId: '', phase: '' });
  const [editMatch, setEditMatch] = useState(null);
  const phases = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Octavos", "Cuartos", "Semifinal", "Final"];

  useEffect(() => {
    fetchTeams().then(setTeams);
    fetchMatches().then(data => {
      const formattedMatches = data.map(match => ({
        ...match,
        date: formatDate(match.date)
      }));
      setMatches(formattedMatches);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editMatch) {
      setEditMatch({ ...editMatch, [name]: value });
    } else {
      setNewMatch({ ...newMatch, [name]: value });
    }
  };

  const handleAddMatch = async () => {
    await addMatch(newMatch);
    setNewMatch({ date: '', teamOneId: '', teamTwoId: '', phase: '' });
    fetchMatches().then(data => {
      const formattedMatches = data.map(match => ({
        ...match,
        date: formatDate(match.date)
      }));
      setMatches(formattedMatches);
    });
  };

  const handleUpdateMatch = async () => {
    await updateMatch(editMatch.id, editMatch);
    setEditMatch(null);
    fetchMatches().then(data => {
      const formattedMatches = data.map(match => ({
        ...match,
        date: formatDate(match.date)
      }));
      setMatches(formattedMatches);
    });
  };

  const handleDeleteMatch = async (id) => {
    await deleteMatch(id);
    fetchMatches().then(data => {
      const formattedMatches = data.map(match => ({
        ...match,
        date: formatDate(match.date)
      }));
      setMatches(formattedMatches);
    });
  };

  return (
    <Box mb={4}>
      <Typography variant="h5">Partidos</Typography>
      <Box display="flex" flexDirection="column" mb={2}>
        <TextField
          label="Fecha"
          type="datetime-local"
          name="date"
          value={editMatch ? editMatch.date : newMatch.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Equipo 1"
          name="teamOneId"
          value={editMatch ? editMatch.teamOneId : newMatch.teamOneId}
          onChange={handleChange}
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
          label="Equipo 2"
          name="teamTwoId"
          value={editMatch ? editMatch.teamTwoId : newMatch.teamTwoId}
          onChange={handleChange}
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
          label="Fase"
          name="phase"
          value={editMatch ? editMatch.phase : newMatch.phase}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {phases.map((phase, index) => (
            <MenuItem key={index} value={phase}>
              {phase}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={editMatch ? handleUpdateMatch : handleAddMatch} variant="contained" color="primary">
          {editMatch ? 'Actualizar' : 'Agregar'}
        </Button>
      </Box>
      <List>
        {[...matches].reverse().map((match) => (
          <ListItem key={match.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => setEditMatch(match)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteMatch(match.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText
              primary={`${teams.find(t => t.id === match.teamOneId)?.name || 'Equipo 1'} vs ${teams.find(t => t.id === match.teamTwoId)?.name || 'Equipo 2'}`}
              secondary={`${new Date(match.date).toLocaleString()} - Fase: ${match.phase}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MatchManagement;
