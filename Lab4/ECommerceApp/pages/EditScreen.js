import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
// Thạch Minh Luân - 22520827
export default function EditScreen({ route, navigation }) {
  const { userInfo, onUpdate } = route.params;

  // State lưu trữ dữ liệu chỉnh sửa
  const [editedUser, setEditedUser] = useState({
    name: {
      firstname: userInfo.name.firstname,
      lastname: userInfo.name.lastname,
    },
    username: userInfo.username,
    email: userInfo.email,
    phone: userInfo.phone,
    address: {
      number: userInfo.address.number.toString(),
      street: userInfo.address.street,
      city: userInfo.address.city,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateUser}
        >
          <Icon name="check" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [editedUser]);
  // Thạch Minh Luân - 22520827
  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/users/${userInfo.id}`,
        {
          email: editedUser.email,
          username: editedUser.username,
          password: userInfo.password,
          name: {
            firstname: editedUser.name.firstname,
            lastname: editedUser.name.lastname,
          },
          address: {
            city: editedUser.address.city,
            street: editedUser.address.street,
            number: parseInt(editedUser.address.number, 10),
            zipcode: userInfo.address.zipcode,
            geolocation: userInfo.address.geolocation,
          },
          phone: editedUser.phone,
        }
      );
      console.log("Updated user:", response.data);
      if (onUpdate) onUpdate(response.data);

      Alert.alert("Success", "User information updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert(
        "Error",
        "Failed to update user information. Please try again."
      );
    }
  };
  // Thạch Minh Luân - 22520827
  const handleInputChange = (
    field,
    value,
    isNested = false,
    nestedField = null
  ) => {
    if (isNested && nestedField) {
      setEditedUser((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [nestedField]: value,
        },
      }));
    } else {
      setEditedUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* // Thạch Minh Luân - 22520827 */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            defaultValue={editedUser.name.firstname}
            onChangeText={(text) =>
              handleInputChange("name", text, true, "firstname")
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            defaultValue={editedUser.name.lastname}
            onChangeText={(text) =>
              handleInputChange("name", text, true, "lastname")
            }
          />
        </View>
      </View>
      {/* // Thạch Minh Luân - 22520827 */}
      {/* Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          defaultValue={editedUser.username}
          onChangeText={(text) => handleInputChange("username", text)}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          defaultValue={editedUser.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          defaultValue={editedUser.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
        />
      </View>
      {/* // Thạch Minh Luân - 22520827 */}
      {/* House Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>House Number</Text>
        <TextInput
          style={styles.input}
          placeholder="House Number"
          keyboardType="numeric"
          defaultValue={editedUser.address.number}
          onChangeText={(text) =>
            handleInputChange("address", text, true, "number")
          }
        />
      </View>

      {/* Street */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street</Text>
        <TextInput
          style={styles.input}
          placeholder="Street"
          defaultValue={editedUser.address.street}
          onChangeText={(text) =>
            handleInputChange("address", text, true, "street")
          }
        />
      </View>
      {/* // Thạch Minh Luân - 22520827 */}
      {/* City */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          defaultValue={editedUser.address.city}
          onChangeText={(text) =>
            handleInputChange("address", text, true, "city")
          }
        />
      </View>
    </ScrollView>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 8,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  updateButton: {
    marginRight: 16,
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
});
