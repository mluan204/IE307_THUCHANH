import React, { createContext, useState, useEffect } from 'react';
import { GetSettings, updateSettings } from '../database/database';
import { StyleSheet } from "react-native"


export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    GetSettings((settings) => {
      if (settings) {
        setDarkMode(!!settings.darkMode);
        setFontSize(settings.fontSize);
      }
    });
  }, []);
  // Thạch Minh Luân - 22520827
  const updateSetting = (newDarkMode, newFontSize) => {
    setDarkMode(newDarkMode);
    setFontSize(newFontSize);
    updateSettings(newDarkMode ? 1 : 0, newFontSize, () => {});
  };

  const SettingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? "#121212" : "#ebebeb"
  },
    header: {
      color: darkMode ? 'blue' : 'orange',
      fontSize: fontSize + 10,
      fontWeight: 'bold',
      paddingTop: 20 
  },
    btnAddNotes: {
      width: 56,
      height: 56,
      borderRadius: 50,
      backgroundColor: darkMode ? 'blue' : 'orange',
      alignItems: 'center',
      justifyContent: 'center'
    },
    txtAllNotes: {
      fontSize: fontSize + 4,
      fontWeight: "bold",
      color: darkMode ? 'white' : 'black',
    },
    txtContent: {
      fontSize: fontSize + 2,
      color: darkMode ? 'white' : 'black',
    }
  })

  // Thạch Minh Luân - 22520827
  return (
    <SettingsContext.Provider value={{ darkMode, fontSize, updateSetting, SettingStyles }}>
      {children}
    </SettingsContext.Provider>
  );
};
