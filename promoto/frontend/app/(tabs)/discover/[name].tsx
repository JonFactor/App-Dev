import { View, Text } from "react-native";
import React from "react";
import { Stack, useSearchParams } from "expo-router";

const CatigoryDetailsPage = () => {
  const { name } = useSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Group #${name}` }} />
      <Text>New List of Groups for: {name}</Text>
    </View>
  );
};

export default CatigoryDetailsPage;
