
import { View, Text, StyleSheet } from 'react-native';


const HomeDetailsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>HomeDetailsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100
  }
})

export default HomeDetailsScreen;
