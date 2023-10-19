export const UserGetDetails = async () => {
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

export const UserLogin = async ({ email, password }) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const UserRegister = async (
  name: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      firstName,
      lastName,
    }),
  });
};

export const UserLoginViaCookies = async (jwt: string) => {
  const url: string = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/cookieLogin`;

  jwt = jwt.split("=")[1];
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ jwt }),
  });
};

export const UserUpdate = async (profilePicUrl: String, id: String) => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/setProfile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, profilePicUrl }),
  });
};
