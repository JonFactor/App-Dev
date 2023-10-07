import { Redirect } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import "../app.d.ts";

const StartPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  if (isLoggedIn === 1) {
    return <Redirect href={"/home"} />;
  } else {
    return <Redirect href={"/login"} />;
  }
};

export default StartPage;
