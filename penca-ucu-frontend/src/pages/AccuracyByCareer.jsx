import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Card, CardContent, Divider } from '@mui/material';
import { fetchAccuracyByCareer } from '../services/statisticsService';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const AccuracyByCareer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchAccuracyByCareer();
        setData(result);
      } catch (error) {
        setError('Error al obtener datos. Por favor intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Aciertos por Carrera
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <List>
            {data.map((item, index) => (
              <StyledCard key={item.career}>
                <CardContent>
                  <ListItem>
                    <ListItemText 
                      primary={`${item.career}`} 
                      secondary={`Aciertos: ${item.accuracyPercentage.toFixed(2)}%`} 
                    />
                  </ListItem>
                  {index < data.length - 1 && <Divider />}
                </CardContent>
              </StyledCard>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AccuracyByCareer;
