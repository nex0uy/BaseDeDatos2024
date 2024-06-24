import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Ajusta la URL de tu API según sea necesario

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    }
  } catch (error) {
    throw new Error('Invalid email or password');
  }
};

export const register = async (name, email, password, career) => {
  try {
    const userData = { name, email, password, career };
    const response = await axios.post(`${API_URL}/users/register`, userData);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
