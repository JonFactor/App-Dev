import { View, Text, TouchableOpacity } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import Events from "../../../components/collections/Events";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import groupTypes from "../../../constants/groupTypes";
import router from "../../../common/routerHook";
import ProfilePictureCard from "../../../components/cards/ProfilePictureCard";

export const FilterContext = createContext(null);

const home = () => {
  const randomInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const PostMessages = [
    "Spread the Word! 🤐",
    "Share your next Event! 😶‍🌫️",
    "Let the people know! 📢",
    "Just Click it 🤓",
    "You wont regret it! 🤔",
  ];

  const randomizedPostMessage = PostMessages[randomInRange(0, 4)];

  const [userData, setUserData] = useState(null);
  const [currentFilter, setCurrentFilter] = useState([]);
  const { login, getUserInfo } = useContext(AuthContext);

  useEffect(() => {
    const setUser = async () => {
      const userData = await getUserInfo();

      setUserData(userData);
    };
    setUser();
  }, []);

  const handleFilterBtnPress = (index: number) => {
    if (!currentFilter.includes(groupTypes[index])) {
      setCurrentFilter((currentFilter) => [
        ...currentFilter,
        groupTypes[index],
      ]);
    } else {
      let i = groupTypes.indexOf(groupTypes[index]);
      setCurrentFilter(currentFilter.filter((value) => value === i));
    }
  };

  return (
    <View className="w-screen flex">
      <ScrollView
        className=" mt-12 mx-4 flex"
        showsVerticalScrollIndicator={false}
      >
        <View className=" flex-row mx-4 ">
          <View className="mt-6">
            <Text className=" text-xl">
              Hi{" "}
              {userData !== undefined && userData !== null
                ? userData.name
                : "ERROR"}
              ,
            </Text>
            <View className=" flex-row space-x-2">
              <Text className="text-3xl font-bold text-md-purple">Welcome</Text>
              <Text className="text-3xl font-semibold">Back</Text>
            </View>
          </View>
          <View className="flex w-20 aspect-square ml-16 mt-2 ">
            <ProfilePictureCard width={"20"} />
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
          {groupTypes.map((value: string, index: number, array: string[]) => (
            <TouchableOpacity
              className={` px-3 rounded-full
              items-center ${
                currentFilter.includes(groupTypes[index])
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
        <View className=" mt-16 ml-4 flex-row">
          <TouchableOpacity
            className=" w-14 aspect-square rounded-full bg-md-purple flex"
            onPress={() => {
              router.push("/events");
            }}
          >
            <Text className=" text-4xl font-semibold px-4 mt-2">+</Text>
          </TouchableOpacity>
          <Text className=" text-2xl mt-2 ml-4">{randomizedPostMessage}</Text>
        </View>
        <View className=" w-full">
          <Events filters={currentFilter} noFilter={false} />
        </View>
      </ScrollView>
    </View>
  );
};

export default home;
