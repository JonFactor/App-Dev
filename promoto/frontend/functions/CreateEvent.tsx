const CreateEvent = async (
  title: string,
  ownerId: number,
  creationDate: Date,
  catigory: string,
  coverImg: string
) => {
  return fetch(`${process.env.BACKEND_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title,
      ownerId,
      creationDate,
      catigory,
      coverImg,
    }),
  });
};

export default CreateEvent;
["title", "ownerId", "creationDate", "catigory", "coverImg"];
