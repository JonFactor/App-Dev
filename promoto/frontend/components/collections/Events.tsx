import { View, Text, ScrollView } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import EventCard from "../cards/EventCard";
import { FilterContext } from "../../app/(tabs)/home";

const Events = (filters, noFilter: boolean) => {
  // pull events from db

  if (!filters === null) {
    filters = filters["filters"];
  }

  const EventsTemp = [
    {
      title: "jons barmitsfa party",
      day: "13",
      month: "oct",
      location: "my house",
      imagePath: require("../../assets/placeholders/NextEventCover.png"),
      eventType: "gaming",
      id: "1",
    },
    {
      title: "sheilas barmitsfa party",
      day: "13",
      month: "oct",
      location: "my house",
      imagePath: require("../../assets/placeholders/NextEventCover.png"),
      eventType: "gaming",
      id: "2",
    },
  ];

  // reload render when filters change
  //const [filtersState, setFiltersState] = useState([]);
  //setFiltersState(filters);
  const handleIsFiltered = (eventType: string) => {
    if (noFilter) {
      return true;
    }
    const nameMatch = filters.map((value, index) => {
      if (value.toUpperCase() === eventType.toUpperCase()) {
        return true;
      }
      if (filters.indexOf(value) + 1 == filters.length) {
        return false;
      }
    });

    if (nameMatch[0]) {
      return true;
    }

    if (filters.length < 1) {
      return true;
    }

    return false;
  };

  return (
    <ScrollView className="flex h-5/6 ">
      {EventsTemp.map(
        ({ title, day, month, location, imagePath, eventType, id }, index) => {
          const isFiltered = handleIsFiltered(eventType);
          if (isFiltered) {
            return (
              <View key={index} className=" mt-4">
                <EventCard
                  title={title}
                  day={day}
                  month={month}
                  location={location}
                  imagePath={imagePath}
                  eventType={eventType}
                  id={id}
                />
              </View>
            );
          }
        }
      )}
    </ScrollView>
  );
};

export default Events;
