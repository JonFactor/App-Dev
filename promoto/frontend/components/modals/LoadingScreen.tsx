import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <View className=" h-screen w-screen">
      <ActivityIndicator size={"large"} className=" mt-60"></ActivityIndicator>
      <Text className=" text-2xl text-md-blue">Communovo</Text>
    </View>
  );
};

export default LoadingScreen;
