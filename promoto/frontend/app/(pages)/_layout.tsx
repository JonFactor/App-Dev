import { Stack } from "expo-router";

const pagesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default pagesLayout;
