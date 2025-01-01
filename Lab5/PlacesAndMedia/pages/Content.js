import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function Content({ navigation, route }) {
  const { item } = route.params;

  useEffect(() => {
    console.log(item);
    navigation.setOptions({ title: item.title });
  }, []);

  const handleViewOnMap = () => {
    // Navigate to the map screen, passing the latitude and longitude
    navigation.navigate("Map", {
      latitude: item.latitude,
      longitude: item.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: item.img }} />
      <Text style={styles.address}>{item.address}</Text>

      <TouchableOpacity style={styles.button} onPress={handleViewOnMap}>
        <Icon name="map-location-dot" size={20} color="#fff" />
        <Text style={styles.buttonText}>View On Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  img: {
    width: "100%",
    height: "70%",
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: "cover",
  },
  address: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
    width: "60%",
    flexDirection: "row",
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
