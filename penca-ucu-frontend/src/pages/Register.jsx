import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link as MuiLink
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import FinalPrediction from '../components/FinalPrediction/FinalPrediction';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [career, setCareer] = useState('');
  const [finalPrediction, setFinalPrediction] = useState({ champion: '', runnerUp: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password, career);
      const user = { id: response.userId, email };

      if (user && user.id) {
        try {
          await axios.post('http://localhost:8080/api/finalPredictions', {
            userId: user.id,
            winningTeamId: finalPrediction.champion,
            runnerUpTeamId: finalPrediction.runnerUp,
          });
        } catch (error) {
          console.error('Error en la predicción final:', error);
          throw new Error('Predicción Final falló');
        }
      } else {
        throw new Error('Registro de usuario falló');
      }

      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('No fue posible realizar el registro');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              Logo
            </Typography>
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Crear Cuenta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="career"
              label="Carrera"
              name="career"
              autoComplete="career"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />

            <FinalPrediction onPredictionChange={setFinalPrediction} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              ¿Ya tienes una cuenta? <MuiLink component={Link} to="/login">Inicia sesión aquí</MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;