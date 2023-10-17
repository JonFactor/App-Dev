import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetUser from "../functions/GetUser";
import SetCookies from "../functions/SetCookies";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = (userToken: string) => {
    setIsLoading(true);
    setUserToken(userToken);
    AsyncStorage.setItem("userToken", userToken);
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
    } catch (ex) {
      console.log(ex);
    }
    setIsLoading(false);
  };

  const getUserInfo = async () => {
    const cookie = await AsyncStorage.getItem("userToken");
    const responseSetUser = await SetCookies(
      cookie.split(";")[0].split("=")[1]
    );

    console.log(responseSetUser.status);

    const response = await GetUser();
    if (response.status !== 200) {
      // console.log(response.status);
      return;
    }
    const content = await response.json();
    return content.name;
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
