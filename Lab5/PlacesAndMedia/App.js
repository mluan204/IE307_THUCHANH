import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainBottom from "./navigation/MainBottom";
import { NavigationContainer } from "@react-navigation/native";
import { LocationProvider } from "./Context/LocationContext";

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <MainBottom />
      </NavigationContainer>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
