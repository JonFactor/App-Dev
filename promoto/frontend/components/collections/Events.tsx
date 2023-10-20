import { View, Text, ScrollView } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import EventCard from "../cards/EventCard";
import { FilterContext } from "../../app/(tabs)/home";
import { EventsGetAll } from "../../functions/Events";

const Events = (filters, noFilter: boolean) => {
  // pull events from db

  if (filters !== null) {
    filters = filters["filters"];
  }
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const getEventData = async () => {
      const content = await EventsGetAll();
      setEventData(content);
    };

    getEventData();
  }, []);

  // reload render when filters change
  //const [filtersState, setFiltersState] = useState([]);
  //setFiltersState(filters);
  const handleIsFiltered = (eventType: string) => {
    if (noFilter || filters.length < 1) {
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

    return false;
  };

  return (
    <View className="flex h-5/6 ">
      {eventData !== undefined &&
        eventData.map(
          ({ date, group, location, title, id, coverImg }, index) => {
            const day = date.split("-")[1];
            const month = date.split("-")[2];
            const isFiltered = handleIsFiltered(group);

            if (isFiltered) {
              return (
                <View key={index} className=" mt-4">
                  <EventCard
                    title={title}
                    day={day}
                    month={month}
                    location={location}
                    id={id}
                    imagePath={coverImg}
                    eventType={group}
                  />
                </View>
              );
            }
          }
        )}
    </View>
  );
};

export default Events;
