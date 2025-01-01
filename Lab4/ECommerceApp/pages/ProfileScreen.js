import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { fetchUserById } from "../services/api";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
// Thạch Minh Luân - 22520827
const ProfileScreen = () => {
  const { logout, userId } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  function InHoaChuCai(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(() => {
    const getUser = async () => {
      console.log("userId: " + userId);
      if (userId) {
        const userData = await fetchUserById(userId);
        setUserInfo(userData);
        setLoading(false);
      }
    };
    getUser();
  }, []);
  // Thạch Minh Luân - 22520827
  const handleUserUpdate = (updatedUser) => {
    setUserInfo(updatedUser);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.avt}
          source={{
            uri: "https://i.pinimg.com/originals/59/f0/d0/59f0d0067c5d04c5db5f92f517767002.jpg",
          }}
        />
        <Text style={styles.nameuser}>
          {InHoaChuCai(`${userInfo.name.firstname} ${userInfo.name.lastname}`)}
        </Text>

        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            navigation.navigate("EditScreen", {
              userInfo: userInfo,
              onUpdate: handleUserUpdate,
            })
          }
        >
          <Icon name="edit" size={35} />
        </TouchableOpacity>
      </View>
      {/* Thạch Minh Luân - 22520827 */}
      {/* Information */}
      <View style={styles.card}>
        <Text style={styles.thuoctinh}>Name: </Text>
        <Text style={styles.dulieu}>
          {userInfo.name.firstname} {userInfo.name.lastname}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.thuoctinh}>Username: </Text>
        <Text style={styles.dulieu}>{userInfo.username}</Text>
      </View>
      {/* Thạch Minh Luân - 22520827 */}
      <View style={styles.card}>
        <Text style={styles.thuoctinh}>Email: </Text>
        <Text style={styles.dulieu}>{userInfo.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.thuoctinh}>Phone: </Text>
        <Text style={styles.dulieu}>{userInfo.phone}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.thuoctinh}>Address: </Text>
        <Text style={styles.dulieu}>
          {userInfo.address.number}, {userInfo.address.street},{" "}
          {userInfo.address.city}
        </Text>
      </View>
      <Button title="LOG OUT" onPress={logout} />
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100,
  },
  loaderContainer: {
    justifyContent: "center",
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
  },
  avt: {
    height: 100,
    width: 100,
    borderRadius: 500,
    borderWidth: 4,
  },
  nameuser: {
    fontSize: 30,
    fontWeight: "bold",
    height: "100%",
    width: "60%",
    padding: 20,
  },
  card: {
    width: "100%",
    margin: 7,
  },
  // Thạch Minh Luân - 22520827
  thuoctinh: {
    fontSize: 23,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  dulieu: {
    fontSize: 20,
    fontWeight: "400",
    paddingHorizontal: 15,
  },
  icon: {
    right: 20,
    top: 40,
  },
});

export default ProfileScreen;
