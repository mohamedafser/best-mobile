import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text";

const NavItem = ({
  route,
  icon,
  label,
  className = "border-b border-gray-300 dark:border-gray-800",
}: {
  route: string;
  icon: any;
  label: string;
  className?: string;
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-4 py-4 ${className}`}
      onPress={() => router.push(route as any)}
    >
      <View className="flex-row items-center">
        <Ionicons name={icon} size={20} color="#2563eb" />

        <ThemedText className="ml-3 text-base font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </ThemedText>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={colorScheme === "dark" ? "#fff" : "#000"}
      />
    </TouchableOpacity>
  );
};

export default NavItem;
