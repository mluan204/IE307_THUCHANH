import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



const categoryIcons = { 
    All: "shapes", 
    electronics: "tv", 
    jewelery: "diamond", 
    "men's clothing": "tshirt", 
    "women's clothing": "female",
 };

const CategoryItem = ({ category, onPress, isActive }) => {
  const iconName = categoryIcons[category];

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <FontAwesome6 name={iconName} size={24} color= {isActive ? "blue" : "black"} />
            <Text style={[styles.txt, { color: isActive ? "blue" : "black" }]}>{category}</Text>
        </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
    container:{
        alignContent: "center",
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    txt: {
        fontSize: 15
    }
})

export default CategoryItem;
