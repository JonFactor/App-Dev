import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default () => {
  const logoSetting = (filePath) => {
    return (
      <View style={styles.logoContain}>
        <Image style={styles.logo} source={filePath} contentFit="cover" />
      </View>
    );
  };

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{ tabBarIcon: () => logoSetting("../../house.png") }}
      />
      <Tabs.Screen name="groups" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  logoContain: {
    width: 50,
    aspectRatio: 1,
    flex: 1,
  },
  logo: {
    flex: 1,
    width: "100%",
    borderRadius: 40,
  },
});
