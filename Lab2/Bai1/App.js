
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import CHeader from './components/CHeader';
import Post from './components/CPost';

const App = () => {

  const [Posts, setPosts] = useState([
    {
      id: 1,
      username: 'Minh Luân',
      avatar: require('./components/assets/avatar/Luan.jpg'),
      noidung: 'Hôm nay ngủ dậy, tôi cảm thấy mình quá đẹp trai',
      image: require('./components/assets/posts/Luan.png'),
      like: 1000,
      cmt: 200,
      share: 200,
      trangthai: false
    },
    {
      id: 2,
      username: 'Cao Quốc Kiệt',
      avatar: require('./components/assets/avatar/Kiet.jpg'),
      noidung: 'Giám đốc chuỗi nhà hàng bún đậu Phúc Kỳ chào cả nhà mình nha. Ai muốn tâm sự cứ nhắn cho mình...<3',
      image: require('./components/assets/posts/Kiet.png'),
      like: 9240,
      cmt: 1900,
      share: 100,
      trangthai: false
    },
    {
      id: 3,
      username: 'Đỗ Nguyên Phương',
      avatar: require('./components/assets/avatar/Phuong.jpg'),
      noidung: 'Anh chào mấy đứa nhá !!',
      image: require('./components/assets/posts/Phuong.png'),
      like: 2680,
      cmt: 720,
      share: 430,
      trangthai: false
    },
  ]);

  // Thạch Minh Luân - 22520827
  const SuKienNutLike = (id) =>{
    const CapNhatPost = Posts.map(post => post.id === id ? (
      post.trangthai ? {...post, trangthai: false, like: post.like-1}
                    : {...post, trangthai: true, like: post.like+1} 
    ) : post);
    setPosts(CapNhatPost);
  }

  const SuKienNutCmt = (id) =>{
    const CapNhatPost = Posts.map(post => post.id === id 
      ? {...post, cmt: post.cmt+1}
      : post
    );
    setPosts(CapNhatPost);
  }

  const SuKienNutShare = (id) =>{
    const CapNhatPost = Posts.map(post => post.id === id 
      ? {...post, share: post.share+1}
      : post
    );
    setPosts(CapNhatPost);
  }

  // Thạch Minh Luân - 22520827
  return (
   <View style={styles.container}>
      <ScrollView>
        <CHeader/>
        {Posts.map((item) => (
          <Post
          key={item.id}
          post={item}
          SuKienNutLike={SuKienNutLike}
          SuKienNutCmt={SuKienNutCmt}
          SuKienNutShare={SuKienNutShare}
          />
        ))}
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 50
  },
});

export default App;