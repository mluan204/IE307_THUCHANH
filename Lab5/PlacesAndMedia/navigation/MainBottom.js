import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PlacesScreen from "../pages/PlacesScreen";
import AddPlaceScreen from "../pages/AddPlaceScreen";
import MediaScreen from "../pages/MediaScreen";
import Icon from "react-native-vector-icons/FontAwesome6";
import PickMap from "../pages/PickMap";
import Content from "../pages/Content";
import Map from "../pages/Map";
import VideoView from "../pages/VideoView";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlaceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Place"
        component={PlacesScreen}
        options={({ navigation }) => ({
          headerTitle: "My Places",
          headerRight: () => (
            <Icon
              name="plus" // Biểu tượng thêm mới
              size={25}
              color="orange"
              onPress={() => navigation.navigate("AddPlace")} // Điều hướng đến màn hình AddPlace
              style={{ marginRight: 20 }} // Đặt lề phải cho icon
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlaceScreen}
        options={{ headerTitle: "Add new a place" }}
      />
      <Stack.Screen name="PickMap" component={PickMap} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

const MediaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="VideoRecord" component={VideoView} />
    </Stack.Navigator>
  );
};

export default function MainBottom() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PlaceStack"
        component={PlaceStack}
        options={{
          headerShown: false,
          title: "Places",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="location-dot" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MediaStack"
        component={MediaStack}
        options={{
          headerShown: false,
          title: "Media",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="images" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
