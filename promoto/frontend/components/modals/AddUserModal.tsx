import { View, Text } from "react-native";
import React from "react";
import EventRegisterModalTemplate from "./EventRegisterModalTemplate";

const AddUserModal = ({ setter, parentSetter }) => {
  return (
    <EventRegisterModalTemplate setter={setter}>
      <View></View>
    </EventRegisterModalTemplate>
  );
};

export default AddUserModal;
