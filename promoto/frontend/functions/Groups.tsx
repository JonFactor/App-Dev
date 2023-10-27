export interface IGroup {
  title: string;
  description: string;
  image: string;
  groupType: string;
  owner: number;
}

export const CreateGroup = async (
  title: string,
  description: string,
  image: string,
  groupType: string
): Promise<IGroup> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/createGroup`, {
    method: "post",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, description, image, groupType }),
  }).then(async (response) => {
    if (!response.ok) {
      return null;
    }
    return await response.json();
  });
};

export const GetAllGroups = async (): Promise<Array<IGroup>> => {
  return await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/getAllGroups`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  ).then(async (response) => {
    if (!response.ok) {
      console.log(response.status);
      return null;
    }
    return await response.json();
  });
};

export const AddUserToGroupView = async (
  email: string,
  title: string,
  isOwner: boolean,
  isCoOwner: boolean,
  isMember: boolean,
  isBanned: boolean
): Promise<boolean> => {
  return await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/addUserToGroup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        title,
        isOwner,
        isCoOwner,
        isMember,
        isBanned,
      }),
    }
  ).then((response) => {
    if (response.ok) {
      return true;
    }
    return false;
  });
};
