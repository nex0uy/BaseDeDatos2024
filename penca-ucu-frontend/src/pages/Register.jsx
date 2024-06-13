import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FinalPrediction from '../components/FinalPrediction/FinalPrediction';
import axios from 'axios';
import { 
  Container, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Title 
} from '../assets/component-styles/formStyles';

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
          console.error('Error en la prediccion final!:', error);
          throw new Error('Prediccion Final fallo!');
        }
      } else {
        throw new Error('Registro de usuario fallo!');
      }

      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('No fue posible realizar el registro!');
    }
  };
  return (
    <Container>
      <Form>
        <Title>Registrarse</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Carrera</Label>
            <Input
              type="text"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />
          </FormGroup>
          <FinalPrediction onPredictionChange={setFinalPrediction} />
          <Button type="submit">Registrar</Button>
        </form>
      </Form>
    </Container>
  );
};
export default Register;
