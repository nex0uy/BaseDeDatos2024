import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

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
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">
        {existingPrediction ? 'Modificar Predicción' : 'Ingresar Predicción'}
      </Typography>
      <TextField
        label="Score Team One"
        type="number"
        value={teamOneScore}
        onChange={(e) => setTeamOneScore(e.target.value)}
        fullWidth
        margin="normal"
        disabled={isDisabled}
      />
      <TextField
        label="Score Team Two"
        type="number"
        value={teamTwoScore}
        onChange={(e) => setTeamTwoScore(e.target.value)}
        fullWidth
        margin="normal"
        disabled={isDisabled}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth 
        disabled={isDisabled}
      >
        {existingPrediction ? 'Modificar' : 'Ingresar'}
      </Button>
    </form>
  );
};

export default PredictionForm;
