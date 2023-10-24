import { IUser } from "./Auth";

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
