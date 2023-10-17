const SetCookies = async (jwt: string) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/cookieLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(jwt),
  });
};

export default SetCookies;
