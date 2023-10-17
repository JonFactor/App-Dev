import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import register from "../register";

const events = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDesctiption] = useState("");
  const [eventImgs, setEventImgs] = useState([]);
  const [eventGroup, setEventGroup] = useState([]);
  const [eventLocation, setEventLocation] = useState("");
  const [eventGuests, setEventGuests] = useState([]);

  const router = useRouter();

  const validateEventEntries = () => {
    return true;
  };

  const handleEventSubmit = () => {
    if (!validateEventEntries()) {
      return false;
    }
  };

  const handleEventBack = () => {
    router.back();
  };

  return (
    <View className=" pt-20 px-6 bg-gray-200 h-full flex space-y-4">
      <TextInput
        className=" h-20 w-full bg-white rounded-xl text-3xl text-center"
        placeholder=" Title your event"
        onChangeText={(text) => {
          setEventTitle(text);
        }}
      ></TextInput>
      <TextInput
        className=" h-40 w-full bg-white rounded-xl text-lg text-center py-4"
        placeholder="Give your event a description"
        textAlignVertical="top"
        multiline={true}
        onChangeText={(text) => {
          setEventDesctiption(text);
        }}
      ></TextInput>
      <TouchableOpacity className=" bg-white rounded-xl h-24 w-full">
        <View className=" py-4 px-4 flex-row">
          <View className=" flex rounded-full bg-gray-200 h-16 ml-2 aspect-square">
            <View className=" flex w-10 h-8 ml-3 mt-3">
              <Image
                className=" flex-1 p-2"
                source={require("../../../assets/icons/camera.svg")}
                contentFit="fill"
              />
            </View>
          </View>
          <Text className=" flex text-3xl text-gray-300 ml-10 mt-3 ">
            Add Photos
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity className=" bg-white rounded-xl h-20 w-full">
        <View className=" py-2 px-4 flex-row">
          <View className=" flex rounded-full bg-gray-200 h-16 ml-2 aspect-square">
            <View className=" flex w-10 h-10 ml-3 mt-3">
              <Image
                className=" flex-1 p-2"
                source={require("../../../assets/icons/multiselect.svg")}
                contentFit="fill"
              />
            </View>
          </View>
          <Text className=" flex text-3xl text-gray-300 ml-6 mt-3 ">
            Select Groups
          </Text>
        </View>
      </TouchableOpacity>
      <View className=" bg-white rounded-xl h-20 w-full py-2 flex-row">
        <View className=" flex rounded-full bg-gray-200 h-16 ml-6 aspect-square">
          <View className=" flex w-8 h-10 ml-4 mt-3">
            <Image
              className=" flex-1 p-2"
              source={require("../../../assets/icons/black-location.svg")}
              contentFit="fill"
            />
          </View>
        </View>
        <TextInput
          className="  text-3xl px-6"
          placeholder="Set Location"
        ></TextInput>
      </View>
      <TouchableOpacity className=" bg-white rounded-xl h-20 w-full">
        <View className=" py-2 px-4 flex-row">
          <View className=" flex rounded-full bg-gray-200 h-16 ml-2 aspect-square">
            <View className=" flex w-6 h-12 ml-5 mt-3">
              <Image
                className=" flex-1 p-2"
                source={require("../../../assets/icons/profile.svg")}
                contentFit="fill"
              />
            </View>
          </View>
          <Text className=" flex text-3xl text-gray-300 ml-6 mt-3 ">
            Guests
          </Text>
        </View>
      </TouchableOpacity>
      <View className=" flex-row ml-2">
        <TouchableOpacity
          className=" rounded-full bg-red-300 w-20 aspect-square"
          onPress={handleEventBack}
        >
          <View className=" w-10 aspect-square flex ml-5 mt-4">
            <Image
              className=" flex-1"
              source={require("../../../assets/icons/white-cross.svg")}
              contentFit="fill"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className=" rounded-full bg-green-300 w-20 aspect-square ml-44"
          onPress={handleEventSubmit}
        >
          <View className=" w-10 aspect-square flex ml-5 mt-4">
            <Image
              className=" flex-1"
              source={require("../../../assets/icons/white-check.svg")}
              contentFit="fill"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default events;
