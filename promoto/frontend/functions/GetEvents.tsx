const GetEvents = async () => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/events`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

export default GetEvents;
