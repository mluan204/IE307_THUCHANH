import React, { useState, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState();
  // Thạch Minh Luân - 22520827
  const login = async (username, password) => {
    setIsLoading(true);
    await axios
      .post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
        // username: "johnd",
        // password: "m38rmF$"
      })
      .then((res) => {
        const tokendata = res.data.token;
        setToken(tokendata);
        console.log("Tokendata: " + token);
        if (tokendata) {
          const decodedData = jwtDecode(tokendata);
          setUserId(decodedData.sub);
          console.log("Decode: ", decodedData);
          setIsLoading(false);
          setIsAuth(true);
        }
      }) // Thạch Minh Luân - 22520827
      .catch((e) => {
        console.log("get token error" + e);
        Alert.alert(
          "Login Failed",
          "Incorect email or password. Please try again."
        );
      });
  };
  // Thạch Minh Luân - 22520827
  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, token, userId, setUserId, isAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
