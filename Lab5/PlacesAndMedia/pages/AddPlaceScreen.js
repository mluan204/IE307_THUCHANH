import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../Context/LocationContext";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Notifications from "expo-notifications";
import { APIKEY_GOONG } from "@env";
// Thạch Minh Luân - 22520827
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
// Thạch Minh Luân - 22520827
export default function AddPlaceScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [imgUri, setImgUri] = useState("");
  const { location, setLocation } = useContext(LocationContext);

  useFocusEffect(
    useCallback(() => {
      // setLocation(null);
      if (route.params) {
        setLocation(route.params);
      }
    }, [route.params])
  );
  // Thạch Minh Luân - 22520827
  useEffect(() => {
    async function requestPermissions() {
      // Request Media Library Permission
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== "granted") {
        const { status: mediaPermissionStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaPermissionStatus !== "granted") {
          alert("We need access to your camera roll to select images.");
        }
      }
      // Thạch Minh Luân - 22520827
      // Request Camera Permission
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        const { status: cameraPermissionStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermissionStatus !== "granted") {
          alert("We need access to your camera to take pictures.");
        }
      }
      // Thạch Minh Luân - 22520827
      // Request Location Permission
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== "granted") {
        const { status: foregroundPermissionStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (foregroundPermissionStatus !== "granted") {
          alert("You need to allow location to receive updates.");
        }
      }
      // Thạch Minh Luân - 22520827
      // Request Notification Permission
      const { status: notificationStatus } =
        await Notifications.requestPermissionsAsync();
      if (notificationStatus !== "granted") {
        const { status: notificationPermissionStatus } =
          await Notifications.requestPermissionsAsync();
        if (notificationPermissionStatus !== "granted") {
          alert("You need to allow notifications to receive updates.");
        }
      }
    }
    // Thạch Minh Luân - 22520827
    requestPermissions();
  }, []);
  // Thạch Minh Luân - 22520827
  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Địa điểm mới đã được thêm!",
          body: "Địa điểm mới đã được lưu thành công.",
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };
  const handleAddPlacePress = async () => {
    if (!imgUri || !location || title.trim() === "") {
      Alert.alert("Cảnh báo", "Vui lòng điền đủ các thông tin");
    } else {
      const db = await SQLite.openDatabaseAsync("Places");
      const data = {};
      // Thạch Minh Luân - 22520827
      try {
        const response = await fetch(
          `https://rsapi.goong.io/Geocode?latlng=${location.latitude},${location.longitude}&api_key=${APIKEY_GOONG}`
        );
        const json = await response.json();
        // Thạch Minh Luân - 22520827
        data.address =
          json.results?.[0]?.formatted_address || "Không xác định được địa chỉ";
      } catch (error) {
        console.error(error);
        data.address = "Lỗi khi lấy địa chỉ";
      }

      data.title = title;
      data.imgUri = imgUri;

      console.log(data, location.latitude, location.longitude, data.address);
      // Thạch Minh Luân - 22520827
      try {
        await db.runAsync(
          `INSERT INTO PLACES (title, img, latitude, longitude, address) VALUES (?, ?, ?, ?, ?)`,
          [
            data.title,
            data.imgUri,
            location.latitude,
            location.longitude,
            data.address,
          ]
        );
        // Thạch Minh Luân - 22520827
        sendNotification();
        navigation.reset({
          index: 0,
          routes: [{ name: "Place" }],
        });
        setLocation(null);
      } catch (dbError) {
        console.error("Lỗi khi lưu dữ liệu vào SQLite:", dbError);
      }
    }
  };
  // Thạch Minh Luân - 22520827
  async function pickImage() {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
    }
  }
  // Thạch Minh Luân - 22520827
  async function takePhoto() {
    await ImagePicker.requestCameraPermissionsAsync();
    console.log(await ImagePicker.requestCameraPermissionsAsync());
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    // Thạch Minh Luân - 22520827
    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
    }
  }
  // Thạch Minh Luân - 22520827
  async function getCurrentLocation() {
    let loc = await Location.getCurrentPositionAsync({});

    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  }
  // Thạch Minh Luân - 22520827
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor="#999"
        />
      </View>
      {/* // Thạch Minh Luân - 22520827 */}
      <View style={styles.contentContainer}>
        {imgUri ? (
          <Image style={styles.img} source={{ uri: imgUri }} />
        ) : (
          <View style={styles.blankImg}>
            <Text style={styles.noImgText}>No image taken yet</Text>
          </View>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Icon name="image" size={25} color="white" />
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
          {/* // Thạch Minh Luân - 22520827 */}
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Icon name="camera-retro" size={25} color="white" />
            <Text style={styles.buttonText}>Take Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* // Thạch Minh Luân - 22520827 */}
      <View style={styles.contentContainer}>
        {location ? (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.002,
              }}
            >
              {/* // Thạch Minh Luân - 22520827 */}
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Your Location"
              />
            </MapView>
          </View>
        ) : (
          <View style={styles.blankImg}>
            <Text style={styles.noImgText}>No location picked yet</Text>
          </View>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
            <Icon name="location-dot" size={25} color="white" />
            <Text style={styles.buttonText}>Get Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PickMap")}
          >
            {/* // Thạch Minh Luân - 22520827 */}
            <Icon name="map-location-dot" size={25} color="white" />
            <Text style={styles.buttonText}>Pick Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={handleAddPlacePress}>
        <Text style={styles.addPlaceText}>Add Place</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
  },
  contentContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    color: "#333",
  }, // Thạch Minh Luân - 22520827
  img: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  blankImg: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  noImgText: {
    color: "#777",
  }, // Thạch Minh Luân - 22520827
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#3366FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    gap: 4,
  }, // Thạch Minh Luân - 22520827
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addPlaceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  }, // Thạch Minh Luân - 22520827
});
