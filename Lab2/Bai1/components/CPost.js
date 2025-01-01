import React from 'react';
import { View, StyleSheet } from 'react-native';
import CAvtUser from './CAvtUser'
import CPostConten from './CPostContent'
import CInteractionCount from './CInteractionCount'
import CInteractionButtons from './CInteractionButtons'

const Post = ({ post, SuKienNutLike, SuKienNutCmt, SuKienNutShare }) => {
    return (
      <View style={styles.containerPost}>
        <View style={styles.post}>
          <CAvtUser avatar={post.avatar} username={post.username} />
          <CPostConten noidung={post.noidung} image={post.image} />
          <CInteractionCount like={post.like} cmt={post.cmt} share={post.share} />
          <View style={styles.lineStyle}></View>
          <CInteractionButtons
            trangthai={post.trangthai}
            SuKienNutLike={SuKienNutLike}
            SuKienNutCmt={SuKienNutCmt}
            SuKienNutShare={SuKienNutShare}
            id={post.id}
          />
        </View>
      </View>
    );
  };
    // Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
    containerPost: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    post:{
        margin: 10, 
        backgroundColor: "#EFEFEF", 
        borderRadius: 10,
        borderColor: '#306CFF',
        borderWidth: 1
    },

    lineStyle: {
        borderWidth: 0.5,
        borderColor: "grey",
        marginHorizontal: 10,
        marginVertical: 4
      },
});

export default Post;
