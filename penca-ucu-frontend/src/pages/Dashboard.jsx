import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Container, Grid, Typography, Card, CardContent, Paper, Divider } from '@mui/material';
import { red, green } from '@mui/material/colors';
import { usePredictions } from '../hooks/usePredictions';
import PredictionForm from '../components/PredictionForm';
import FinalPredictionCard from '../components/FinalPredictionCard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { matches, teams, predictions, finalPrediction, error, isMatchPlayed, isPredictionDisabled, handleSubmitPrediction } = usePredictions(user);

  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.phase]) {
      acc[match.phase] = [];
    }
    acc[match.phase].push(match);
    return acc;
  }, {});

  return (
    <Container>
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user ? user.email : 'Invitado'}
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          Cerrar sesión
        </Button>
      </Box>
      <FinalPredictionCard finalPrediction={finalPrediction} teams={teams} />
      <Typography variant="h5" gutterBottom>
        Partidos
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {Object.keys(groupedMatches).map(phase => (
        <Box key={phase}>
          <Typography variant="h6" gutterBottom>
            Fase: {phase}
          </Typography>
          <Grid container spacing={3}>
            {groupedMatches[phase].map(match => (
              <Grid item xs={12} sm={6} md={4} key={match.id}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {teams[match.teamOneId] || 'Desconocido'} vs {teams[match.teamTwoId] || 'Desconocido'}
                    </Typography>
                    <Typography variant="body1">
                      Fecha: {new Date(match.date).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Puntuación: {match.teamOneScore !== null ? match.teamOneScore : 0} - {match.teamTwoScore !== null ? match.teamTwoScore : 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Fase: {match.phase}
                    </Typography>
                    <Typography variant="body2" style={{ color: isPredictionDisabled(match.date) ? red[500] : green[500] }} gutterBottom>
                      {isPredictionDisabled(match.date) ? 'No se puede ingresar predicción' : 'Se puede ingresar predicción'}
                    </Typography>
                    <PredictionForm 
                      match={match} 
                      onSubmit={handleSubmitPrediction} 
                      existingPrediction={predictions[match.id]} 
                      isDisabled={isPredictionDisabled(match.date)} 
                    />
                    {isMatchPlayed(match.date) && predictions[match.id] && (
                      <>
                        <Typography variant="body2" color="textSecondary">
                          Resultado de tu predicción: {predictions[match.id].teamOneScore} - {predictions[match.id].teamTwoScore}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Puntos obtenidos: {predictions[match.id].points !== undefined ? predictions[match.id].points : 0}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default Dashboard;
