export interface IEvent {
  title: string;
  ownerId: number;
  date: string;
  group: string;
  location: string;
  coverImgUri: string;
}

export const EventCreate = async (
  title: string,
  date: string,
  group: string,
  location: string,
  coverImg: string,
  eventGroup: string
  // coverImg: string
): Promise<boolean> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/eventCreate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title,
      location,
      date,
      group,
      coverImg,
      eventGroup,
    }),
  }).then((response) => {
    if (response.ok) {
      return true;
    }

    return false;
  });
};

// might err
export const EventsGetAll = async (): Promise<Array<IEvent>> => {
  return await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/eventCollection`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    if (!response.ok) {
      console.log("EventsGetAllErr: " + response.status);
      return null;
    }
    const content = await response.json();
    return content;
  });
};

export const EventsGetDetails = async (id: string): Promise<IEvent> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/eventData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  }).then(async (response) => {
    if (!response.ok) {
      console.log("EventGetSingular: " + response.status);
      return null;
    }
    return await response.json();
  });
};

export const User2Event = async (
  viaEmail: boolean,
  email: string,
  eventTitle: string,
  isOwner: boolean,
  isCoOwner: boolean,
  isGuest: boolean
): Promise<boolean> => {
  return await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/event2userCreate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        viaEmail,
        email,
        eventTitle,
        isOwner,
        isCoOwner,
        isGuest,
      }),
    }
  ).then((response) => {
    if (response.ok) {
      return true;
    }
    return false;
  });
};

export const setEventUserPref = async (
  eventTitle: string,
  isLiked: boolean,
  isDisliked: boolean
): Promise<boolean> => {
  return await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/eventUserPreferencesSet`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventTitle, isLiked, isDisliked }),
    }
  ).then((response) => {
    if (response.ok) {
      return true;
    }
    return false;
  });
};
