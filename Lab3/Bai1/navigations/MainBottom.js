import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import FavouritesScreen from '../pages/FavouritesScreen'
import ProfileScreen from '../pages/ProfileScreen'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';
import CategoryTabNavigator from './CategoryTabNavigator';
import HomeScreen from '../pages/HomeScreen';

const Tab = createBottomTabNavigator();
    {/*Thạch Minh Luân - 22520827*/}
const MainBottom = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    console.log("Route:", route);
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log("Current route name:", routeName);
    if (routeName === "Categories" || routeName === "Favourites" || routeName === 'Profile'){
        navigation.setOptions({headerShown: false});
    }else {
        navigation.setOptions({headerShown: true});
    }
  }, [navigation, route]);
  return (
    <Tab.Navigator screenOptions={{headerShown: true}}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Entypo name="home" size={24} color={color}/>
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoryTabNavigator} 
        options={{
          tabBarIcon: ({color}) => <MaterialIcons name="category" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Favourites" 
        component={FavouritesScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <MaterialIcons name="favorite" size={24} color={color} />
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
          tabBarIcon: ({color}) => <FontAwesome name="user" size={24} color={color} />
        }}  
      />
          {/*Thạch Minh Luân - 22520827*/}
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
    {/*Thạch Minh Luân - 22520827*/}
export default MainBottom;
