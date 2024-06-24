import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { red, green } from '@mui/material/colors';
import { usePredictions } from '../hooks/usePredictions';
import PredictionForm from '../components/PredictionForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { matches, teams, predictions, error, isMatchPlayed, isPredictionDisabled, handleSubmitPrediction } = usePredictions(user);

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user ? user.email : 'Guest'}
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom>
        Matches
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {Array.isArray(matches) && matches.length > 0 ? (
          matches.map(match => (
            <Grid item xs={12} sm={6} md={4} key={match.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {teams[match.teamOneId] || 'Unknown'} vs {teams[match.teamTwoId] || 'Unknown'}
                  </Typography>
                  <Typography variant="body1">
                    Date: {new Date(match.date).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    Score: {match.teamOneScore !== null ? match.teamOneScore : 0} - {match.teamTwoScore !== null ? match.teamTwoScore : 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phase: {match.phase}
                  </Typography>
                  {!isMatchPlayed(match.date) ? (
                    <Typography variant="body2" style={{ color: green[500] }}>
                      {isPredictionDisabled(match.date) ? 'No se puede ingresar predicción' : 'Se puede ingresar predicción'}
                    </Typography>
                  ) : (
                    <Typography variant="body2" style={{ color: red[500] }}>
                      Partido finalizado
                    </Typography>
                  )}
                  {!isMatchPlayed(match.date) && (
                    <PredictionForm 
                      match={match} 
                      onSubmit={handleSubmitPrediction} 
                      existingPrediction={predictions[match.id]} 
                      isDisabled={isPredictionDisabled(match.date)} 
                    />
                  )}
                  {isMatchPlayed(match.date) && predictions[match.id] && (
                    <Box mt={2}>
                      <Typography variant="body1">
                        Tu predicción: {predictions[match.id].teamOneScore} - {predictions[match.id].teamTwoScore}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No matches available</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
