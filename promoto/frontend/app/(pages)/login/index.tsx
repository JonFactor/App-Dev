import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements";
import LoginForm from "../../components/forms/LoginForm";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Redirect } from "expo-router";

const LoginPage = () => {
  return (
    <View>
      <LoginForm displayBackBtn={1}></LoginForm>
    </View>
  );
};

export default LoginPage;
