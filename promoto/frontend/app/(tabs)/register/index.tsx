import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Register from "../../../functions/Register";

const register = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [usrNameErr, setUsrNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const validateUserEntry = () => {
    let hasErrors = false;

    const minNameLength = 3;
    const minUserNameLength = 6;

    if (fullName.length <= minNameLength) {
      setNameErr(`Name must be longer than ${minNameLength} chars`);
      hasErrors = true;
    } else if (!fullName.includes(" ")) {
      setNameErr("Name formated: First Last");
      hasErrors = true;
    } else {
      setNameErr("");
    }

    if (userName.length <= minUserNameLength) {
      setUsrNameErr(`User name must be longer than ${minUserNameLength} chars`);
      hasErrors = true;
    } else if (userName.includes(" ")) {
      setUsrNameErr("No spaces are allowed in userName");
      hasErrors = true;
    } else {
      setUsrNameErr("");
    }

    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );

    if (!validEmail.test(email)) {
      setEmailErr("Invalid Email");
      hasErrors = true;
    } else if (email.includes(" ")) {
      setEmailErr("Spaces not allowed in email");
      hasErrors = true;
    } else {
      setEmailErr("");
    }

    const validPassword = new RegExp(
      "^(?=.*?[A-Za-z!@#$%^&*])(?=.*?[0-9]).{6,}$"
    );

    if (!validPassword.test(passErr)) {
      setPassErr(
        "Password must be longer than 7 chars, and be included in the following: A-Z, a-z,!@#$%^&*, 0-9"
      );
      hasErrors = true;
    } else if (password.includes(" ")) {
      setPassErr("Spaces are not allowed in password");
      hasErrors = true;
    } else {
      setPassErr("");
    }

    if (hasErrors) {
      return false;
    }
    return true;
  };

  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

  const submitForm = async () => {
    if (!validateUserEntry()) {
      return;
    }
    const name = userName;

    const response = await Register({ name, email, password });

    if (response.status !== 200) {
      return;
    }

    router.replace("/login");
  };
  return (
    <View className=" p-10">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Text>back</Text>
      </TouchableOpacity>
      <View>
        <View>
          <Text className=" text-red-400">{nameErr}</Text>
          <Text>Full Name:</Text>
          <TextInput
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
            }}
            placeholder={"John Doe"}
          />
        </View>
        <View>
          <Text className=" text-red-400">{usrNameErr}</Text>
          <Text>User Name:</Text>
          <TextInput
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
            placeholder={"JohnDoe123"}
          />
        </View>
        <View>
          <Text className=" text-red-400">{emailErr}</Text>
          <Text>Email:</Text>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder={"John@Doe.com"}
          />
        </View>
        <View>
          <Text className=" text-red-400">{passErr}</Text>
          <Text>Password:</Text>
          <TextInput
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder={"12345678"}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={submitForm}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default register;
