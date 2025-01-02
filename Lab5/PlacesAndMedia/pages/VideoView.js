import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Button,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Thạch Minh Luân - 22520827
export default function VideoScreen({ navigation }) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState("");
  const [hasFinishedRecording, setHasFinishedRecording] = useState(false);
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);
  // Thạch Minh Luân - 22520827
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  // Thạch Minh Luân - 22520827
  useEffect(() => {
    (async () => {
      await requestCameraPermission();
      await requestMicrophonePermission();
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Cần quyền truy cập thư viện để lưu video.");
      }
      const { status: notificationStatus } =
        await Notifications.requestPermissionsAsync();
      if (notificationStatus !== "granted") {
        const { status: notificationPermissionStatus } =
          await Notifications.requestPermissionsAsync();
        if (notificationPermissionStatus !== "granted") {
          alert("You need to allow notifications to receive updates.");
        }
      }
    })();
  }, []);
  // Thạch Minh Luân - 22520827
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };
  // Thạch Minh Luân - 22520827
  const startRecording = async () => {
    if (!cameraRef.current) return;
    try {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      console.log("Video recorded:", video.uri);
      setVideoUri(video.uri);
      setHasFinishedRecording(true);
    } catch (error) {
      console.error("Lỗi khi quay video:", error);
    } finally {
      setIsRecording(false);
    }
  };
  // Thạch Minh Luân - 22520827
  const stopRecording = async () => {
    if (cameraRef.current) {
      await cameraRef.current.stopRecording();
    }
    setIsRecording(false);
  };
  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Video đã được lưu!",
          body: "Video mới đã được lưu thành công.",
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };
  // Thạch Minh Luân - 22520827
  const saveVideo = async () => {
    if (!videoUri) return;
    try {
      await MediaLibrary.createAssetAsync(videoUri);
      Alert.alert("Thành công", "Video đã được lưu vào thư viện.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
      sendNotification();
    } catch (error) {
      console.error("Lỗi khi lưu video:", error);
    }
  };
  // Thạch Minh Luân - 22520827
  if (!cameraPermission?.granted || !microphonePermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Vui lòng cấp quyền để được sử dụng camera.
        </Text>
        <Button title="Cấp quyền" onPress={requestCameraPermission} />
      </View>
    );
  }
  // Thạch Minh Luân - 22520827
  return (
    <View style={styles.container}>
      {hasFinishedRecording && videoUri ? (
        // Phát lại video đã quay
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
        />
      ) : (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          mode="video"
        />
      )}
      {/* // Thạch Minh Luân - 22520827 */}
      {hasFinishedRecording ? (
        <View style={styles.controlContainer}>
          <TouchableOpacity
            style={[styles.controlButton, styles.reRecordButton]}
            onPress={() => {
              setVideoUri("");
              setHasFinishedRecording(false);
            }}
          >
            {/* // Thạch Minh Luân - 22520827 */}
            <Text style={styles.controlText}>Re-Record</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.saveButton]}
            onPress={saveVideo}
          >
            <Text style={styles.controlText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : isRecording ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
            <Ionicons name="square" size={35} color={"white"} />
          </TouchableOpacity>
        </View>
      ) : (
        // Thạch Minh Luân - 22520827
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.recordButton}
            onPress={startRecording}
          >
            <Icon name="video" size={25} color="white" />
          </TouchableOpacity>
          <View style={{ position: "absolute", right: 20, top: 10 }}>
            <TouchableOpacity
              style={styles.toggleFacingButton}
              onPress={toggleCameraFacing}
            >
              {/* // Thạch Minh Luân - 22520827 */}
              <Icon name="arrows-rotate" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  camera: {
    flex: 1,
  },
  video: {
    // flex: 1,
    height: "90%",
  },
  btnContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  }, // Thạch Minh Luân - 22520827
  recordButton: {
    width: 80,
    height: 80,
    backgroundColor: "red",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  recordButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  toggleFacingButton: {
    backgroundColor: "#555",
    marginLeft: 20,
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
  }, // Thạch Minh Luân - 22520827
  controlContainer: {
    top: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  controlButton: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  reRecordButton: {
    backgroundColor: "red",
  }, // Thạch Minh Luân - 22520827
  saveButton: {
    backgroundColor: "blue",
  },
  controlText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
