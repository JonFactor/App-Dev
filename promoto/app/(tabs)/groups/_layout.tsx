import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Groups" }} />
    </Stack>
  );
};
