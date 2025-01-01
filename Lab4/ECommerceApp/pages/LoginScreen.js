import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(""); //johnd
  const [password, setPassword] = useState(""); //m38rmF$
  const { login } = useContext(AuthContext);
  // Thạch Minh Luân - 22520827
  const handleLogin = () => {
    login(username, password);
  };

  return (
    <View style={styles.viewCha}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.scorchsoft.com/public/capabilities/head/react-native-logo-square.webp",
          }}
        />
        <Text style={styles.title}>Welcome</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/1077/1077063.png",
            }}
          />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={"#666"}
          />
        </View>
        {/* Thạch Minh Luân - 22520827 */}
        <View style={styles.viewInput}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/9512/9512572.png",
            }}
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={"#666"}
            secureTextEntry={true}
          />
        </View>
        <Text style={styles.forgotpw}>Forgot password?</Text>
        {/*  Thạch Minh Luân - 22520827 */}
        <TouchableOpacity style={styles.btnLogin} onPress={() => handleLogin()}>
          <Text style={styles.txtLogin}>LOG IN</Text>
        </TouchableOpacity>

        {/* dang nhap bang pthuc khac */}
        <Text style={styles.loginwith}>Or login with</Text>

        <View style={styles.viewLoginWith}>
          <Image
            style={styles.iconLoginWith}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
            }}
          />
          <Image
            style={styles.iconLoginWith}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/281/281764.png",
            }}
          />
        </View>

        <View style={styles.viewNoAcc}>
          <Text style={styles.txtNoAcc}>Don't have account?</Text>
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up here!
          </Text>
        </View>
      </View>
    </View>
  );
};
{
  /*  Thạch Minh Luân - 22520827 */
}
const styles = StyleSheet.create({
  viewCha: {
    paddingTop: 100,
  },
  container: {
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
  },
  viewInput: {
    borderWidth: 1,
    height: 40,
    width: "70%",
    margin: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    height: 24,
    width: 24,
  },
  input: {
    marginStart: 15,
    height: "100%",
    width: "85%",
  },
  forgotpw: {
    width: "auto",
    alignSelf: "flex-end",
    marginEnd: 70,
    marginBottom: 15,
    color: "red",
  },
  btnLogin: {
    backgroundColor: "orange",
    width: "70%",
    height: 40,
    borderRadius: 5,
    alignSelf: "center",
  },
  // Thạch Minh Luân - 22520827
  txtLogin: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  loginwith: {
    alignSelf: "center",
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  iconLoginWith: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  viewLoginWith: {
    width: "auto",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  viewNoAcc: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtNoAcc: {
    fontSize: 15,
  },
  signup: {
    width: "auto",
    marginStart: 5,
    fontSize: 17,
    fontWeight: "bold",
    color: "blue",
  },
});

export default LoginScreen;
