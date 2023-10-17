const GetUser = async () => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user`, {
    headers: {
      "Content-Type": "application-json",
    },
    credentials: "include",
  });
};
export default GetUser;
