import { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

export default function Map({ route }) {
  const { latitude, longitude } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  // Thạch Minh Luân - 22520827
  useEffect(() => {
    // Get the current location of the user
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      // Thạch Minh Luân - 22520827
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    getCurrentLocation();
  }, []);
  // Thạch Minh Luân - 22520827
  const handleGetDirections = () => {
    if (currentLocation) {
      const { latitude: currentLat, longitude: currentLong } = currentLocation;

      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLong}&destination=${latitude},${longitude}&travelmode=driving`;
      // Thạch Minh Luân - 22520827
      Linking.openURL(directionsUrl).catch((err) =>
        Alert.alert("Error", "Unable to open map application")
      );
    } else {
      Alert.alert("Error", "Unable to retrieve current location");
    }
  };
  // Thạch Minh Luân - 22520827
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {/* // Thạch Minh Luân - 22520827 */}
        <Marker
          coordinate={{ latitude, longitude }}
          title="Selected Location"
        />
      </MapView>
      {/* // Thạch Minh Luân - 22520827 */}
      <View style={styles.buttonContainer}>
        <Button title="Get Directions" onPress={handleGetDirections} />
      </View>
    </View>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }, // Thạch Minh Luân - 22520827
  map: {
    flex: 1,
  }, // Thạch Minh Luân - 22520827
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }, // Thạch Minh Luân - 22520827
});
