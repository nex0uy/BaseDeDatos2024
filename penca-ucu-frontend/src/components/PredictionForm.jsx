import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const PredictionForm = ({ match, onSubmit }) => {
  const [teamOneScore, setTeamOneScore] = useState('');
  const [teamTwoScore, setTeamTwoScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(match.id, teamOneScore, teamTwoScore); // Se llama a onSubmit con los valores correctos
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Score Team One"
        type="number"
        value={teamOneScore}
        onChange={(e) => setTeamOneScore(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Score Team Two"
        type="number"
        value={teamTwoScore}
        onChange={(e) => setTeamTwoScore(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Prediction
      </Button>
    </form>
  );
};

export default PredictionForm;
