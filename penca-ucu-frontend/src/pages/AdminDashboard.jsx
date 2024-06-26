import React, { useState } from 'react';
import { Box, Container, Tabs, Tab, Typography } from '@mui/material';
import TeamManagement from '../components/TeamManagement';
import MatchManagement from '../components/MatchManagement';
import ChampionUpdate from '../components/ChampionUpdate';

const AdminDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Aquí puedes administrar equipos, partidos y actualizar el campeón y subcampeón.
        </Typography>
      </Box>
      <Tabs value={value} onChange={handleChange} centered>
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
