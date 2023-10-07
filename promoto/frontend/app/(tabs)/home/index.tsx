import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const home = () => {
  return (
    <View>
      <Text>home</Text>
      <Link href="/login">
        <Text>Login</Text>
      </Link>
    </View>
  );
};

export default home;
