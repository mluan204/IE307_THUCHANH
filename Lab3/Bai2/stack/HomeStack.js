import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen";
import AddNotesScreen from "../pages/AddNotesSCreen";
import EditNotesScreen from "../pages/EditNotesScreen";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";


const Stack = createStackNavigator();
// Thạch Minh Luân - 22520827
const HomeStack = () => {
    const {darkMode} = useContext(SettingsContext);
    return(
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
        tabBarStyle: { 
            backgroundColor: darkMode ? '#000' : '#fff'
        },
        headerStyle: {
            backgroundColor: darkMode ? '#000' : '#fff' 
        },
        headerTintColor: darkMode ? '#fff' : '#000', 
        tabBarInactiveTintColor: darkMode ? '#888' : '#555',
        tabBarActiveTintColor: darkMode ? '#fff' : '#000'
    }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}
            options={{headerShown: false}}        />
        <Stack.Screen name="AddNotesScreen" component={AddNotesScreen}/>
        <Stack.Screen name="EditNotesScreen" component={EditNotesScreen}/>
    </Stack.Navigator>
    )
}

export default HomeStack;