import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserGetDetails,
  UserUpdateProfile,
  UserLoginViaCookies,
  IUser,
} from "../functions/Auth";
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = async (
    userToken: string,
    sendToBackend: boolean
  ): Promise<boolean> => {
    setIsLoading(true);
    setUserToken(userToken);
    AsyncStorage.setItem("userToken", userToken);

    if (sendToBackend) {
      const cookieResponse = await UserLoginViaCookies(userToken);
      if (!cookieResponse) {
        setIsLoading(false);
        return false;
      }
    }
    setIsLoading(false);
    return true;
  };

  const logout = (sendToBackend: boolean): boolean => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    if (sendToBackend) {
      const response = UserLoginViaCookies("");
    }

    setIsLoading(false);
    return true;
  };

  const isLoggedIn = async (): Promise<boolean> => {
    setIsLoading(true);
    let userToken = await AsyncStorage.getItem("userToken");
    const isLoggedIn = await UserLoginViaCookies(userToken);

    if (isLoggedIn) {
      setUserToken(userToken);
    }

    setIsLoading(false);
    return isLoggedIn;
  };

  const fetchImageFromUri = async (uri): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return blob;
  };

  const getUserProfilePhoto = async (): Promise<string> => {
    setIsLoading(true);
    const userInfo = await getUserInfo();
    if (userInfo === null) {
      setIsLoading(false);
      return null;
    }
    const userPhotoUri = userInfo.profilePic;

    const photo = await Storage.get(userPhotoUri);

    setIsLoading(false);
    return photo;
  };

  const setUserProfilePhoto = async (
    image: String,
    userId: number = null
  ): Promise<boolean> => {
    setIsLoading(true);
    const imageKey = uuidv4();
    const img = await fetchImageFromUri(image);

    const imageStoreageResult = await Storage.put(imageKey, img, {
      level: "public",
      contentType: img.type,
    });

    if (userId === null) {
      const userInfo = await getUserInfo();
      if (userInfo === null) {
        setIsLoading(false);
        return false;
      }
      userId = userInfo.id;
    }

    const responseSuccess = await UserUpdateProfile(imageKey, userId);
    setIsLoading(false);
    return responseSuccess;
  };

  const getUserInfo = async (): Promise<IUser> => {
    setIsLoading(true);
    const response = await UserGetDetails();
    setIsLoading(false);
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
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
