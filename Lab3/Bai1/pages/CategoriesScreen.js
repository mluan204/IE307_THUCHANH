
import { View, Text, StyleSheet } from 'react-native';

const CategoriesScreen = ({title}) => {

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};
    {/*Thạch Minh Luân - 22520827*/}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100
  }
})

export default CategoriesScreen;
