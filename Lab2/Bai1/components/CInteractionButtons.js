
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const InteractionButtons = ({ trangthai, SuKienNutLike, SuKienNutCmt, SuKienNutShare, id }) => {
    return (
      <View style={styles.reactContainer}>
        <TouchableOpacity style={styles.btnStyle} onPress={() => SuKienNutLike(id)}>
          <Image source={trangthai ? require('./assets/icon/thumb-up.png') : require('./assets/icon/like.png')} style={styles.icon} />
          <Text style={styles.textIcon}>Like</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.btnStyle} onPress={() => SuKienNutCmt(id)}>
          <Image source={require('./assets/icon/comment.png')} style={styles.icon} />
          <Text style={styles.textIcon}>Comment</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.btnStyle} onPress={() => SuKienNutShare(id)}>
          <Image source={require('./assets/icon/share.png')} style={styles.icon} />
          <Text style={styles.textIcon}>Share</Text>
        </TouchableOpacity>
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
    btnStyle:{
        flexDirection: "row"
    },
    icon: {
        width: 30,
        height: 30
    },
    textIcon: {
        marginVertical: 2,
        marginStart: 5,
        fontSize: 20
    }
});

export default InteractionButtons;

  