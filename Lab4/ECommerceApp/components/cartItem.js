import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";

const CartItem = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
  const total = (product.price * quantity).toFixed(2);
  // Thạch Minh Luân - 22520827
  const handleIncreaseQuantity = () => {
    if (onIncrease) {
      onIncrease(product.id);
    }
  };

  const handleDecreaseQuantity = () => {
    if (onDecrease && quantity > 1) {
      onDecrease(product.id);
    }
  };
  // Thạch Minh Luân - 22520827
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{product.title}</Text>
      </View>

      <View style={styles.img_priceContainer}>
        <Image source={{ uri: product.image }} style={styles.img} />
        <View style={styles.price_quantityContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecreaseQuantity}>
              <FontAwesome6 name="minus" size={17} color="black" />
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity onPress={handleIncreaseQuantity}>
              <FontAwesome6 name="plus" size={17} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* // Thạch Minh Luân - 22520827 */}
        {/* Total va remove */}
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total: ${total}</Text>
          <TouchableOpacity onPress={onRemove}>
            <FontAwesome6 name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: "auto",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
  },
  titleContainer: {
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  img_priceContainer: {
    margin: 5,
    flexDirection: "row",
    borderColor: "orange",
  },
  price_quantityContainer: {
    width: "25%",
    height: "auto",
    marginStart: 30,
    borderColor: "red",
  },
  quantityContainer: {
    width: 90,
    height: 30,
    margin: 5,
    marginTop: 10,
    flexDirection: "row",
    borderColor: "green",
    alignItems: "center",
    alignContent: "center",
  }, // Thạch Minh Luân - 22520827
  totalContainer: {
    width: "47%",
    flexDirection: "row",
    borderColor: "blue",
    alignItems: "center",
  },
  title: {
    fontSize: 21,
    fontWeight: "00",
  },
  img: {
    height: 90,
    width: "20%",
    margin: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "left",
    marginStart: 5,
  },
  quantity: {
    fontSize: 20,
    paddingHorizontal: 8,
    textAlign: "center",
    width: 40,
  }, // Thạch Minh Luân - 22520827
  total: {
    width: "80%",
    fontSize: 19,
    fontWeight: "bold",
  },
});
// Thạch Minh Luân - 22520827
export default CartItem;
