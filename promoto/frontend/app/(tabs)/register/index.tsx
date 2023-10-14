import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const register = () => {
  const router = useRouter();
  return (
    <View className=" p-11">
      <Text>register</Text>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Text>back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default register;
