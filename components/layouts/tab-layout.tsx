import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

export type TabItem = {
  name: string;
  iconFocused: string;
  iconUnfocused: string;
  label?: string;
  hidden?: boolean;
};

type Props = {
  tabs: TabItem[];
};

export default function TabLayout({ tabs }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <NativeTabs
      backgroundColor={isDark ? "#0f172a" : "#ffffff"}
      indicatorColor={isDark ? "#60a5fa" : "#2563eb"}
      labelStyle={{
        selected: {
          color: isDark ? "#60a5fa" : "#2563eb",
        },
      }}
    >
      {tabs
        .filter((tab) => !tab.hidden)
        .map((tab) => (
          <NativeTabs.Trigger key={tab.name} name={tab.name}>
            <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              sf={{
                default: tab.iconUnfocused,
                selected: tab.iconFocused,
              }}
            />
          </NativeTabs.Trigger>
        ))}
    </NativeTabs>
  );
}
