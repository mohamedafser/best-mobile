import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";
import { ThemedText } from "../themed-text";

const NavItem = ({
  route,
  icon,
  label,
  className = "",
}: {
  route: string;
  icon: any;
  label: string;
  className?: string;
}) => {
  const C = useThemeColors();

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-4 py-4 ${className}`}
      style={{ borderBottomColor: C.border, borderBottomWidth: className ? 0 : 1 }}
      onPress={() => router.push(route as any)}
    >
      <View className="flex-row items-center">
        <Ionicons name={icon} size={20} color={C.primary1} />

        <ThemedText className="ml-3 text-base font-semibold">{label}</ThemedText>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={C.icon}
      />
    </TouchableOpacity>
  );
};

export default NavItem;
