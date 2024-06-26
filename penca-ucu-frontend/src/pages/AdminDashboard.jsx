import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Tabs, Tab, Typography, AppBar, Toolbar, IconButton, Avatar, Button } from '@mui/material';
import TeamManagement from '../components/TeamManagement';
import MatchManagement from '../components/MatchManagement';
import ChampionUpdate from '../components/ChampionUpdate';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const { logout } = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <SportsSoccerIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={logout}
            sx={{ marginRight: 2 }}
          >
            Cerrar sesión
          </Button>
          <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBar>
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Aquí puedes administrar equipos, partidos y actualizar el campeón y subcampeón.
        </Typography>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ marginBottom: 4 }}
      >
        <Tab label="Equipos" />
        <Tab label="Partidos" />
        <Tab label="Actualizar Campeón" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TeamManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MatchManagement />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChampionUpdate />
      </TabPanel>
    </Container>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default AdminDashboard;
