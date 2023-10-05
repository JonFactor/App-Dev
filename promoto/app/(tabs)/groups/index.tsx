import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import GroupTypes from "../../components/cards/GroupTypes";

const GroupsPage = () => {
  const groupTypeList = [
    ["sports", "football.png", "#F78E78"],
    ["music", "guitar.png", "#F1F778"],
    ["video games", "controler.png", "#78F780"],
    ["chess", "pawn.png", "#78D4F7"],
    ["exersize", "weights.png", "#A678F7"],
    ["educational", "glasses.png", "#F778DE"],
  ];
  return (
    <View style={styles.groupContainers}>
      {groupTypeList.map((item, index) => {
        return (
          <GroupTypes
            key={index}
            color={item[2]}
            scale={1}
            title={item[0]}
            logo={item[1]}
            gradient={true}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainers: {
    display: "flex",
  },
});

export default GroupsPage;
