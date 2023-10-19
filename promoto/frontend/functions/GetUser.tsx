const GetUser = async () => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user`, {
    headers: {
      "Content-Type": "application-json",
    },
    credentials: "include",
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      console.log(response.status);
      return null;
    }
  });
};
export default GetUser;
