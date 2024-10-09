import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {

  {/* Thạch Minh Luân 22520827 */}
  const [Posts, setPosts] = useState([
    {
      id: 1,
      username: 'Minh Luân',
      avatar: require('./assets/avatar/Luan.jpg'),
      noidung: 'Hôm nay ngủ dậy, tôi cảm thấy mình quá đẹp trai',
      image: require('./assets/posts/Luan.png'),
      like: 1000,
      cmt: 200,
      share: 200,
      trangthai: false
    },
    {
      id: 2,
      username: 'Cao Quốc Kiệt',
      avatar: require('./assets/avatar/Kiet.jpg'),
      noidung: 'Giám đốc chuỗi nhà hàng bún đậu Phúc Kỳ chào cả nhà mình nha. Ai muốn tâm sự cứ nhắn cho mình...<3',
      image: require('./assets/posts/Kiet.png'),
      like: 9240,
      cmt: 1900,
      share: 100,
      trangthai: false
    },
    {
      id: 3,
      username: 'Đỗ Nguyên Phương',
      avatar: require('./assets/avatar/Phuong.jpg'),
      noidung: 'Anh chào mấy đứa nhá !!',
      image: require('./assets/posts/Phuong.png'),
      like: 2680,
      cmt: 720,
      share: 430,
      trangthai: false
    },
  ]);

  {/* Thạch Minh Luân 22520827 */}
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

  {/* Thạch Minh Luân 22520827 */}
  return (
   <View style={styles.container}>
      <ScrollView>
      <View style={styles.viewTitle}>
        <Image style={styles.logo} source={{uri: 'https://i0.wp.com/www.senviet.art/wp-content/uploads/edd/2021/12/dhuit.jpg?fit=700%2C525&ssl=1'}}/>
        <Text style={styles.textTitle}>UITers Feed</Text>
      </View>
        {Posts.map((item) => {
            return (
              // View mỗi bài đăng
              <View key={item.id + ""} style={styles.containerPost}>
                <View style={styles.post}>
                   {/* Thông tin người dùng */}
                  <View style={styles.avt_user}>
                    <Image style={styles.avatar} source={item.avatar}/>
                    <Text style={styles.username}>{item.username}</Text>
                  </View>   

                  {/* Thông tin bài đăng */}
                  <View>
                    <Text style={styles.noidung}>{item.noidung}</Text>
                    <Image style={styles.image} source={item.image}/>
                  </View>

                  {/* Số lượng tương tác */}
                  <View style={styles.reactContainer}>
                    <View style={styles.sluongReact}>
                      <Text>{item.like} Likes </Text>
                    </View>
                    <View style={styles.sluongReact}>
                      <Text>{item.cmt} Comments</Text>
                    </View>
                    <View style={styles.sluongReact}>
                      <Text>{item.share} Shares</Text>
                    </View>
                  </View>

                  {/* Line ngang */}
                  <View style={styles.lineStyle}></View>
                  {/* Thạch Minh Luân 22520827 */}
                  {/* Các nút tương tác */}
                  <View style={styles.reactContainer}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => SuKienNutLike(item.id)}>
                      <Image source={item.trangthai ? require('./assets/icon/thumb-up.png') :require('./assets/icon/like.png') } style={styles.icon}/>
                      <Text style={styles.textIcon}>Like</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle} onPress={() => SuKienNutCmt(item.id)}>
                      <Image source={require('./assets/icon/comment.png')} style={styles.icon}/>
                      <Text style={styles.textIcon}>Comment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle} onPress={() => SuKienNutShare(item.id)}>
                      <Image source={require('./assets/icon/share.png')} style={styles.icon}/>
                      <Text style={styles.textIcon}>share</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            )
        }           
      )}
      </ScrollView>
      </View>
  );
}
{/* Thạch Minh Luân 22520827 */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 50
  },
  containerPost: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
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
  post:{
    margin: 10, 
    backgroundColor: "#EFEFEF", 
    borderRadius: 10,
    borderColor: '#306CFF',
    borderWidth: 1
  },
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
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "grey",
    marginHorizontal: 10,
    marginVertical: 4
  },
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
