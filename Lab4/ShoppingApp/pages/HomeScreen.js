import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchAllProducts } from '../services/api';
import ProductItem from '../components/ProductItem';
import Banner from '../components/banner';

const HomeScreen = ({ navigation }) => {
  const [productsHot, setProductsHot] = useState([]);
  const [productsNew, setProductsNew] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAllProducts();
      const productHot = data.filter(product => product.id <= 10);
      const productNew = data.filter(product => product.id > 10);
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
  );}


  return (
    <ScrollView style={styles.container}>
      <Text>CAI GI DO RAT LA OK</Text>
      <Banner/>
      <View style={styles.containerChild}>
        <Text style={styles.txtMuc}>Hot Deals 🔥</Text>
        <FlatList
          data={productsHot}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <ProductItem
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
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
          renderItem={({ item }) => (
              <ProductItem
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
              />

          )}
        />
      </View>

    </ScrollView>
  );

//   return (
//     <FlatList
//       ListHeaderComponent={
//         <>
//           <Text style={styles.headerText}>CAI GI DO RAT LA OK</Text>
//           <Banner />
//           <View style={styles.containerChild}>
//             <Text style={styles.txtMuc}>Hot Deals 🔥</Text>
//           </View>
//         </>
//       }
//       data={productsHot.concat(productsNew)} 
//       numColumns={1}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item, index }) => {
//         if (index === productsHot.length) {
//           return (
//             <View style={styles.containerChild}>
//               <Text style={styles.txtMuc}>New Arrivals</Text>
//             </View>
//           );
//         }
//         return (
//           <ProductItem
//             product={item}
//             onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
//           />
//         );
//       }}
//     />
//   );


};


const styles = StyleSheet.create({
    container: {
      paddingBottom: '10%'
    },
    containerChild: {
      padding: 5,
    },
    txtMuc: {
      fontSize: 30,
      fontWeight: "bold",
      paddingLeft: 10
    },
    loaderContainer: {
      justifyContent: "center",
      height: '100%'
    }
})

export default HomeScreen;
