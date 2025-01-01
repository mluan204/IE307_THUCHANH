import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/cartItem";
import { useNavigation } from "@react-navigation/native";
// Thạch Minh Luân - 22520827
const CartsScreen = () => {
  const {
    loading,
    products,
    quantity,
    totalPrice,
    fetchCartData,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useContext(CartContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleNavigateToHome = () => {
    navigation.navigate("Home"); // Điều hướng đến trang chủ
  };
  // Thạch Minh Luân - 22520827
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty!</Text>
        <Button title="Go Shopping" onPress={handleNavigateToHome} />
      </View>
    );
  }
  // Thạch Minh Luân - 22520827
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            product={item}
            quantity={quantity[item.id]}
            onIncrease={() => handleIncreaseQuantity(item.id)}
            onDecrease={() => {
              if (quantity[item.id] > 1) {
                handleDecreaseQuantity(item.id);
              } else {
                setProductToRemove(item.id);
                setModalVisible(true);
              }
            }}
            onRemove={() => {
              setProductToRemove(item.id);
              setModalVisible(true);
            }}
          />
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalPrice}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      {/* // Thạch Minh Luân - 22520827 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.contentModal}>
            <Text style={styles.modalTitle}>
              Are you sure you want to remove this item?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ ...styles.btn, backgroundColor: "red" }}
              >
                <Text style={styles.txtBtn}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                title="Yes"
                onPress={() => {
                  handleRemoveItem(productToRemove);
                  setModalVisible(false);
                }}
                style={{ ...styles.btn, backgroundColor: "blue" }}
              >
                {/* // Thạch Minh Luân - 22520827  */}
                <Text style={styles.txtBtn}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "black",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 50,
  },
  contentModal: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  // Thạch Minh Luân - 22520827
  btn: {
    width: "40%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  txtBtn: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default CartsScreen;
