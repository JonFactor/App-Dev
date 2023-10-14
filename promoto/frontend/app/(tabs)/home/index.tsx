import { View, Text, TouchableOpacity } from "react-native";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { Link, useRouter } from "expo-router";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import Events from "../../../components/collections/Events";

export const FilterContext = createContext(null);

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
      setCurrentFilter((currentFilter) => [
        ...currentFilter,
        filterTypes[index],
      ]);
    } else {
      let i = filterTypes.indexOf(filterTypes[index]);
      setCurrentFilter(currentFilter.filter((value) => value === i));
    }
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
        className=" flex-row mx-2 space-x-4 mt-24 absolute"
      >
        <TouchableOpacity
          className={` w-10 aspect-square rounded-full items-center ${
            currentFilter.length < 1
              ? "bg-md-purple"
              : "border-2 border-solid border-black"
          }`}
          onPress={() => setCurrentFilter([])}
        >
          <Text className=" text-lg p-1 font-semibold"> All </Text>
        </TouchableOpacity>
        {filterTypes.map((value: string, index: number, array: string[]) => (
          <TouchableOpacity
            className={` px-3 rounded-full
              items-center ${
                currentFilter.includes(filterTypes[index])
                  ? "bg-md-blue"
                  : "border-gray-500 border-solid border-2"
              }`}
            key={index}
            onPress={() => {
              handleFilterBtnPress(index);
            }}
          >
            <Text className=" mt-1 text-lg">{value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className=" mt-16">
        <Events filters={currentFilter} />
      </View>
    </View>
  );
};

export default home;
