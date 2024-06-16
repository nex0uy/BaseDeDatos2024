import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Ajusta la URL de tu API según sea necesario

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error('Invalid email or password');
  }
};

export const register = async (name, email, password, career) => {
  try {
    const userData = { name, email, password, career };
    console.log('Sending user data:', userData);
    const response = await axios.post(`${API_URL}/users/register`, userData);
    console.log('Received response:', response.data);
    if (response.data.userId) {
      localStorage.setItem('user', JSON.stringify({ id: response.data.userId, email }));
    }
    return response.data; // Asegúrate de devolver la respuesta aquí
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
