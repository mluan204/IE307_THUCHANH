
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const SignupScreen = ({navigation}) => {
  // Thạch Minh Luân - 22520827
  return (
    <View style={styles.viewCha}>
      <View>
        <Image
          style={styles.logo}
          source={{ uri: 'https://www.scorchsoft.com/public/capabilities/head/react-native-logo-square.webp' }}
        />
        <Text style={styles.title}>Create New Account</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <Image 
            style={styles.icon}
            source={{uri: "https://cdn-icons-png.flaticon.com/128/1077/1077063.png"}}/>
          <TextInput 
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor={"#666"}
            />
        </View>

        <View style={styles.viewInput}>
          <Image 
            style={styles.icon}
            source={{uri: "https://cdn-icons-png.flaticon.com/128/542/542638.png"}}/>
          <TextInput 
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor={"#666"}
            />
        </View>

        <View style={styles.viewInput}>
          <Image 
            style={styles.icon}
            source={{uri: "https://cdn-icons-png.flaticon.com/128/9512/9512572.png"}}/>
          <TextInput 
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={"#666"}
            secureTextEntry={true}
            />
        </View>

        <View style={styles.viewInput}>
          <Image 
            style={styles.icon}
            source={{uri: "https://cdn-icons-png.flaticon.com/128/9512/9512572.png"}}/>
          <TextInput 
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={"#666"}
            secureTextEntry={true}
            />
        </View>

        <TouchableOpacity
          style={styles.btnCreate}
        >
          <Text style={styles.txtCreate}>CREATE</Text>
        </TouchableOpacity>



      <View style={styles.viewHaveAcc}>
        <Text style={styles.txtHaveAcc}>Already have an account</Text>
        <Text 
          style={styles.login}
          onPress={() => navigation.navigate('Login')}>Login now!</Text>
      </View>
      </View>   
    </View>
  );
};


const styles = StyleSheet.create({
  viewCha: {
    paddingTop: 100
  },
  container:{
    alignItems: "center"
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center"
  },
  // Thạch Minh Luân - 22520827
  viewInput: {
    borderWidth: 1,
    height: 40,
    width: '70%',
    margin: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10
  },
  icon: {
    height: 24,
    width:24,
  },
  input: {
    marginStart: 15,
    width: '85%'
  },
  btnCreate: {
    backgroundColor: "orange",
    width: '70%',
    height: 40,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 15
  },
  txtCreate: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white"
  },
  viewHaveAcc: {
    flexDirection: "row",
    alignItems: "center",
  },  
  txtHaveAcc: {
    fontSize: 20
  },
  // Thạch Minh Luân - 22520827
  login: {
    width: 'auto',
    marginStart: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  }
})

export default SignupScreen;
