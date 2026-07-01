import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

export default function TripDetailsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={Colors[colorScheme as "dark" | "light"]?.gray700}
            />
          </TouchableOpacity>
        ),
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "600",
        },
      }}
    />
  );
}
