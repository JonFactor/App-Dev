const CreateEvent = async (
  title: string,
  ownerId: number,
  date: string,
  group: string,
  location: string,
  coverImg
  // coverImg: string
) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/events`, {
    method: "POST",
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

export default CreateEvent;
