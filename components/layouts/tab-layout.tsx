import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";

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
  const C = useThemeColors();
  const isAndroid = Platform.OS === "android";

  return (
    <NativeTabs
      backgroundColor={C.tabBar}
      indicatorColor={C.tabBarActive}
      tintColor={isAndroid ? "#ffffff" : C.tabBarTint}
      labelStyle={{
        selected: {
          color: C.tabBarActive,
        },
        default: {
          color: C.tabBarInactive,
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
