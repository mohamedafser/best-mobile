import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import ThemeToggle from "@/components/ui/toggle-theme";
import { Colors } from "@/constants/theme";
import { Platform, useColorScheme } from "react-native";

const Settings = () => {
  const colorScheme = useColorScheme();
  const C = Colors[colorScheme as "dark" | "light"];
  return (
    <ThemedView
      className="flex-1 pt-6 px-4"
      style={{
        paddingTop: Platform.OS === "android" ? 65 : 75,
        backgroundColor: C.surfacePage,
      }}
    >
      <ThemedView
        className="flex-row items-center justify-between rounded-xl px-4 py-4"
        lightColor={Colors.light.surfaceCard}
        darkColor={Colors.dark.surfaceCard}
      >
        <ThemedText>Dark Mode</ThemedText>

        <ThemeToggle />
      </ThemedView>
    </ThemedView>
  );
};

export default Settings;
