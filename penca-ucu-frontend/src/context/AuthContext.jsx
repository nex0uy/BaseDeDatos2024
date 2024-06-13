import React, { createContext, useContext, useState } from 'react';
import { login as loginService, register as registerService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const userData = await loginService(email, password);
    setUser(userData);
  };

  const register = async (name, email, password, career) => {
    const userData = await registerService(name, email, password, career);
    setUser(userData);
    return userData; // Asegúrate de devolver la respuesta aquí
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
