
import { View, Text, StyleSheet, Button } from 'react-native';


const NotificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>NotificationScreen</Text>
      <Button title="Go to detail"
      onPress={() => navigation.navigate('NotificationDetails')}
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

export default NotificationScreen;
