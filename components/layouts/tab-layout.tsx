import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useColorScheme } from "react-native";

export type TabItem = {
  name: string;
  label?: string;
  hidden?: boolean;

  iosIconFocused: string;
  iosIconUnfocused: string;

  androidIconFocused: string;
  androidIconUnfocused: string;
};

type Props = {
  tabs: TabItem[];
};

export default function TabLayout({ tabs }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isAndroid = Platform.OS === "android";

  return (
    <NativeTabs
      backgroundColor={isDark ? "#0f172a" : "#ffffff"}
      indicatorColor={isDark ? "#60a5fa" : "#000000"}
      tintColor={
        isAndroid
          ? isDark
            ? "#60a5fa"
            : "#fff"
          : isDark
            ? "#60a5fa"
            : "#2563eb"
      }
      labelStyle={{
        selected: {
          color: isAndroid
            ? isDark
              ? "#60a5fa"
              : "#000"
            : isDark
              ? "#60a5fa"
              : "#2563eb",
        },
        default: {
          color: isDark ? "#94a3b8" : "#000000",
        },
      }}
    >
      {tabs
        .filter((tab) => !tab.hidden)
        .map((tab) => (
          <NativeTabs.Trigger key={tab.name} name={tab.name}>
            <NativeTabs.Trigger.Label>
              {tab.label ?? tab.name}
            </NativeTabs.Trigger.Label>

            <NativeTabs.Trigger.Icon
              sf={{
                default: tab.iosIconUnfocused,
                selected: tab.iosIconFocused,
              }}
              md={{
                default: tab.androidIconUnfocused,
                selected: tab.androidIconFocused,
              }}
            />
          </NativeTabs.Trigger>
        ))}
    </NativeTabs>
  );
}
