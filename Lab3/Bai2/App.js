
import { CreateTable, initDb } from './database/database';
import { SettingsProvider } from './context/SettingsContext';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './stack/BottomTabStack';



export default function App() {
  useEffect(() => {
    CreateTable();
  }, []);

  return (
    <SettingsProvider>
      <NavigationContainer>
          <BottomTab/>
      </NavigationContainer>
    </SettingsProvider>
  );
}

