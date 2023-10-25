import { View, Text } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import EventRegisterModalTemplate from "./EventRegisterModalTemplate";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EventTypeList, { IEventType } from "../../constants/EventTypeList";
import router from "../../common/routerHook";

const GroupSelectionModal = ({ setter, parentSetter, parentValue }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const GroupSelection = (value) => {};
  return (
    <EventRegisterModalTemplate setter={setter}>
      <ScrollView className=" p-4"></ScrollView>
    </EventRegisterModalTemplate>
  );
};

export default GroupSelectionModal;
