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
  ownerId: number,
  date: string,
  group: string,
  location: string,
  coverImg: string
  // coverImg: string
): Promise<boolean> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/eventCreate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title,
      location,
      ownerId,
      date,
      group,
      coverImg,
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
