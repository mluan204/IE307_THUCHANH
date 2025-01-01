import { View,Text, StyleSheet } from "react-native";


const InteractionCount = ({ like, cmt, share }) => {
    return (
      <View style={styles.reactContainer}>
        <View style={styles.sluongReact}>
          <Text>{like} Likes</Text>
        </View>
        <View style={styles.sluongReact}>
          <Text>{cmt} Comments</Text>
        </View>
        <View style={styles.sluongReact}>
          <Text>{share} Shares</Text>
        </View>
      </View>
    );
};
  // Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
    reactContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5
      },
    sluongReact:{
        fontSize: 16,
        color: "grey"
      },
})

export default InteractionCount;

  