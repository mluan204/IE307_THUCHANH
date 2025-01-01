import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
// Thạch Minh Luân - 22520827
const ProductItem = ({ product, onPress }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.childContainer}>
        <Image source={{ uri: product.image }} style={styles.img} />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{product.rating.rate} ⭐ </Text>
          <Text style={styles.rating}>({product.rating.count})</Text>
        </View>
        {/* // Thạch Minh Luân - 22520827 */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => addToCart(product)}
      >
        <FontAwesome6 name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    width: "48%",
    height: "auto",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  childContainer: {
    padding: 5,
    flex: 1,
  }, // Thạch Minh Luân - 22520827
  priceContainer: {
    flexDirection: "row",
  },
  img: {
    height: 200,
    width: "90%",
    margin: 2,
    alignSelf: "center",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginVertical: 4,
  },
  rating: {
    fontSize: 18,
  },
  btnAdd: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "blue",
    borderRadius: 24,
    padding: 5,
  },
});

export default ProductItem;
