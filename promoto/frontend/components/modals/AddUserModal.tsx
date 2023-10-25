import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import EventRegisterModalTemplate from "./EventRegisterModalTemplate";

const AddUserModal = ({ setter, parentSetter }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const GroupSelection = (value) => {};
  return (
    <EventRegisterModalTemplate setter={setter}>
      <ScrollView className=" p-4"></ScrollView>
    </EventRegisterModalTemplate>
  );
};

export default AddUserModal;
