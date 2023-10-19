const SetCookies = async (jwt: string) => {
  const url: string = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/cookieLogin`;

  jwt = jwt.split("=")[1];
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ jwt }),
  });
};

export default SetCookies;
