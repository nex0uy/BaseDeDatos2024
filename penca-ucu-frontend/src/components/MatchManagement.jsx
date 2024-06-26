import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
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
  const [newMatch, setNewMatch] = useState({ date: '', teamOneId: '', teamTwoId: '', phase: '', teamOneScore: 0, teamTwoScore: 0 });
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

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? '' : Number(value);
    if (editMatch) {
      setEditMatch({ ...editMatch, [name]: numberValue });
    } else {
      setNewMatch({ ...newMatch, [name]: numberValue });
    }
  };

  const handleAddMatch = async () => {
    await addMatch(newMatch);
    setNewMatch({ date: '', teamOneId: '', teamTwoId: '', phase: '', teamOneScore: 0, teamTwoScore: 0 });
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
          value={newMatch.date}
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
          value={newMatch.teamOneId || ''}
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
          value={newMatch.teamTwoId || ''}
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
          value={newMatch.phase || ''}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {phases.map((phase, index) => (
            <MenuItem key={index} value={phase}>
              {phase}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={handleAddMatch} variant="contained" color="primary">
          Agregar
        </Button>
      </Box>
      <List>
        {[...matches].reverse().map((match) => (
          <ListItem key={match.id}>
            {editMatch && editMatch.id === match.id ? (
              <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
                <TextField
                  label="Fecha"
                  type="datetime-local"
                  name="date"
                  value={editMatch.date}
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
                  value={editMatch.teamOneId || ''}
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
                  value={editMatch.teamTwoId || ''}
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
                  value={editMatch.phase || ''}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                >
                  {phases.map((phase, index) => (
                    <MenuItem key={index} value={phase}>
                      {phase}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Puntaje Equipo 1"
                  type="number"
                  name="teamOneScore"
                  value={editMatch.teamOneScore || ''}
                  onChange={handleNumberChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Puntaje Equipo 2"
                  type="number"
                  name="teamTwoScore"
                  value={editMatch.teamTwoScore || ''}
                  onChange={handleNumberChange}
                  sx={{ mb: 2 }}
                />
                <Box display="flex" justifyContent="space-between">
                  <Button onClick={handleUpdateMatch} variant="contained" color="primary" sx={{ mr: 2 }}>
                    Guardar
                  </Button>
                  <Button onClick={() => setEditMatch(null)} variant="contained" color="secondary">
                    Cancelar
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={`${teams.find(t => t.id === match.teamOneId)?.name || 'Equipo 1'} vs ${teams.find(t => t.id === match.teamTwoId)?.name || 'Equipo 2'}`}
                  secondary={`${new Date(match.date).toLocaleString()} - Fase: ${match.phase} - Puntaje: ${match.teamOneScore || 0} - ${match.teamTwoScore || 0}`}
                />
                <IconButton edge="end" onClick={() => setEditMatch(match)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteMatch(match.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MatchManagement;
