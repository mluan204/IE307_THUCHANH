import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchProducts } from '../services/api';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
