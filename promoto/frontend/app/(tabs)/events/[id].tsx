import { View, Text } from "react-native";
import React from "react";
import {
  Stack,
  useSearchParams,
  router,
  useGlobalSearchParams,
  useRouter,
} from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const eventDetailsPage = () => {
  const { id } = useGlobalSearchParams();

  const router = useRouter();

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
