import { Redirect, Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "../app.d.ts";
import { AuthContext } from "../context/AuthContext";

import { Amplify } from "aws-amplify";
import awsmobile from "../src/aws-exports";
Amplify.configure(awsmobile);

const StartPage = () => {
  const { isLoading, userToken, getUserInfo } = useContext(AuthContext);
  const [isNotExpired, setIsNotExpired] = useState(true);

  let cookieNotExpired;
  useEffect(() => {
    const cookieIsNotExpired = async () => {
      const result = await getUserInfo();
      setIsNotExpired(result);
    };
    cookieIsNotExpired();
  }, []);

  return (
    <View>
      {isLoading ? (
        <View className=" flex-1 justify-items-center align-middle w-screen h-screen">
          <ActivityIndicator size={"large"} className=" mt-72  " />
        </View>
      ) : (
        <View>
          {!isNotExpired ? (
            <Redirect href={"/login"} />
          ) : (
            <Redirect href={"/home"} />
          )}
        </View>
      )}
    </View>
  );
};

export default StartPage;
