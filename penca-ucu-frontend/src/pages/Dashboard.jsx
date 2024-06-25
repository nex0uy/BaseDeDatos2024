import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Container, Grid, Typography, Card, CardContent, Paper } from '@mui/material';
import { red, green } from '@mui/material/colors';
import { usePredictions } from '../hooks/usePredictions';
import PredictionForm from '../components/PredictionForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { matches, teams, predictions, finalPrediction, error, isMatchPlayed, isPredictionDisabled, handleSubmitPrediction } = usePredictions(user);

  return (
    <Container>
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome, {user ? user.email : 'Guest'}
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </Box>
      {finalPrediction ? (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Pronóstico Final
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ganador: {teams[finalPrediction.winningTeamId]}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Subcampeón: {teams[finalPrediction.runnerUpTeamId]}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {finalPrediction.points !== undefined && finalPrediction.points > 0
              ? `Puntos obtenidos: ${finalPrediction.points}`
              : 'Puntos aún no obtenidos'}
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Pronóstico Final
          </Typography>
          <Typography variant="body1">
            Aún no has ingresado una predicción final
          </Typography>
        </Paper>
      )}
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
                    <Typography variant="body2" style={{ color: isPredictionDisabled(match.date) ? red[500] : green[500] }}>
                      {isPredictionDisabled(match.date) ? 'No se puede ingresar predicción' : 'Se puede ingresar predicción'}
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="body2" style={{ color: red[500] }}>
                        Partido en curso o finalizado
                      </Typography>
                      {predictions[match.id] ? (
                        <>
                          <Typography variant="body2" color="textSecondary">
                            Resultado de tu predicción: {predictions[match.id].teamOneScore} - {predictions[match.id].teamTwoScore}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Puntos obtenidos: {predictions[match.id].points !== undefined ? predictions[match.id].points : 0}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="body2" color="textSecondary">
                            No se ingresó predicción
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Puntos obtenidos: 0
                          </Typography>
                        </>
                      )}
                    </>
                  )}
                  {!isMatchPlayed(match.date) && (
                    <PredictionForm 
                      match={match} 
                      onSubmit={handleSubmitPrediction} 
                      existingPrediction={predictions[match.id]} 
                      isDisabled={isPredictionDisabled(match.date)} 
                    />
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
