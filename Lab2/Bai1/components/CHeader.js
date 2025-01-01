import { View, Text, Image, StyleSheet } from "react-native";

const CHeader = () => {
    return (
        <View style={styles.viewTitle}>
        <Image style={styles.logo} source={{uri: 'https://i0.wp.com/www.senviet.art/wp-content/uploads/edd/2021/12/dhuit.jpg?fit=700%2C525&ssl=1'}}/>
        <Text style={styles.textTitle}>UITers Feed</Text>
      </View>
    );
};
  // Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  viewTitle: {
    width: '100%',
    height: '3%',
    backgroundColor: "#EFEFEF",
    flexDirection: 'row',
    borderColor: '#306CFF',
    borderWidth: 1
  },
  logo: {
    width: '30%',
    height: '100%'
  },
  textTitle: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: "#306CFF",
    fontSize: 32,
    marginBottom: 4,
    fontWeight: "bold",
    paddingTop: 8,
    paddingStart: 20
  },
});
  // Thạch Minh Luân - 22520827
export default CHeader;