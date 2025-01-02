import { useEffect, useState, useContext } from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LocationContext } from "../Context/LocationContext";
import { APIKEY_GOONG } from "@env";

export default function PickMap({ navigation }) {
  const [marker, setMarker] = useState(null);
  const [description, setDescription] = useState("");
  const { setLocation } = useContext(LocationContext);
  // Thạch Minh Luân - 22520827
  const handleMapPress = async (e) => {
    setMarker(e.nativeEvent.coordinate);
  };
  // Thạch Minh Luân - 22520827
  const saveInfo = () => {
    if (marker) {
      setLocation(marker);
      navigation.goBack();
    } else {
      Alert.alert("Cảnh báo", "Vui lòng chọn địa chỉ");
    }
  };
  // Thạch Minh Luân - 22520827
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="save"
          size={25}
          color="black"
          onPress={saveInfo}
          style={{ marginRight: 20 }}
        />
      ),
      headerTitle: "Chọn địa chỉ",
    });
    // Thạch Minh Luân - 22520827
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://rsapi.goong.io/Geocode?latlng=${marker.latitude},${marker.longitude}&api_key=${APIKEY_GOONG}`
        );
        const json = await response.json();
        if (json.results && json.results.length > 0) {
          setDescription(json.results[0].formatted_address);
        } else {
          setDescription("Không xác định được địa chỉ");
        }
      } catch (error) {
        console.error(error);
        setDescription("Lỗi khi lấy địa chỉ");
      }
    };

    if (marker) {
      fetchAddress();
    }
  }, [marker]);
  // Thạch Minh Luân - 22520827
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.88246415084284,
          longitude: 106.78250129528021,
          latitudeDelta: 0.009,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {marker && (
          <Marker
            coordinate={marker}
            title="Địa chỉ"
            description={description}
            pinColor="blue"
          />
        )}
      </MapView>
      {/* // Thạch Minh Luân - 22520827 */}
      {/* Address Display */}
      {description ? (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{description}</Text>
        </View>
      ) : null}
      {/* // Thạch Minh Luân - 22520827 */}
    </View>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  map: {
    flex: 1,
  },
  saveIcon: {
    marginRight: 10,
  }, // Thạch Minh Luân - 22520827
  addressContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }, // Thạch Minh Luân - 22520827
  addressText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  }, // Thạch Minh Luân - 22520827
  fab: {
    position: "absolute",
    right: 20,
    bottom: 80,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  }, // Thạch Minh Luân - 22520827
});
