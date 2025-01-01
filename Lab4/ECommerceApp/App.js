import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppNavigator from "./navigations/AppNavigator";

// Thạch Minh Luân - 22520827
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
