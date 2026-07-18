import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar, type StatusBarStyle } from "expo-status-bar";
import type { ReactNode } from "react";
import { Platform, TouchableOpacity, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppStackLayoutProps = {
  children?: ReactNode;
  showBackButton?: boolean;
  statusBarStyle?: StatusBarStyle;
  headerBackgroundColor?: string;
  contentBackgroundColor?: string;
  backIconColor?: string;
};

export default function AppStackLayout({
  children,
  showBackButton = true,
  statusBarStyle = "dark",
  headerBackgroundColor,
  contentBackgroundColor,
  backIconColor,
}: AppStackLayoutProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const defaultHeaderBackgroundColor =
    headerBackgroundColor ||
    Colors[colorScheme as "light" | "dark"].surfacePage;

  const defaultConetentBackgroundColor =
    contentBackgroundColor ||
    Colors[colorScheme as "light" | "dark"].background;

  const defaultBackIconColor =
    backIconColor || Colors[colorScheme as "light" | "dark"].gray100;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: defaultHeaderBackgroundColor,
        marginTop: Platform.OS === "android" ? -insets.top : 0,
      }}
    >
      <StatusBar style={statusBarStyle} />

      <Stack
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,

          headerLeft: showBackButton
            ? () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  className="h-10 w-10 items-center justify-center"
                >
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color={defaultBackIconColor}
                  />
                </TouchableOpacity>
              )
            : undefined,

          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "600",
            color: Colors[colorScheme as "light" | "dark"].gray100,
          },

          headerStyle: {
            backgroundColor: defaultHeaderBackgroundColor,
          },

          contentStyle: {
            backgroundColor: defaultConetentBackgroundColor,
          },
        }}
      >
        {children}
      </Stack>
    </View>
  );
}
