import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Card, CardContent } from '@mui/material';
import { fetchUserRanking } from '../services/statisticsService';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getParticipants = async () => {
      try {
        const data = await fetchUserRanking();
        setParticipants(data);
      } catch (error) {
        setError('Error al obtener participantes. Por favor intente nuevamente.');
      }
    };
    getParticipants();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Participantes
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <List>
          {participants.map((participant, index) => (
            <StyledCard key={participant.userId}>
              <CardContent>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {participant.userName.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={`${participant.userName}`}
                    secondary={`Puntos: ${participant.totalPoints}`}
                  />
                </ListItem>
                {index < participants.length - 1 && <Divider />}
              </CardContent>
            </StyledCard>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Participants;
