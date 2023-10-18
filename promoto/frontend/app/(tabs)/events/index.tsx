import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import register from "../register";
import groupTypes from "../../../constants/groupTypes";
import * as ImagePicker from "expo-image-picker";
import CreateEvent from "../../../functions/CreateEvent";
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

const events = () => {
  const [warning, setWarning] = useState("");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDesctiption] = useState("");
  const [eventImgs, setEventImgs] = useState(
    "../../../assets/placeholders/NextEventCover.png"
  );
  const [eventGroup, setEventGroup] = useState([]);
  const [eventLocation, setEventLocation] = useState("");
  const [eventGuests, setEventGuests] = useState([]);
  const [eventDate, setEventDate] = useState("");

  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalType, setModalType] = useState("");

  const guestsTemp = [
    " Jon Fac",
    "becky Neck",
    "trecky Fec",
    "woah Shoe",
    "foe Doe",
  ];

  const router = useRouter();

  const validateEventEntries = () => {
    if (eventTitle === "") {
      setWarning("Title is required");
      return false;
    } else if (eventDescription === "") {
      setWarning("Description is required");
      return false;
    } else if (eventImgs === null) {
      // setWarning("Background required");
      // return false;
    } else if (eventGroup === null) {
      setEventGroup(["misc"]);
    } else if (eventLocation === null) {
      setWarning("Location is required");
      return false;
    } else if (eventDate === null) {
      setWarning("a set date is required");
      return false;
    } else if (!(eventDate.includes("/", 2) && eventDate.includes("/", 5))) {
      setWarning("date must be formated as: mm/dd/yyyy");
      return false;
    }
    return true;
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return blob;
  };

  const handleEventSubmit = async () => {
    if (!validateEventEntries()) {
      return;
    }
    const ownerId = 1;

    let dateList = eventDate.split("/");
    const date = `${dateList[2]}-${dateList[1]}-${dateList[0]}`;

    const catigory = eventGroup.join(", ");

    const imageKey = uuidv4();

    const img = await fetchImageFromUri(eventImgs);

    const imageStoreageResult = await Storage.put(imageKey, img, {
      level: "public",
      contentType: img.type,
    });

    const request = await CreateEvent(
      eventTitle,
      ownerId,
      date,
      catigory,
      eventLocation,
      imageKey
    );

    if (request.status === 200) {
      router.back();
    }
  };

  const handleEventBack = () => {
    router.back();
  };

  const handleGuestsSelect = () => {
    setModalType("GuestSelect");
    setModalDisplay(true);
  };

  const handleGroupSelect = () => {
    setModalType("GroupSelect");
    setModalDisplay(true);
  };

  const handleGroupTypeSelect = (title: string) => {
    if (!eventGroup.includes(title)) {
      setEventGroup(() => [...eventGroup, title]);
    } else {
      setEventGroup(eventGroup.filter((value) => value === title));
    }
  };

  const handleGuestSelect = (name: string) => {
    if (!eventGuests.includes(name)) {
      setEventGuests(() => [...eventGuests, name]);
    } else {
      setEventGuests(eventGuests.filter((value) => value === name));
    }
  };

  const unSubmitData = () => {
    if (modalType === "GroupSelect") {
      setEventGroup([]);
    } else {
      setEventGuests([]);
    }
  };

  const handleAddPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }
    setEventImgs(result.assets[0].uri);
  };

  return (
    <View className=" bg-gray-200 h-full">
      {modalDisplay ? (
        <View className=" w-full items-center mt-32">
          <View className=" bg-white mt-12 mx-8 w-4/5 h-[600px] rounded-xl flex">
            {modalType === "GroupSelect" ? (
              <View className="px-4">
                {groupTypes.map((title: string, index: number) => (
                  <TouchableOpacity
                    className={` h-12 items-center ${
                      eventGroup.includes(title) ? "bg-md-blue" : "bg-md-purple"
                    } rounded-full mt-4`}
                    key={index}
                    onPress={() => handleGroupTypeSelect(title)}
                  >
                    <Text className=" text-2xl font-semibold mt-2">
                      {title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className=" px-4 flex mt-8">
                {guestsTemp
                  .filter((value: string, index: number) => index < 10)
                  .map((name: string, index: number) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        className={`bg-${
                          eventGuests.includes(name) ? "md-blue" : "md-purple"
                        } p-2 rounded-full w-full items-center mt-4`}
                        onPress={() => handleGuestSelect(name)}
                      >
                        <Text className=" text-2xl font-semibold">{name}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}
            <View className=" flex-row mt-8">
              <TouchableOpacity
                className=" w-16 aspect-square rounded-full bg-red-400 ml-4"
                onPress={() => {
                  setModalDisplay(false);
                  unSubmitData();
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                className=" w-16 aspect-square rounded-full bg-green-400 ml-40"
                onPress={() => {
                  setModalDisplay(false);
                }}
              ></TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View className=" pt-20 px-6 flex space-y-4">
          {warning !== "" && (
            <View className=" w-full items-center">
              <Text className=" text-red-400 text-3xl font-semibold">
                {warning}
              </Text>
            </View>
          )}
          <TextInput
            className=" h-20 w-full bg-white rounded-xl text-3xl text-center"
            placeholder=" Title your event"
            value={eventTitle}
            onChangeText={(text) => {
              setEventTitle(text);
            }}
          ></TextInput>
          <TextInput
            className={` ${
              warning === "" ? " h-24" : " h-14"
            } w-full bg-white rounded-xl text-lg text-center py-4`}
            placeholder="Give your event a description"
            textAlignVertical="top"
            multiline={true}
            value={eventDescription}
            onChangeText={(text) => {
              setEventDesctiption(text);
            }}
          ></TextInput>
          <View>
            <View className=" bg-white rounded-lg h-20">
              <View className=" py-2 px-4 flex-row">
                <View className=" flex rounded-full bg-gray-200 h-16 ml-2 aspect-square">
                  <View className=" flex w-10 h-10 ml-3 mt-3">
                    <Image
                      className=" flex-1 p-2"
                      source={require("../../../assets/icons/clock.svg")}
                      contentFit="fill"
                    />
                  </View>
                </View>
                <TextInput
                  className=" text-3xl ml-4"
                  placeholder="mm/dd/yyyy"
                  value={eventDate}
                  onChangeText={(value) => {
                    setEventDate(value);
                  }}
                ></TextInput>
              </View>
            </View>
            <TouchableOpacity
              className=" bg-white rounded-xl h-20 w-full mt-4"
              onPress={handleAddPhotos}
            >
              <View className=" py-2 px-4 flex-row">
                <View className=" flex rounded-full bg-gray-200 h-16 ml-2 aspect-square mb-4">
                  <View className=" flex w-10 h-8 ml-3 mt-3">
                    <Image
                      className=" flex-1 p-2"
                      source={require("../../../assets/icons/camera.svg")}
                      contentFit="fill"
                    />
                  </View>
                </View>
                <Text className=" flex text-3xl text-gray-300 ml-4 mt-3 ">
                  {eventImgs !==
                  "../../../assets/placeholders/NextEventCover.png"
                    ? eventImgs.split("ImagePicker/")[1]
                    : "Add Photos"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className=" bg-white rounded-xl h-20 w-full"
            onPress={handleGroupSelect}
          >
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
                {eventGroup[0] === undefined
                  ? "Select Groups"
                  : eventGroup[0] + "..."}
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
              value={eventLocation}
              onChangeText={(text) => {
                setEventLocation(text);
              }}
            ></TextInput>
          </View>
          <TouchableOpacity
            className=" bg-white rounded-xl h-20 w-full"
            onPress={handleGuestsSelect}
          >
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
                {eventGuests[0] === undefined
                  ? "Guests"
                  : eventGuests[0] + "..."}
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
      )}
    </View>
  );
};

export default events;
