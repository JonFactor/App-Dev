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
import GetUser from "../../../functions/GetUser";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import groupTypes from "../../../constants/groupTypes";
import SetCookies from "../../../functions/SetCookies";
import router from "../../../common/routerHook";

export const FilterContext = createContext(null);

const home = () => {
  const [userData, setUserData] = useState(null);
  const [currentFilter, setCurrentFilter] = useState([]);
  const { login, getUserInfo } = useContext(AuthContext);

  useEffect(() => {
    const setUser = async () => {
      const userData = await getUserInfo();

      setUserData(userData);
      console.log(userData);
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

  const handleNewEventClick = () => {
    router.replace("events");
  };

  return (
    <View className=" mt-12 mx-4 flex">
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
      <View className=" mt-16">
        <Events filters={currentFilter} noFilter={false} />
      </View>
      <TouchableOpacity
        className=" w-14 aspect-square rounded-full bg-md-purple absolute mt-[650px]"
        onPress={handleNewEventClick}
      >
        <Text className=" text-4xl font-semibold px-4 mt-2">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;
