import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const profile = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity
        onPress={() => {
          logout();
          router.replace("/login");
        }}
      >
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
