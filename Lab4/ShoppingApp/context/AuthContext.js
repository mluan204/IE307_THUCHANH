import React, { useState, createContext, useContext } from 'react';
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState();


  const login = async (username, password) => {
    await axios.post('https://fakestoreapi.com/auth/login', {
      username: "johnd",
      password: "m38rmF$"
    })
      .then(res => {
        const tokendata = res.data.token;
        setToken(tokendata);
        console.log('Tokendata: '+ token);

        if(tokendata){
          const decodedData = jwtDecode(tokendata);
          setUserId(decodedData.sub);
          console.log('Decode: ', decodedData);
          setIsAuth(true);
        }
      })
      .catch(e => {
        console.log('get token error' + e);;
        Alert.alert('Login Failed', 'Incorect email or password. Please try again.');
      })
  }

  const logout = () => {
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{isLoading, token, userId, setUserId, isAuth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
