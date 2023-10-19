import { View, Text } from "react-native";
import React from "react";

const UpdateUser = async (profilePicUrl: String, id: String) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/setProfile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, profilePicUrl }),
  });
};

export default UpdateUser;
