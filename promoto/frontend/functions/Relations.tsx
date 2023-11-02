import { IUser } from "./Auth";

import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`,
});

export interface IUserToUser {
  firstUser: number;
  id: number;
  isBlocked: boolean;
  isFollowed: boolean;
  secondUser: number;
}

export const FindFollowing = async (
  userEmail: string,
  checkFollow: boolean = true,
  checkBlocked: boolean = false
): Promise<Array<IUserToUser>> => {
  return await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/viewRelationships`,
    {
      method: "POST",
      body: JSON.stringify({ userEmail, checkFollow, checkBlocked }),
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      console.log(response.status);
      return null;
    }
  });
};

export const CreateFollowing = async (): Promise<boolean> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/`, {}).then(
    (response) => {
      if (response.ok) {
        return true;
      }
      return false;
    }
  );
};
