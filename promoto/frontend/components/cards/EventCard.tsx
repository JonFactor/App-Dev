import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const EventCard = ({ location, month, day, title, url, imagePath }) => {
  const router = useRouter();
  return (
    <TouchableHighlight
      onPress={() => router.replace(`events/${url}`)}
      className=" h-96 rounded-xl flex"
    >
      <Image
        source={imagePath}
        contentFit="cover"
        className="rounded-xl flex-1"
      >
        <View className=" p-12">
          <View>
            <View className=" flex-row items-center">
              <Text className=" text-xl">{day}</Text>
              <Text>{month}</Text>
            </View>
            <Text> {title} </Text>
          </View>
          <View>
            <View className=" flex-row">
              <Image />
              <Text>{location}</Text>
            </View>
          </View>
        </View>
      </Image>
    </TouchableHighlight>
  );
};

export default EventCard;
