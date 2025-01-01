import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    if (email === '22520827@gm.uit.edu.vn' && password === 'thachminhluan') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid email or password');
    }
  };
// Thạch Minh Luân - 22520827
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

