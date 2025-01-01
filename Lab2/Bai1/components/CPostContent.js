import { View, Text, Image, StyleSheet } from "react-native";

const CPostContent = ({noidung, image}) => {
    return (
        <View>
          <Text style={styles.noidung}>{noidung}</Text>
          <Image style={styles.image} source={image} />
        </View>
      );
};
  // Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
    noidung: {
        fontSize: 22,
        marginStart: 12
      },
    image: {
        width: 'auto',
        height: 400,
        borderRadius: 10,
        marginHorizontal: 7,
        marginVertical: 4
      },
});

export default CPostContent;

