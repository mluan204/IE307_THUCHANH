import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="LOG OUT" onPress={() => logout()} />
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100
  }
})

export default ProfileScreen;
