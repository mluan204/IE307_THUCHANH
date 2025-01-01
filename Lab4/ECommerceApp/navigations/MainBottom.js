import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen";
import CategoriesScreen from "../pages/CategoriesScreen";
import CartsScreen from "../pages/CartsScreen";
import ProfileScreen from "../pages/ProfileScreen";
import ProductDetailScreen from "../pages/ProductDetailScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, Text, StyleSheet } from "react-native";
import EditScreen from "../pages/EditScreen";
import { CartContext } from "../context/CartContext";
import React, { useContext, useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Thạch Minh Luân - 22520827
const CategoriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CategoriesScreen"
      component={CategoriesScreen}
      options={{ headerShown: true, headerTitle: "Category" }}
    />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: true, headerTitle: "Home" }}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};
// Thạch Minh Luân - 22520827
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EditScreen" component={EditScreen} />
  </Stack.Navigator>
);
// Thạch Minh Luân - 22520827
const MainBottom = ({ navigation, route }) => {
  const { products } = useContext(CartContext);

  React.useLayoutEffect(() => {
    console.log(route);
    if (route) {
      const routeName = getFocusedRouteNameFromRoute(route) ?? "";
      console.log(routeName);
      if (routeName === "ProductDetail") {
        navigation.setOptions({ headerShown: false });
      } else {
        navigation.setOptions({ tabBarVisible: true });
      }
    }
  }, [navigation, route]);
  // Thạch Minh Luân - 22520827
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      {/* // Thạch Minh Luân - 22520827 */}
      <Tab.Screen
        name="Cart"
        component={CartsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <FontAwesome name="shopping-cart" size={24} color={color} />
              {products.length == 0 ? null : (
                <View style={styles.huyhieu}>
                  <Text style={styles.txt}>{products.length}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      {/* // Thạch Minh Luân - 22520827 */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  huyhieu: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MainBottom;
