import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginService, register as registerService, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const userData = await loginService(email, password);
    setUser(userData);
    return userData;  // Return user data for further processing
  }, []);

  const register = useCallback(async (name, email, password, career) => {
    const userData = await registerService(name, email, password, career);
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
