import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import CategoriesScreen from '../pages/CategoriesScreen';
import FavoritesScreen from '../pages/FavoritesScreen'
import ProfileScreen from '../pages/ProfileScreen'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
// Thạch Minh Luân - 22520827
const MainBottom = () => {
  return (
    <Tab.Navigator>
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
        component={CategoriesScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <MaterialIcons name="category" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          headerShown: false,
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
          headerShown: false,
          tabBarIcon: ({color}) => <FontAwesome name="user" size={24} color={color} />
        }}  
      />
    </Tab.Navigator>
  );
};
// Thạch Minh Luân - 22520827
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
