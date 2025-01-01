import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fetchAllProducts } from "../services/api";
import ProductItem from "../components/ProductItem";
import Banner from "../components/banner";
// Thạch Minh Luân - 22520827
const HomeScreen = ({ navigation }) => {
  const [productsHot, setProductsHot] = useState([]);
  const [productsNew, setProductsNew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAllProducts();
      const productHot = data.filter((product) => product.id <= 10);
      const productNew = data.filter((product) => product.id > 10);
      setProductsHot(productHot);
      setProductsNew(productNew);
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  // Thạch Minh Luân - 22520827
  return (
    <View>
      <ScrollView style={styles.container}>
        <Text style={styles.khauhieu}>KHÔNG MUA EM THÌ MUA AI?</Text>
        <Banner />

        <View style={styles.containerChild}>
          <Text style={styles.txtMuc}>Hot Deals 🔥</Text>
          <FlatList
            data={productsHot}
            numColumns={2}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
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

        <View style={styles.containerChild}>
          <Text style={styles.txtMuc}>New Arrivals</Text>
          <FlatList
            data={productsNew}
            numColumns={2}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
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
      </ScrollView>
    </View>
  );
};
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    paddingBottom: "10%",
  },
  containerChild: {
    padding: 5,
  },
  txtMuc: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  loaderContainer: {
    justifyContent: "center",
    height: "100%",
  },
  khauhieu: {
    alignSelf: "center",
    paddingVertical: 10,
    fontSize: 23,
    fontWeight: "bold",
    color: "orange",
    fontStyle: "italic",
  },
});

export default HomeScreen;
