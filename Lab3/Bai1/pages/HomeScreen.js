
import { View, Text, StyleSheet, Button } from 'react-native';


const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Go to detail"
      onPress={() => navigation.navigate('HomeDetails')}
      />
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

export default HomeScreen;
