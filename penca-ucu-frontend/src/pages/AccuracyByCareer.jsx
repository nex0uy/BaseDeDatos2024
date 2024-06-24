import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { fetchAccuracyByCareer } from '../services/statisticsService';

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
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Accuracy by Career
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <List>
            {data.map((item) => (
              <ListItem key={item.career}>
                <ListItemText 
                  primary={`${item.career}`} 
                  secondary={`Accuracy: ${item.accuracyPercentage.toFixed(2)}%`} 
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AccuracyByCareer;
