import { View, Text, TextInput, ActivityIndicator, Modal } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import register from "../register";
import groupTypes from "../../../constants/groupTypes";
import * as ImagePicker from "expo-image-picker";
import { EventCreate } from "../../../functions/Events";
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import router from "../../../common/routerHook";
import { LinearGradient } from "expo-linear-gradient";
import ProfilePictureCard from "../../../components/cards/ProfilePictureCard";
import { AuthContext } from "../../../context/AuthContext";
import { IUser } from "../../../functions/Auth";
import GroupSelectionModal from "../../../components/modals/GroupSelectionModal";
import EventTypeModal from "../../../components/modals/EventTypeModal";
import AddUserModal from "../../../components/modals/AddUserModal";

const events = () => {
  const { getUserInfo } = useContext(AuthContext);
  // absolutelty disscusting state declarations
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDesctiption] = useState("");
  const [eventImgs, setEventImgs] = useState(
    require("../../../assets/placeholders/NextEventCover.png")
  );
  const [eventGroup, setEventGroup] = useState([]);
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState([]);
  const [eventCoHosts, setEventCoHosts] = useState(Array<IUser>);
  const [eventGuests, setEventGuests] = useState([]);
  const [eventDate, setEventDate] = useState("");

  const [addUserModal, setAddUserModal] = useState(false);
  const [selectGroupModal, setSelectGroupModal] = useState(false);
  const [selectEventTypeModal, setSelectEventTypeModal] = useState(false);

  const [userRelation, setUserRelation] = useState("");

  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalType, setModalType] = useState("");

  const [hostName, setHostName] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const user: IUser = await getUserInfo();

      if (user === null) {
        return;
      }
      setHostName(user.name);
    };
    getUserData();
  }, []);

  const guestsTemp = [
    " Jon Fac",
    "becky Neck",
    "trecky Fec",
    "woah Shoe",
    "foe Doe",
  ];

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
    setIsLoading(true);
    if (!validateEventEntries()) {
      setIsLoading(false);
      return;
    }

    const imageKey = uuidv4();
    const img = await fetchImageFromUri(eventImgs);

    const imageStoreageResult = await Storage.put(imageKey, img, {
      level: "public",
      contentType: img.type,
    });

    const ownerId = 1;
    let dateList = eventDate.split("/");
    const date = `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
    const catigory = eventGroup.join(", ");

    const responseOk = await EventCreate(
      eventTitle,
      ownerId,
      date,
      catigory,
      eventLocation,
      imageKey
    );

    if (responseOk) {
      setIsLoading(false);
      router.back();
      return;
    }

    setIsLoading(false);
  };

  const handleEventBack = () => {
    router.back();
  };

  const unSubmitData = () => {
    if (modalType === "GroupSelect") {
      setEventGroup([]);
    } else {
      setEventGuests([]);
    }
  };

  const handleAddPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }
    setEventImgs(result.assets[0].uri);
  };

  const handleAddNewCoHost = () => {
    setUserRelation("COHOST");
    setAddUserModal(true);
  };

  const handleAddNewGuest = () => {
    setUserRelation("GUEST");
    setAddUserModal(true);
  };

  const handleEventTypeAdd = () => {
    setSelectEventTypeModal(true);
  };

  const handleGroupSelect = () => {
    setSelectGroupModal(true);
  };

  const handleETypeItemClick = (value: string) => {
    setEventGroup(eventGroup.filter((item) => item === value));
  };

  return (
    <View className=" bg-gray-200 h-full">
      {isLoading ? (
        <View>
          <ActivityIndicator size={"large"} className=" mt-72  " />
        </View>
      ) : (
        <ScrollView className=" mt-14">
          <Modal visible={addUserModal}>
            {userRelation === "COHOST" ? (
              <AddUserModal
                setter={setAddUserModal}
                parentSetter={setEventCoHosts}
              ></AddUserModal>
            ) : (
              <AddUserModal
                setter={setAddUserModal}
                parentSetter={setEventGuests}
              ></AddUserModal>
            )}
          </Modal>
          <Modal visible={selectEventTypeModal}>
            <EventTypeModal
              setter={setSelectEventTypeModal}
              parentSetter={setEventType}
              parentValue={eventType}
            ></EventTypeModal>
          </Modal>
          <Modal visible={selectGroupModal} className=" mt-8 p-2">
            <GroupSelectionModal
              setter={setSelectGroupModal}
              parentSetter={setEventGroup}
              parentValue={eventGroup}
            ></GroupSelectionModal>
          </Modal>
          <View className=" h-72 flex w-full">
            <LinearGradient
              className=" w-full h-full flex"
              colors={["rgba(0,0,0,.15)", "transparent"]}
            >
              <Image className=" flex-1" contentFit="cover" source={eventImgs}>
                <TouchableOpacity
                  onPress={handleAddPhoto}
                  className=" flex  bg-md-purple rounded-full aspect-square w-20 border-4 border-white ml-80 mt-44"
                >
                  <View className=" p-4 flex-1 h-12 mt-1">
                    <Image
                      className=" flex h-8 w-10"
                      contentFit="cover"
                      source={require("../../../assets/icons/camera.svg")}
                    />
                  </View>
                </TouchableOpacity>
              </Image>
            </LinearGradient>
          </View>
          {}
          <View className=" flex">
            <View className=" mt-4">
              <TextInput
                className=" text-3xl ml-4"
                placeholder="Event Title"
              ></TextInput>
              <View className=" w-5/6 bg-light-purple h-2 mt-4" />
            </View>
            <View className=" mt-4">
              <TextInput
                className=" text-2xl ml-4 "
                placeholder="Description"
                multiline={true}
              ></TextInput>
              <View className=" w-3/4 bg-light-purple h-2 mt-4" />
            </View>
            <View className=" mt-2">
              <TextInput
                className=" text-2xl ml-4 "
                placeholder="Date"
                multiline={true}
              ></TextInput>
              <View className=" w-3/4 bg-light-purple h-2 mt-2" />
            </View>
            <View className=" mt-2">
              <TextInput
                className=" text-2xl ml-4 "
                placeholder="Location"
                multiline={true}
              ></TextInput>
              <View className=" w-3/4 bg-light-purple h-2 mt-2" />
            </View>
            <View className=" mt-2">
              <View className="ml-4  flex-row">
                <Text className=" text-2xl text-gray-400 mt-2 mr-4">Host</Text>
                <ProfilePictureCard width={"12"} />
                <Text className=" text-2xl mt-2 ml-2">{hostName}</Text>
              </View>
              <View className=" w-5/6 bg-light-purple h-2 mt-2" />
            </View>
            <View className=" mt-2">
              <View className=" flex-row">
                <Text className=" text-2xl text-gray-400 mt-2 mr-4 ml-4">
                  Co-Hosts
                </Text>
                <ScrollView horizontal>
                  {guestsTemp.map((value: string, index: number) => {
                    return (
                      <TouchableOpacity
                        className=" flex-row ml-2"
                        onPress={() => {
                          // remove from list
                          console.log(index);
                        }}
                        key={index}
                      >
                        <View className=" flex aspect-square w-12">
                          <Image
                            className="flex-1 rounded-full "
                            contentFit="cover"
                            source={require("../../../assets/placeholders/NextEventCover.png")}
                          />
                        </View>
                        <Text className=" ml-2 text-xl mt-2">{value}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  <TouchableOpacity
                    className=" w-12 aspect-square ml-4 bg-md-blue rounded-full"
                    onPress={handleAddNewCoHost}
                  >
                    <View className=" flex w-8 mt-2 ml-2 rounded-full aspect-square">
                      <Image
                        className=" flex-1 rounded-full rotate-45"
                        contentFit="cover"
                        source={require("../../../assets/icons/white-cross.svg")}
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              <View className=" w-3/4 bg-light-purple h-2 mt-2" />
            </View>
            <View className=" mt-2">
              <View className=" flex-row">
                <Text className=" text-2xl text-gray-400 mt-2 mr-12 ml-4">
                  Guests
                </Text>
                <ScrollView horizontal>
                  {guestsTemp.map((value: string, index: number) => {
                    return (
                      <TouchableOpacity
                        className=" flex-row ml-2"
                        onPress={() => {
                          // remove from list
                          console.log(index + 2);
                        }}
                        key={index}
                      >
                        <View className=" flex aspect-square w-12">
                          <Image
                            className="flex-1 rounded-full "
                            contentFit="cover"
                            source={require("../../../assets/placeholders/NextEventCover.png")}
                          />
                        </View>
                        <Text className=" ml-2 text-xl mt-2">{value}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  <TouchableOpacity
                    className=" w-12 aspect-square ml-4 bg-md-blue rounded-full"
                    onPress={handleAddNewGuest}
                  >
                    <View className=" flex w-8 mt-2 ml-2 rounded-full aspect-square">
                      <Image
                        className=" flex-1 rounded-full rotate-45"
                        contentFit="cover"
                        source={require("../../../assets/icons/white-cross.svg")}
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              <View className=" w-3/4 bg-light-purple h-2 mt-2" />
            </View>
            <View className=" mt-2 flex">
              <View className=" flex-row">
                <Text className=" text-2xl text-gray-400 mt-2 ml-4">
                  Groups
                </Text>
                <ScrollView horizontal className=" ml-4">
                  <View className=" flex-row mt-1">
                    {eventGroup.map((value: string, index: number) => {
                      return (
                        <TouchableOpacity
                          className=" px-2 rounded-full h-10 border-2 border-md-blue ml-2"
                          key={index}
                          onPress={() => {
                            console.log(value);
                            handleETypeItemClick(value);
                          }}
                        >
                          <Text className=" text-lg p-1">{value}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    className=" w-12 aspect-square ml-4 bg-md-blue rounded-full"
                    onPress={handleGroupSelect}
                  >
                    <View className=" flex w-8 mt-2 ml-2 rounded-full aspect-square">
                      <Image
                        className=" flex-1 rounded-full rotate-45"
                        contentFit="cover"
                        source={require("../../../assets/icons/white-cross.svg")}
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              <View className=" w-5/6 bg-light-purple h-2 mt-2" />
            </View>
            <View className=" mt-2 flex">
              <View className=" flex-row">
                <Text className=" text-2xl text-gray-400 mt-2 mr-8 ml-4">
                  Type
                </Text>
                <ScrollView horizontal className="">
                  {eventType !== null && (
                    <View className=" flex-row mt-1">
                      {eventType.map((value: string, index: number) => {
                        return (
                          <TouchableOpacity
                            className=" px-2 rounded-full h-10 border-2 border-md-purple ml-2"
                            key={index}
                          >
                            <Text className=" text-lg p-1">{value}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                  <TouchableOpacity
                    className=" w-12 aspect-square ml-4 bg-md-blue rounded-full"
                    onPress={handleEventTypeAdd}
                  >
                    <View className=" flex w-8 mt-2 ml-2 rounded-full aspect-square">
                      <Image
                        className=" flex-1 rounded-full rotate-45"
                        contentFit="cover"
                        source={require("../../../assets/icons/white-cross.svg")}
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              <View className=" w-3/4 bg-light-purple h-2 mt-2" />
            </View>
          </View>
          {}
          <View className=" flex-row mt-4 mx-10 ">
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
        </ScrollView>
      )}
    </View>
  );
};

export default events;
