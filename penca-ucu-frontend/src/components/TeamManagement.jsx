import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchTeams, addTeam, deleteTeam, updateTeam } from '../services/teamService';

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [editTeam, setEditTeam] = useState(null);

  useEffect(() => {
    fetchTeams().then(setTeams);
  }, []);

  const handleAddTeam = async () => {
    await addTeam(newTeamName);
    setNewTeamName('');
    fetchTeams().then(setTeams); // Actualizar la lista de equipos
  };

  const handleUpdateTeam = async () => {
    await updateTeam(editTeam.id, editTeam.name);
    setEditTeam(null);
    fetchTeams().then(setTeams); // Actualizar la lista de equipos
  };

  const handleDeleteTeam = async (id) => {
    await deleteTeam(id);
    fetchTeams().then(setTeams); // Actualizar la lista de equipos
  };

  return (
    <Box mb={4}>
      <Typography variant="h5">Equipos</Typography>
      <Box display="flex" mb={2}>
        <TextField
          label="Nombre del equipo"
          value={editTeam ? editTeam.name : newTeamName}
          onChange={(e) => editTeam ? setEditTeam({ ...editTeam, name: e.target.value }) : setNewTeamName(e.target.value)}
        />
        <Button onClick={editTeam ? handleUpdateTeam : handleAddTeam} variant="contained" color="primary" sx={{ ml: 2 }}>
          {editTeam ? 'Actualizar' : 'Agregar'}
        </Button>
      </Box>
      <List>
        {[...teams].reverse().map((team) => (
          <ListItem key={team.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => setEditTeam(team)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteTeam(team.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={team.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TeamManagement;
