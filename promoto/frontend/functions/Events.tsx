export const EventCreate = async (
  title: string,
  ownerId: number,
  date: string,
  group: string,
  location: string,
  coverImg: string
  // coverImg: string
) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/events`, {
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
  });
};

interface Event {}

export const EventsGetAll = async () => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/events`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async (response) => {
    if (!response.ok) {
      console.log("EventsGetAllErr: " + response.status);
      return null;
    }
    const content = await response.json();
    return content;
  });
};

export const EventsGetDetails = async () => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}`);
};
