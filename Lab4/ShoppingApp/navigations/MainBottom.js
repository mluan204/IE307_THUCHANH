import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';
import CategoriesScreen from '../pages/CategoriesScreen';
import CartsScreen from '../pages/CartsScreen'
import ProfileScreen from '../pages/ProfileScreen'
import ProductDetailScreen from '../pages/ProductDetailScreen';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 
const CategoriesStack = () => ( 
 <Stack.Navigator> 
    <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{headerShown: false}}/> 
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> 
  </Stack.Navigator> 
);

const HomeStack = () => ( 
  <Stack.Navigator> 
     <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/> 
     <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> 
   </Stack.Navigator> 
 );

const MainBottom = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({color}) => <FontAwesome name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesStack} 
        options={{
          tabBarIcon: ({color}) => <MaterialIcons name="category" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartsScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View>
              <FontAwesome name="shopping-cart" size={24} color={color} />
              <View style={styles.huyhieu}>
                <Text style={styles.txt}>3</Text>
              </View>
            </View>
          ),
        
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <FontAwesome name="user" size={24} color={color} />
        }}  
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  huyhieu: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white', 
    fontSize: 12, 
    fontWeight: 'bold' 
  }
})

export default MainBottom;
