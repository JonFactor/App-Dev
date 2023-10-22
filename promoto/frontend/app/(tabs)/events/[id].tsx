import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useSearchParams, useGlobalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import router from "../../../common/routerHook";
import { EventsGetDetails, IEvent } from "../../../functions/Events";

const eventDetailsPage = () => {
  const { id } = useGlobalSearchParams();
  const [eventData, setEventData] = useState<IEvent>(null);

  useEffect(() => {
    const eventDetails = async () => {
      const content: IEvent = await EventsGetDetails(id[0]);

      if (content === null) {
        return;
      }
      setEventData(content);
    };
    eventDetails();
  }, []);

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
        {eventData === null ? (
          <View>
            <Text>Waiting</Text>
          </View>
        ) : (
          <View>
            <Text>Data</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default eventDetailsPage;
