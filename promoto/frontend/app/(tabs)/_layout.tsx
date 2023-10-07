import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useAssets } from "expo-asset";

export default () => {
  const logoSetting = (imgSrc) => {
    return (
      <View style={styles.logoContain}>
        <Image style={styles.logo} source={imgSrc} contentFit="cover" />
      </View>
    );
  };

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () =>
            logoSetting(require("../../assets/navbarIcons/house.png")),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          tabBarIcon: () =>
            logoSetting(require("../../assets/navbarIcons/groups.png")),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: () =>
            logoSetting(require("../../assets/navbarIcons/notifications.png")),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () =>
            logoSetting(require("../../assets/navbarIcons/profile.png")),
        }}
      />
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
