import ProfileHeader from "@/components/profile-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import NavItem from "@/components/ui/nav-item";
import { PUBLIC_SCREEN_GROUPS } from "@/constant/public-screens";
import { Colors } from "@/constants/theme";
import useLogout from "@/hooks/use-logout";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function MySpaceScreen() {
  const colorScheme = useColorScheme();
  const C = Colors[colorScheme as "dark" | "light"];
  const handleLogout = useLogout();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 65,
        paddingBottom: 48,
        backgroundColor: C.surfacePage,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View className="mx-4 rounded-3xl mb-6 p-4 items-center">
        <ProfileHeader avatarSize={80} />
      </View>

      {/* Menu Groups */}
      <View className="px-4 gap-5">
        {PUBLIC_SCREEN_GROUPS.map((group) => (
          <View key={group.title}>
            <ThemedText
              className="text-xs font-semibold uppercase mb-2 ml-1 tracking-widest"
              style={{ color: C.gray600 }}
            >
              {group.title}
            </ThemedText>
            <ThemedView
              className="rounded-2xl overflow-hidden"
              lightColor={Colors?.light?.surfaceCard}
              darkColor={Colors?.dark?.surfaceCard}
            >
              {group.items.map((item, index) => {
                const isLast = index === group.items.length - 1;
                return (
                  <NavItem
                    key={item.route}
                    route={item.route}
                    icon={item.icon}
                    label={item.label}
                    className={
                      isLast
                        ? ""
                        : "border-b border-gray-300 dark:border-gray-800"
                    }
                  />
                );
              })}
            </ThemedView>
          </View>
        ))}

        {/* Logout */}
        <View className="mt-5">
          <ThemedView
            className="rounded-2xl overflow-hidden"
            lightColor={Colors?.light?.surfaceCard}
            darkColor={Colors?.dark?.surfaceCard}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center px-4 py-4"
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color={C.error500} />
              <ThemedText
                className="ml-3 text-base font-semibold"
                style={{ color: C.error500 }}
              >
                Log Out
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </View>
    </ScrollView>
  );
}
