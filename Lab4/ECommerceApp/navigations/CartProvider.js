import React from "react";
import { CartProvider } from "../context/CartContext";
import CartsScreen from "../pages/CartsScreen";
// Thạch Minh Luân - 22520827
const App = () => {
  return (
    <CartProvider>
      <CartsScreen />
    </CartProvider>
  );
};

export default App;
