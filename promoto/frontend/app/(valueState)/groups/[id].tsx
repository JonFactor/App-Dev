import { View, Text } from "react-native";
import React from "react";
import { Stack, useSearchParams } from "expo-router";

const CatigoryDetailsPage = () => {
  const { id } = useSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Group #${id}` }} />
      <Text>New List of Groups for: {id}</Text>
    </View>
  );
};

export default CatigoryDetailsPage;
