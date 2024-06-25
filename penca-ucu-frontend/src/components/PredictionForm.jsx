import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Grid, Typography } from '@mui/material';

const PredictionForm = ({ match, onSubmit, existingPrediction, isDisabled }) => {
  const [teamOneScore, setTeamOneScore] = useState('');
  const [teamTwoScore, setTeamTwoScore] = useState('');

  useEffect(() => {
    if (existingPrediction) {
      setTeamOneScore(existingPrediction.teamOneScore);
      setTeamTwoScore(existingPrediction.teamTwoScore);
    }
  }, [existingPrediction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      onSubmit(match.id, teamOneScore, teamTwoScore, existingPrediction);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center' }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <TextField
              type="number"
              value={teamOneScore}
              onChange={(e) => setTeamOneScore(e.target.value)}
              disabled={isDisabled}
              placeholder="0"
              sx={{ width: '100px' }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">-</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="number"
              value={teamTwoScore}
              onChange={(e) => setTeamTwoScore(e.target.value)}
              disabled={isDisabled}
              placeholder="0"
              sx={{ width: '100px' }}
            />
          </Grid>
        </Grid>
        <Box mt={2} mb={2}>
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={isDisabled}
        >
          {existingPrediction ? 'Modificar' : 'Ingresar'}
        </Button>
      </Paper>
    </Box>
  );
};

export default PredictionForm;
