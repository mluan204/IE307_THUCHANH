import { View, Image, Text, StyleSheet } from "react-native";

export default function AvatarUser  ({ avatar, username }){
    return (
      <View style={styles.avt_user}>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.username}>{username}</Text>
      </View>
    );
  };

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
  })

  