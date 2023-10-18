import { Redirect, Stack } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "../app.d.ts";
import { AuthContext } from "../context/AuthContext.tsx";

import Amplify from "aws-amplify";
import config from "../src/aws-exports";
Amplify.configure(config);

const StartPage = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View className=" flex-1 justify-items-center align-middle">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

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
