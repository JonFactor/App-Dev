import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import GroupTypes from "../../../constants/GroupTypes";
import { TextInput } from "react-native-gesture-handler";
import { Image } from "expo-image";

const GroupsPage = () => {
  return (
    <ScrollView className=" flex space-y-8 mt-16">
      <View className=" w-full items-center flex ">
        <View className=" flex w-80 h-16 rounded-full border-4 border-md-blue flex-row ">
          <TextInput
            className=" p-4 text-2xl w-64"
            placeholder="Search"
          ></TextInput>
          <View className=" w-9 h-10 flex mt-2 ">
            <Image
              className=" flex-1"
              source={require("../../../assets/icons/Search.svg")}
              contentFit="cover"
            />
          </View>
        </View>
      </View>
      {GroupTypes.map((item, index) => {
        return (
          <View className=" mt-4" key={index}>
            <Text className=" ml-12 text-2xl text-gray-500 ">{item}</Text>
            <View>
              <ScrollView className=" h-24 p-2" horizontal>
                {}
              </ScrollView>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default GroupsPage;
