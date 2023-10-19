import { View, Text } from "react-native";
import React from "react";
import { Stack, useSearchParams, useGlobalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import router from "../../../common/routerHook";

const eventDetailsPage = () => {
  const { id } = useGlobalSearchParams();

  const eventDetails = async () => {
    // find event in db via id
  };

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="p-12">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>{id}</Text>
      </View>
    </View>
  );
};

export default eventDetailsPage;
