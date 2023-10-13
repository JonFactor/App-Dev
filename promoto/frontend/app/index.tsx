import { Redirect } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "../app.d.ts";
import { AuthContext } from "../context/AuthContext.tsx";

const StartPage = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    <View className=" flex-1 justify-items-center align-middle">
      <ActivityIndicator size={"large"} />
    </View>;
  }

  return userToken === null ? (
    <Redirect href={"/login"} />
  ) : (
    <Redirect href={"/home"} />
  );
};

export default StartPage;
