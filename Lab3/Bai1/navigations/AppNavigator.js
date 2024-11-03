import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import HomeStack from './HomeStack'


const AppNavigator = () => {

  const {isAuthenticated} = useContext(AuthContext);

  return (
      <NavigationContainer>
        { isAuthenticated  ? <HomeStack/> : <AuthStack/>}
      </NavigationContainer>
  );
};
export default AppNavigator;
