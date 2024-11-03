import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen";
import AddNotesScreen from "../pages/AddNotesSCreen";
import EditNotesScreen from "../pages/EditNotesScreen";


const Stack = createStackNavigator();

const HomeStack = () => {
    return(
    <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen}
            options={{headerShown: false}}        />
        <Stack.Screen name="AddNotesScreen" component={AddNotesScreen}/>
        <Stack.Screen name="EditNotesScreen" component={EditNotesScreen}/>
    </Stack.Navigator>
    )
}

export default HomeStack;