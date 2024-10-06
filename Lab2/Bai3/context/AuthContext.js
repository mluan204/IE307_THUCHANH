import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    if (email === '1' && password === '1') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid email or password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

