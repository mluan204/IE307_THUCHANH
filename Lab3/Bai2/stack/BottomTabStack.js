import HomeStack from "./HomeStack"
import SettingScreen from "../pages/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Icon  from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return(
        <Tab.Navigator>
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