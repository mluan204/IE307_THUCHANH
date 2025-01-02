import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainBottom from "./navigation/MainBottom";
import { NavigationContainer } from "@react-navigation/native";
import { LocationProvider } from "./Context/LocationContext";
// Thạch Minh Luân - 22520827
export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <MainBottom />
      </NavigationContainer>
    </LocationProvider>
  );
}
// Thạch Minh Luân - 22520827
