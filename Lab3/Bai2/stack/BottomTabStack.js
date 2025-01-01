import HomeStack from "./HomeStack"
import SettingScreen from "../pages/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    const {darkMode} = useContext(SettingsContext);
    // Thạch Minh Luân - 22520827
    return(
        <Tab.Navigator 
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: darkMode ? '#333' : '#fff'
                },
                headerStyle: {
                    backgroundColor: darkMode ? '#333' : '#fff' 
                },
                headerTintColor: darkMode ? '#fff' : '#333', 
                tabBarInactiveTintColor: darkMode ? '#888' : '#555',
                tabBarActiveTintColor: darkMode ? '#fff' : '#333'
            }}
        >
              <Tab.Screen name="Home" component={HomeStack} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => <Icon name="home" size={24} color={color}/>    
                }}/>
              <Tab.Screen name="Settings" component={SettingScreen}
                options={{
                    tabBarIcon: ({color}) => <Icon name="gear" size={24} color={color}/>    
                }}/>
          </Tab.Navigator>
    )
}

export default BottomTab;