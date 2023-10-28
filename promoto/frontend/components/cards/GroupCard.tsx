import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Storage } from "aws-amplify";

const GroupCard = ({ item, routingIgnore }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const setImg = async () => {
      if (item.image.includes("https://")) {
        setImage(item.image);
        return;
      }

      const img = await Storage.get(item.image);
      setImage(img);
    };
    setImg();
  }, []);

  const handleGroupSelect = () => {
    if (routingIgnore !== "True") {
      router.push(`groups/${item.title}`);
    }
  };

  return (
    <TouchableOpacity
      className=" w-52 h-36 rounded-xl flex ml-4"
      onPress={handleGroupSelect}
    >
      <View className=" flex w-full h-full">
        <Image
          className=" flex-1 rounded-2xl items-center"
          contentFit="cover"
          source={image}
        >
          <View className=" bg-white p-1 rounded-md mt-4">
            <Text className=" text-md-blue outline-2 outline-black text-lg font-semibold">
              {item.title}
            </Text>
          </View>
        </Image>
      </View>
    </TouchableOpacity>
  );
};

export default GroupCard;
