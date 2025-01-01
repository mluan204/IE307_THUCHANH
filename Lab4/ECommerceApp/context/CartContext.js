import React, { createContext, useState, useEffect, useContext } from "react";
import {
  fetchCartById,
  fetchProductById,
  updateCartById,
  deleteCartById,
} from "../services/api";
import { AuthContext } from "./AuthContext";
import { Alert } from "react-native";

export const CartContext = createContext({
  loading: false,
  products: [],
  quantity: {},
  totalPrice: 0,
  fetchCartData: () => {},
  handleRemoveItem: () => {},
  handleIncreaseQuantity: () => {},
  handleDecreaseQuantity: () => {},
});

let cartId = null;
// Thạch Minh Luân - 22520827
export const CartProvider = ({ children }) => {
  const [productId, setProductId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { userId } = useContext(AuthContext);

  const fetchCartData = async () => {
    if (userId) {
      setLoading(true);
      const cartUser = await fetchCartById(userId);
      cartId = cartUser[0].id;
      if (cartUser.length > 0) {
        const productData = cartUser[0].products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        }));
        setProductId(productData.map((product) => product.productId));
        setQuantity(
          productData.reduce(
            (acc, item) => ({ ...acc, [item.productId]: item.quantity }),
            {}
          )
        );
      }

      if (productId.length > 0) {
        const productsData = await Promise.all(
          productId.map((id) => fetchProductById(id))
        );
        setProducts(productsData);
      }
      setLoading(false);
    }
  }; // Thạch Minh Luân - 22520827

  // Tính tổng giá khi products hoặc quantity thay đổi
  useEffect(() => {
    const calculateTotal = () => {
      const total = products.reduce((sum, product) => {
        const qty = quantity[product.id] || 0;
        return sum + product.price * qty;
      }, 0);
      setTotalPrice(total.toFixed(2));
    };

    calculateTotal();
  }, [products, quantity]);

  const addToCart = (product) => {
    if (!products.find((p) => p.id === product.id)) {
      setQuantity((prev) => ({
        ...prev,
        [product.id]: (prev[product.id] || 0) + 1,
      }));
      setProducts((prev) => [...prev, product]);
    } else {
      Alert.alert("Message", "This product is already in your cart.");
    }
  };
  // Thạch Minh Luân - 22520827
  const handleRemoveItem = async (productId) => {
    // Xóa sản phẩm khỏi state
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    const updatedQuantities = { ...quantity };
    delete updatedQuantities[productId];
    // Thạch Minh Luân - 22520827
    setProducts(updatedProducts);
    setQuantity(updatedQuantities);

    if (updatedProducts.length === 0) {
      // Xóa toàn bộ giỏ hàng nếu không còn sản phẩm nào
      try {
        await deleteCartById(cartId);
        console.log("Cart deleted successfully.");
      } catch (error) {
        console.error("Error deleting cart:", error);
      }
    } else {
      // Cập nhật lại giỏ hàng với các sản phẩm còn lại
      const productsToUpdate = updatedProducts.map((product) => ({
        productId: product.id,
        quantity: updatedQuantities[product.id],
      }));
      // Thạch Minh Luân - 22520827
      try {
        await updateCartById(
          cartId,
          userId,
          new Date().toISOString(),
          productsToUpdate
        );
        console.log("Cart updated successfully.");
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };
  // Thạch Minh Luân - 22520827
  const handleIncreaseQuantity = (productId) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };
  // Thạch Minh Luân - 22520827
  const handleDecreaseQuantity = (productId) => {
    setQuantity((prev) => {
      if (prev[productId] > 1) {
        return { ...prev, [productId]: prev[productId] - 1 };
      }
      return prev;
    });
  };
  // Thạch Minh Luân - 22520827
  return (
    <CartContext.Provider
      value={{
        loading,
        products,
        quantity,
        totalPrice,
        fetchCartData,
        handleRemoveItem,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
