export interface IUser {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
  description: string;
  favColor: string;
}

export const UserGetDetails = async (): Promise<IUser> => {
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

export const UserLogin = async (
  email: string,
  password: string
): Promise<Response> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((response) => {
    if (response.ok) {
      return response;
    }
    return null;
  });
};

export const UserRegister = async (
  name: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<boolean> => {
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
  }).then((response) => {
    if (response.ok) {
      return true;
    }
    return false;
  });
};

export const UserLoginViaCookies = async (jwt: string): Promise<boolean> => {
  const url: string = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/cookieLogin`;

  if (jwt === null) {
    return false;
  }

  jwt = jwt.split("=")[1];
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ jwt }),
  }).then((response) => {
    if (response.ok) {
      return true;
    }
    return false;
  });
};

export const UserUpdateProfile = async (
  profilePicUrl: String,
  id: String
): Promise<boolean> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/setProfile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, profilePicUrl }),
  }).then((response) => {
    if (response.ok) {
      return true;
    }
    return false;
  });
};
