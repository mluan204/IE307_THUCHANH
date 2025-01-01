import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoriesScreen from '../pages/CategoriesScreen';

const TopTab = createMaterialTopTabNavigator();
    {/*Thạch Minh Luân - 22520827*/}
const CategoryTabNavigator = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Category1">
      {() => <CategoriesScreen title="Category 1" />}
    </TopTab.Screen>
    <TopTab.Screen name="Category2">
      {() => <CategoriesScreen title="Category 2" />}
    </TopTab.Screen>
    <TopTab.Screen name="Category3">
      {() => <CategoriesScreen title="Category 3" />}
    </TopTab.Screen>
  </TopTab.Navigator>
);

export default CategoryTabNavigator;
