import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { fetchCategories, fetchAllProducts, fetchProductsByCategory } from '../services/api';

import CategoryItem from '../components/categoryItem';
import ProductItem from '../components/ProductItem';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
      const products = await fetchAllProducts();
      setProducts(products);
    };
    getCategories();
  }, []);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      const products = await fetchAllProducts();
      setProducts(products);
    } else {
      const products = await fetchProductsByCategory(category);
      setProducts(products);
    }
  };

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
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem product={item} onPress={() => navigation.navigate('Products', { productId: item.id })} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    borderTopWidth: 1
  }, 
  container: {
    paddingBottom: '20%'
  }
})

export default CategoriesScreen;
