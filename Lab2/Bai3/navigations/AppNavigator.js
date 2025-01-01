import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainBottom from './MainBottom';
import { AuthContext } from '../context/AuthContext';

// Thạch Minh Luân - 22520827
const AppNavigator = () => {

  const {isAuthenticated} = useContext(AuthContext);

  return (
      <NavigationContainer>
        { isAuthenticated  ? <MainBottom/> : <AuthStack/>}
      </NavigationContainer>
  );
};
export default AppNavigator;
