import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import ThemeToggle from "@/components/ui/toggle-theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { View } from "react-native";

const Settings = () => {
  const colorScheme = useColorScheme();
  const C = Colors[colorScheme as "dark" | "light"];

  return (
    <ThemedView
      className="flex-1 px-4"
      style={{
        paddingTop: 20,
        backgroundColor: C.surfacePage,
      }}
    >
      <ThemedView
        className="rounded-xl px-4 py-4"
        lightColor={Colors.light.surfaceCard}
        darkColor={Colors.dark.surfaceCard}
      >
        <ThemedText className="text-base font-semibold">Appearance</ThemedText>
        <ThemedText className="mt-1 text-sm" style={{ color: C.gray600 }}>
          Choose light, dark, or match your device settings.
        </ThemedText>

        <View className="mt-4">
          <ThemeToggle />
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export default Settings;
