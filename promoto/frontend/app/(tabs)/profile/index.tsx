import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import router from "../../../common/routerHook";
import { Image } from "expo-image";
import GetUserProfile from "../../../functions/GetUserProfile";
import GetUser from "../../../functions/GetUser";
import Events from "../../../components/collections/Events";
import * as ImagePicker from "expo-image-picker";
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import UpdateUser from "../../../functions/UpdateUser";

const profile = () => {
  const { logout, getUserInfo, getUserProfilePhoto, setUserProfilePhoto } =
    useContext(AuthContext);

  const [userProfilePic, setUserProfilePic] = useState(null);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDesctiption] = useState("");
  const [navSelected, setNavSelected] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const content = await getUserInfo();
      // set user desc
      setUserDesctiption(content.description);
      setUserName(content.name);
      setUserId(content.id);

      const profilePic = await getUserProfilePhoto();
      setUserProfilePic(profilePic);
    };
    loadUser();
  }, []);

  const handleAddPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const userProfilePhoto = setUserProfilePhoto(result);
    const profilePic = await getUserProfilePhoto();
    setUserProfilePic(profilePic);
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return blob;
  };

  const handleMessageUser = () => {
    // goto message page with this user as recipiant
  };

  const handleFollowUser = () => {
    // add this user to following page
  };

  const handleLoadEvents = () => {
    setNavSelected(0);
  };

  const handleGroupsSelect = () => {
    setNavSelected(1);
  };

  const handleFollowingSelect = () => {
    setNavSelected(2);
  };

  const handleDisplayProfileActions = () => {};
  return (
    <View className=" mt-20">
      <View className=" flex-row ml-8 ">
        <TouchableOpacity className=" flex  " onPress={() => router.back()}>
          <View className=" flex w-5 h-7">
            <Image
              contentFit="cover"
              className=" flex-1"
              source={require("../../../assets/icons/backArrow.svg")}
            />
          </View>
        </TouchableOpacity>
        <View className=" flex">
          <TouchableOpacity
            onPress={handleAddPhotos}
            className={`flex w-40 rounded-full  aspect-square ml-16 ${
              userProfilePic === null && " bg-gray-400 items-center flex"
            }`}
          >
            {userProfilePic === null ? (
              <Text className=" text-6xl font-semibold  mt-12 ">JF</Text>
            ) : (
              <Image
                className=" flex-1 rounded-full "
                source={userProfilePic}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className=" ml-20"
          onPress={() => {
            handleDisplayProfileActions();
            logout();
          }}
        >
          <View className=" flex w-2 h-10">
            <Image
              source={require("../../../assets/icons/Menu.svg")}
              contentFit="fill"
              className=" flex-1 "
            />
          </View>
        </TouchableOpacity>
      </View>
      <View className=" w-full flex items-center mt-2">
        <Text className=" flex text-3xl font-bold ">{userName}</Text>
        <Text className=" text-md w-5/6 font-semibold text-gray-500 text-center">
          {userDescription}
        </Text>
      </View>
      <View className=" flex-col mt-4">
        <View className=" flex-row px-6 mt-4">
          <TouchableOpacity
            className=" rounded-full border-[3px] border-light-blue py-2 px-10"
            onPress={handleMessageUser}
          >
            <Text className=" text-xl font-semibold text-light-blue">
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" rounded-full bg-light-blue py-3 px-14 ml-3"
            onPress={handleFollowUser}
          >
            <Text className=" text-xl text-white font-semibold">Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className=" flex-row space-x-12 px-12 mt-8">
          <TouchableOpacity onPress={handleLoadEvents}>
            <Text
              className={`text-lg text-black ${
                navSelected !== 0 && "text-gray-500"
              } font-semibold`}
            >
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGroupsSelect}>
            <Text
              className={`text-lg text-black ${
                navSelected !== 1 && "text-gray-500"
              } font-semibold`}
            >
              Groups
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFollowingSelect}>
            <Text
              className={`text-lg text-black ${
                navSelected !== 2 && "text-gray-500"
              } font-semibold`}
            >
              Following
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" w-5/6 h-1 bg-md-purple rounded-lg ml-8 mt-1" />
        <View className=" mx-4">
          {navSelected === 0 ? (
            <Events filters={[]} />
          ) : navSelected === 1 ? (
            <Text>Groups</Text>
          ) : (
            <Text>Following</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default profile;
