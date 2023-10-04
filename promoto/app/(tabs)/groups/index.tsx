import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const GroupsPage = () => {
  return (
    <View>
      <Link href="/groups/1">Catigory 1</Link>
      <Link href="/groups/2">Catigory 2</Link>
      <Link href="/groups/3">Catigory 3</Link>
    </View>
  );
};

export default GroupsPage;
