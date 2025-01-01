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

export default function VideoScreen({ navigation }) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState("");
  const [hasFinishedRecording, setHasFinishedRecording] = useState(false);
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();

  useEffect(() => {
    (async () => {
      await requestCameraPermission();
      await requestMicrophonePermission();
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Cần quyền truy cập thư viện để lưu video.");
      }
    })();
  }, []);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

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

  const stopRecording = async () => {
    if (cameraRef.current) {
      await cameraRef.current.stopRecording();
    }
    setIsRecording(false);
  };

  const saveVideo = async () => {
    if (!videoUri) return;
    try {
      await MediaLibrary.createAssetAsync(videoUri);
      Alert.alert("Thành công", "Video đã được lưu vào thư viện.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Lỗi khi lưu video:", error);
    }
  };

  if (!cameraPermission?.granted || !microphonePermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Cần cấp quyền truy cập để sử dụng camera
        </Text>
        <Button title="Cấp quyền" onPress={requestCameraPermission} />
      </View>
    );
  }

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

      {hasFinishedRecording ? (
        <View style={styles.controlContainer}>
          <TouchableOpacity
            style={[styles.controlButton, styles.reRecordButton]}
            onPress={() => {
              setVideoUri("");
              setHasFinishedRecording(false);
            }}
          >
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
              <Icon name="arrows-rotate" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

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
  },
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
  },
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
  },
  saveButton: {
    backgroundColor: "blue",
  },
  controlText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
