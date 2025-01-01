import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { SettingsContext } from '../context/SettingsContext';

export default function SettingsScreen() {
  const { darkMode, fontSize, updateSetting } = useContext(SettingsContext);
  // Thạch Minh Luân - 22520827
  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.switchContainer}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Dark mode</Text>
        <Switch value={darkMode} onValueChange={(value) => updateSetting(value, fontSize, () => {})} />
      </View>


      <Text style={[darkMode ? styles.darkText : styles.lightText, {paddingHorizontal: 20}]}>Font Size: {fontSize}</Text>
      <Slider
        minimumValue={12}
        maximumValue={36}
        step={2}
        value={fontSize}
        onValueChange={(value) => updateSetting(darkMode, value, () => {})}
      />
    </View>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 300,
    },
    darkContainer: {
        backgroundColor: "#121212"
    },
    lightContainer: {
        backgroundColor: "#ebebeb"
    },
    switchContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingHorizontal: 20
    },
    darkText: {
        fontSize: 20,
        color: "#fff"
    },
    lightText: {
        fontSize: 20,
        color: "#0a0a0a"
    },  
})
