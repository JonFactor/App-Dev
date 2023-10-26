export interface IGroup {
  title: string;
  description: string;
  image: string;
  groupType: string;
  owner: number;
}

export const CreateGroup = async (groupData: IGroup): Promise<IGroup> => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/createGroup`, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(groupData),
  }).then(async (response) => {
    if (!response.ok) {
      return null;
    }
    return await response.json();
  });
};
