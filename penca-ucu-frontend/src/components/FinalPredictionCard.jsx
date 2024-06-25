import React from 'react';
import { Paper, Typography, Box, Divider, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  textAlign: 'center',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

const FinalPredictionCard = ({ finalPrediction, teams }) => {
  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom color="primary">
        Pronóstico Final
      </Typography>
      <Divider variant="middle" sx={{ marginY: 2 }} />
      {finalPrediction ? (
        <>
          <StyledBox>
            <EmojiEventsIcon color="primary" />
            <Typography variant="h6" gutterBottom>
              Ganador: {teams[finalPrediction.winningTeamId]}
            </Typography>
          </StyledBox>
          <Divider variant="middle" sx={{ marginY: 2 }} />
          <StyledBox>
            <StarIcon color="secondary" />
            <Typography variant="h6" gutterBottom>
              Subcampeón: {teams[finalPrediction.runnerUpTeamId]}
            </Typography>
          </StyledBox>
          <Divider variant="middle" sx={{ marginY: 2 }} />
          <Typography variant="body1" gutterBottom>
            {finalPrediction.points !== undefined && finalPrediction.points > 0
              ? `Puntos obtenidos: ${finalPrediction.points}`
              : 'Puntos aún no obtenidos'}
          </Typography>
        </>
      ) : (
        <Typography variant="body1">
          Aún no has ingresado una predicción final
        </Typography>
      )}
    </StyledPaper>
  );
};

export default FinalPredictionCard;
