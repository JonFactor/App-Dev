import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useRouter } from "expo-router";
import { Image } from "expo-image";
import { LinearTextGradient } from "react-native-text-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const home = () => {
  const [userName, setUserName] = useState("Jon");
  const [currentFilter, setCurrentFilter] = useState([]);
  const filterTypes = [
    "Sports",
    "Gaming",
    "Party",
    "Bar",
    "Music",
    "Theater",
    "Hobby",
  ];

  const router = useRouter();

  const handleFilterBtnPress = (index: number) => {
    if (!currentFilter.includes(filterTypes[index])) {
      currentFilter.push(filterTypes[index]);
    } else {
      let i = filterTypes.indexOf(filterTypes[index]);
      currentFilter.splice(i, 1);
    }
    console.log(currentFilter);
  };
  return (
    <View className=" mt-12 mx-4 flex">
      <View className=" flex-row mx-4 ">
        <View className="mt-6">
          <Text className=" text-xl">Hi {userName},</Text>
          <View className=" flex-row space-x-2">
            <Text className="text-3xl font-bold text-md-purple">Welcome</Text>
            <Text className="text-3xl font-semibold">Back</Text>
          </View>
        </View>
        <View className="flex w-20 aspect-square ml-12 mt-2 ">
          <Image
            className="flex-1 rounded-full"
            source={require("../../../assets/placeholders/jon-vroman.png")}
            contentFit="cover"
          />
        </View>
      </View>
      <ScrollView
        horizontal
        indicatorStyle="white"
        className=" flex-row mt-6 mx-2 space-x-4"
      >
        <TouchableOpacity
          className=" w-12 aspect-square rounded-full bg-md-purple p-2"
          onPress={() => setCurrentFilter([])}
        >
          <Text className=" text-xl font-semibold"> All </Text>
        </TouchableOpacity>
        {filterTypes.map((value: string, index: number, array: string[]) => (
          <TouchableOpacity
            className={` px-4 border-gray-500 border-solid border-2 rounded-full
              items-center ${
                currentFilter.includes(filterTypes[index]) && "bg-md-blue"
              }`}
            key={index}
            onPress={() => {
              handleFilterBtnPress(index);
            }}
          >
            <Text className=" mt-2 text-lg">{value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          router.replace("/login");
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;
