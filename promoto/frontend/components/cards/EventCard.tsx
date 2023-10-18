import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Storage } from "aws-amplify";

const EventCard = ({
  location,
  month,
  day,
  title,
  imagePath,
  eventType,
  id,
}) => {
  const monthsToStrings = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const [image, setImage] = useState(null);

  useEffect(() => {
    const getBackround = async () => {
      let signedUrl = await Storage.get(imagePath);
      // imageKey = await Promise.all(
      //   imageKey.map(async (k) => {
      //     if (k.key === imagePath) {
      //       const signedUrl = await Storage.get(k.key);
      //       return signedUrl;
      //     }
      //   })
      // );
      setImage(signedUrl);
    };
    getBackround();
  }, []);

  if (eventType === null) {
    eventType = "misc";
  }
  const [cardOpacity, setCardOpacity] = useState(100);
  const router = useRouter();
  const handleNavToEvent = () => {
    router.push(`events/${id}`);
  };

  const handleDislikeEvent = () => {
    // post pref event type -.01 + remove from feed
  };

  const handleOpenInMaps = () => {
    // open in google maps
  };

  const handleScrollDirectionLeft = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.x;
    const dif = currentOffset - 0;

    if (dif < 0) {
      return true;
    } else {
      return false;
    }
  };

  let monthIndex;
  if (month[0] === "0") {
    monthIndex = month[1] - 1;
  } else {
    monthIndex = month - 1;
  }

  return (
    <ScrollView
      horizontal
      className=" h-{22rem} flex"
      onScrollEndDrag={(event) => {
        const scrollLeft = handleScrollDirectionLeft(event);

        if (scrollLeft) {
          handleDislikeEvent();
        } else {
          handleNavToEvent();
        }
      }}
      scrollEventThrottle={16}
    >
      <Image source={image} contentFit="cover" className="rounded-3xl flex-1">
        <LinearGradient
          className=" p-4 w-fit h-96 flex-col"
          colors={["rgba(0,0,0,.15)", "transparent"]}
        >
          <View className=" flex-row">
            <View className=" flex-col items-center bg-red-400 w-16 aspect-square rounded-full">
              <Text className=" text-3xl text-white mt-2  absolute">{day}</Text>
              <Text className=" text-white mt-10 ">
                {monthsToStrings[monthIndex]}
              </Text>
            </View>
            <Text className=" ml-2 text-2xl text-white font-semibold w-44">
              {title}
            </Text>
            <View className=" w-16 aspect-square bg-black rounded-full ml-4 items-center py-4">
              <Text
                className={` text-white text-${
                  eventType.length < 6 ? "lg" : "2xl"
                } font-semibold`}
              >
                {eventType.length < 6 ? eventType : eventType[0].toUpperCase()}
              </Text>
            </View>
          </View>
          <View className=" mt-56 flex-row">
            <TouchableOpacity
              onLongPress={handleOpenInMaps}
              className=" flex-row ml-2 bg-white w-44 mt-6 rounded-full px-2 h-8"
            >
              <View className=" flex w-3 h-4 mt-2 ml-1 ">
                <Image
                  contentFit="cover"
                  className=" flex-1"
                  source={require("../../assets/icons/Location.svg")}
                />
              </View>
              <Text className="text-black ml-2 mt-2 text-md">{location}</Text>
            </TouchableOpacity>
            <View className=" flex-row">
              <TouchableOpacity
                onPress={handleDislikeEvent}
                className=" ml-6 mt-4 w-12 aspect-square bg-red-200 rounded-full p-2 border-solid border-white border-2"
              >
                <Image
                  className="flex-1 rounded-full"
                  source={require("../../assets/icons/Cross.svg")}
                  contentFit="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNavToEvent}
                className="ml-3 w-16 aspect-square bg-green-200 rounded-full p-3 border-solid border-white border-2"
              >
                <Image
                  source={require("../../assets/icons/Heart.svg")}
                  contentFit="cover"
                  className="flex-1"
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Image>
    </ScrollView>
  );
};

export default EventCard;
