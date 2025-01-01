import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeDetailsScreen from "../pages/HomeDetailsScreen"
import MainBottom from "./MainBottom";
import HelpScreen from '../pages/HelpScreen'
import NotificationDetailsScreen from "../pages/NotificationDetailsScreen";
import NotificationScreen from "../pages/NotificationScreen";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';


const Drawer = createDrawerNavigator();
    {/*Thạch Minh Luân - 22520827*/}
const DrawerApp = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={MainBottom} 
        options={{
          drawerIcon: ({color}) => <Entypo name="home" size={24} color={color}/>
        }}
      />
      <Drawer.Screen name="NotificationsScreen" component={NotificationScreen} 
        options={{
          drawerIcon: ({color}) => <Ionicons name="notifications" size={24} color={color} />
        }}     
      />
      <Drawer.Screen name="Help" component={HelpScreen} 
        options={{
          drawerIcon: ({color}) => <Entypo name="help-with-circle" size={24} color={color}/>
        }}          
     />
    </Drawer.Navigator>
  );
}

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="DrawerApp"
      component={DrawerApp}
      options={{headerShown: false}}
    />
        {/*Thạch Minh Luân - 22520827*/}
    <HomeStack.Screen 
      name="HomeDetails" 
      component={HomeDetailsScreen} 
      options={{ title: 'Home Details' }}
    />
    <HomeStack.Screen 
      name="NotificationDetails" 
      component={NotificationDetailsScreen} 
      options={{ title: 'Notification Details' }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;