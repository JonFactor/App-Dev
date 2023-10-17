import { Redirect, Stack } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "../app.d.ts";
import { AuthContext } from "../context/AuthContext.tsx";

const StartPage = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View className=" flex-1 justify-items-center align-middle">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  console.log(userToken);

  return (
    <View>
      {userToken === null ? (
        <Redirect href={"/login"} />
      ) : (
        <Redirect href={"/home"} />
      )}
    </View>
  );
};

export default StartPage;
