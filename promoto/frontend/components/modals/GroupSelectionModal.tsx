import { View, Text } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import EventRegisterModalTemplate from "./EventRegisterModalTemplate";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EventTypeList, { IEventType } from "../../constants/EventTypeList";
import router from "../../common/routerHook";
import { GetGroupsViaUser } from "../../functions/Groups";
import { Image } from "expo-image";
import GroupCard from "../cards/GroupCard";

const GroupSelectionModal = ({ setter, parentSetter, parentValue }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const GroupSelection = (value, index) => {
    if (selectedItems.includes(index)) {
      parentSetter(parentValue.filter((i) => i === value));
      //setSelectedItems(selectedItems.filter((i) => i === value));
      return;
    }
    console.log(value);
    // parentSetter([...parentValue, value]);
    setSelectedItems([...selectedItems, index]);
  };

  useEffect(() => {
    const loadGroups = async () => {
      const groups = await GetGroupsViaUser();

      setUserGroups(groups);
    };
    loadGroups();
  }, []);

  return (
    <EventRegisterModalTemplate setter={setter}>
      <ScrollView className=" px-4">
        <View className=" w-full items-center flex">
          <Text className="text-5xl">Group</Text>
        </View>
        <View className=" mt-4">
          {userGroups !== null && (
            <View className=" w-full items-center">
              {userGroups.map((value, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    className=" mt-4 flex items-center"
                    onPress={() => GroupSelection(value, index)}
                  >
                    {selectedItems.includes(index) && (
                      <Text className=" text-2xl font-semibold text-green-500">
                        Selected
                      </Text>
                    )}
                    <GroupCard item={value} routingIgnore={"True"} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </EventRegisterModalTemplate>
  );
};

export default GroupSelectionModal;
