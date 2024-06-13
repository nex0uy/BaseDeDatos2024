import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Title, 
  RegisterLink 
} from '../assets/component-styles/formStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Email o contraseña inválidos');
    }
  };

  return (
    <Container>
      <Form>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit">Iniciar Sesión</Button>
        </form>
        <RegisterLink>
          <Link to="/register">¿No tienes una cuenta? Regístrate aquí</Link>
        </RegisterLink>
      </Form>
    </Container>
  );
};

export default Login;
