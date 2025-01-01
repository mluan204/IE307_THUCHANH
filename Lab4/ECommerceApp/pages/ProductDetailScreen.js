import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { fetchProductById } from "../services/api";
// Thạch Minh Luân - 22520827
const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // Thạch Minh Luân - 22520827
  useEffect(() => {
    const getProduct = async () => {
      const productData = await fetchProductById(productId);
      setProduct(productData);
      navigation.setOptions({ title: productData.title });
      setLoading(false);
    };
    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  // Thạch Minh Luân - 22520827
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{product.rating.rate} ⭐ </Text>
        <Text style={styles.rating}>({product.rating.count} reviews)</Text>
      </View>
    </ScrollView>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderTopWidth: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginVertical: 5,
  },
  description: {
    fontSize: 20,
    color: "black",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  rating: {
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDetailScreen;
