import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function HotelDetailsLayout() {
  const C = useThemeColors();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "View hotel",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={C.gray700} />
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
