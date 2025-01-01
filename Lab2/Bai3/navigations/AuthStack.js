import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/LoginScreen';
import SignupScreen from '../pages/SignupScreen';

const Stack = createStackNavigator();
// Thạch Minh Luân - 22520827
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{headerShown: false}}/>
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
