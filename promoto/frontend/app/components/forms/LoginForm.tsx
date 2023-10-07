import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";

const LoginForm = () => {
  const [displayPassword, setDisplayPassword] = useState(true);

  const handleDisplayPassword = () => {
    if (displayPassword) {
      setDisplayPassword(false);
    } else {
      setDisplayPassword(true);
    }
  };

  const handleLoginSubmit = () => {};

  return (
    <View className={"bg-slate-200 p-4"}>
      <View>
        <Text className={"text-2xl"}>Username</Text>
        <TextInput
          className=" bg-white my-2 h-10 rounded-xl px-4"
          autoComplete="username"
          textContentType="username"
        ></TextInput>
      </View>
      <View className=" mt-6">
        <Text className={"text-2xl"}>Password</Text>
        <View className="flex flex-row my-2 h-10 ">
          <TextInput
            className=" bg-white rounded-xl w-72 px-4"
            autoComplete="password"
            textContentType="password"
            secureTextEntry={displayPassword}
          ></TextInput>
          <TouchableOpacity
            className=" bg-gray-300 w-16 mx-2 rounded-md p-3"
            onPress={handleDisplayPassword}
          >
            <Text>Show</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className=" h-12 bg-gray-600 rounded-lg mt-10 p-3 items-center"
        onPress={handleLoginSubmit}
      >
        <Text className="text-white font-semibold text-lg">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
