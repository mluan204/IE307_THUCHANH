import { View, Image, Text, StyleSheet } from "react-native"

const Header = ({ isDarkMode }) => (
  <View>
    <Image
      style={styles.logo}
      source={{ uri: 'https://www.scorchsoft.com/public/capabilities/head/react-native-logo-square.webp' }}
    />
    <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>React Native App</Text>
  </View>
);
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 100,
        borderRadius: 50,
        alignSelf: "center"
      },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        alignSelf: "center"
    },
    darkText: {
        fontSize: 20,
        color: "#fff"
    },
      lightText: {
        fontSize: 20,
        color: "#0a0a0a"
    },
})

export default Header;