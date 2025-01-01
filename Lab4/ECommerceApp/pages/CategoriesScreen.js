import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import {
  fetchCategories,
  fetchAllProducts,
  fetchProductsByCategory,
} from "../services/api";

import CategoryItem from "../components/categoryItem";
import ProductItem from "../components/ProductItem";
// Thạch Minh Luân - 22520827
const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
      const products = await fetchAllProducts();
      setProducts(products);
      setLoading(false);
    };
    getCategories();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleCategorySelect("All");
    }, [])
  );
  // Thạch Minh Luân - 22520827
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      const products = await fetchAllProducts();
      setProducts(products);
    } else {
      const products = await fetchProductsByCategory(category);
      setProducts(products);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onPress={() => handleCategorySelect(item)}
              isActive={selectedCategory === item}
            />
          )}
        />
      </View>
      {/* Thạch Minh Luân - 22520827 */}
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: item.id })
            }
          />
        )}
      />
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    borderTopWidth: 1,
  },
  container: {
    paddingBottom: "20%",
  },
  loaderContainer: {
    justifyContent: "center",
    height: "100%",
  },
});

export default CategoriesScreen;
