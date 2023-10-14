import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const events = () => {
  return (
    <View>
      <Redirect href="/home" />
    </View>
  );
};

export default events;
