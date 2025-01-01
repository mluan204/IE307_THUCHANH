import { View, Image, Text, StyleSheet } from "react-native";

const  AvatarUser = ({ avatar, username }) => {
    return (
      <View style={styles.avt_user}>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.username}>{username}</Text>
      </View>
    );
  };
  // Thạch Minh Luân - 22520827
  const styles = StyleSheet.create({
    avt_user:{
        flexDirection: "row",
        margin: 5
      },
      avatar: {
        width: 60,
        height: 60,
        borderRadius: 50
      },
      username: {
        fontSize: 23,
        fontWeight: 'bold',
        alignItems: "center",
        padding: 12
      },
  });

export default AvatarUser;

  