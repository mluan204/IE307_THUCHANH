import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainBottom from './MainBottom';
import { AuthContext } from '../context/AuthContext';


const AppNavigator = () => {

  const {isAuthenticated} = useContext(AuthContext);

  return (
      <NavigationContainer>
        { isAuthenticated  ? <MainBottom/> : <AuthStack/>}
      </NavigationContainer>
  );
};
export default AppNavigator;
