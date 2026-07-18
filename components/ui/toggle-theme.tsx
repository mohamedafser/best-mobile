import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemePreference } from "@/hooks/use-theme-preference";
import { Colors } from "@/constants/theme";
import { ThemePreference } from "@/store/slice/theme-slice";

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: "light", label: "Light", icon: "sunny-outline" },
  { value: "dark", label: "Dark", icon: "moon-outline" },
  { value: "system", label: "System", icon: "phone-portrait-outline" },
];

export default function ThemeToggle() {
  const colorScheme = useColorScheme();
  const { preference, setPreference } = useThemePreference();
  const C = Colors[colorScheme as "dark" | "light"];

  return (
    <View className="flex-row gap-2">
      {THEME_OPTIONS.map((option) => {
        const isSelected = preference === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            activeOpacity={0.8}
            onPress={() => setPreference(option.value)}
            className="flex-1 items-center rounded-2xl border px-3 py-3"
            style={{
              backgroundColor: isSelected ? C.brand50 : C.surfaceSoft,
              borderColor: isSelected ? C.brand500 : C.gray300,
            }}
          >
            <Ionicons
              name={option.icon}
              size={20}
              color={isSelected ? C.brand600 : C.gray600}
            />
            <Text
              className="mt-1.5 text-xs font-semibold"
              style={{ color: isSelected ? C.brand700 : C.gray600 }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
