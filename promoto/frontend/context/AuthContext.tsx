import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetUser from "../functions/GetUser";
import SetCookies from "../functions/SetCookies";
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import UpdateUser from "../functions/UpdateUser";

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

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return blob;
  };

  const getUserProfilePhoto = async () => {
    const userInfo = await getUserInfo();
    const userPhotoUri = userInfo.profilePic;

    const photo = await Storage.get(userPhotoUri);

    return photo;
  };

  const setUserProfilePhoto = async (image: String, userId: String = null) => {
    const imageKey = uuidv4();
    const img = await fetchImageFromUri(image);

    const imageStoreageResult = await Storage.put(imageKey, img, {
      level: "public",
      contentType: img.type,
    });

    if (userId === null) {
      userId = (await getUserInfo()).id;
    }
    const response = await UpdateUser(imageKey, userId);
  };

  const getUserInfo = async () => {
    const cookie = await AsyncStorage.getItem("userToken");
    const cookieResponse = await SetCookies(cookie);

    const response = await GetUser();
    if (response === null) {
      return;
    }

    return response;
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        getUserInfo,
        getUserProfilePhoto,
        setUserProfilePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
