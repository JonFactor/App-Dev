import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { AuthContext } from "../../context/AuthContext";
import { UserViaId } from "../../functions/Auth";
import { Storage } from "aws-amplify";

const ProfilePictureCard = ({ width, userid = null }) => {
  const { getUserProfilePhoto, isLoading } = useContext(AuthContext);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    const profilePicSelf = async () => {
      const Profile = await getUserProfilePhoto();
      setUserProfilePic(Profile);
    };

    const profilePicOther = async () => {
      const Profile = await UserViaId(userid);
      if (Profile === null) {
        return;
      }

      const userPhotoUri = Profile.profilePic;

      const photo: string = await Storage.get(userPhotoUri);
      setUserProfilePic(photo);
    };
    if (userid === null) profilePicSelf();
    if (userid !== null) profilePicOther();
  }, []);
  return (
    <View className={` flex w-${width} aspect-square`}>
      {userProfilePic !== null || !isLoading ? (
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
