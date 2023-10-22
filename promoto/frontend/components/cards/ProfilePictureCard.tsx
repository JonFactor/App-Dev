import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { AuthContext } from "../../context/AuthContext";

const ProfilePictureCard = ({ width }) => {
  const { getUserProfilePhoto, isLoading } = useContext(AuthContext);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    const profilePic = async () => {
      const Profile = await getUserProfilePhoto();
      setUserProfilePic(Profile);
    };
    profilePic();
  }, []);
  return (
    <View className={` flex w-${width} aspect-square`}>
      {userProfilePic !== null || isLoading ? (
        <Image
          className=" flex-1 rounded-full"
          source={userProfilePic}
          contentFit="cover"
        />
      ) : (
        <View className=" rounded-full flex-1 bg-gray-400" />
      )}
    </View>
  );
};

export default ProfilePictureCard;
