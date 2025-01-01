import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";

const categoryIcons = {
  All: require("../assets/icon/all.png"),
  electronics: require("../assets/icon/electronic.png"),
  jewelery: require("../assets/icon/jewelery.png"),
  "men's clothing": require("../assets/icon/men.png"),
  "women's clothing": require("../assets/icon/women.png"),
};
// Thạch Minh Luân - 22520827
const CategoryItem = ({ category, onPress, isActive }) => {
  const iconName = categoryIcons[category];
  // Thạch Minh Luân - 22520827
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {/* <FontAwesome6 name={iconName} size={24} color= {isActive ? "blue" : "black"} /> */}
        <Image source={iconName} style={styles.icon} />
        <Text
          style={[
            styles.txt,
            { color: isActive ? "blue" : "black" },
            { textDecorationLine: isActive ? "underline" : "none" },
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: 17,
    fontWeight: "bold",
  },
  icon: {
    height: 35,
    width: 35,
  },
});

export default CategoryItem;
