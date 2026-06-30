import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type PublicScreenItem = {
  label: string;
  route: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};

export const PUBLIC_SCREEN_GROUPS = [
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        route: "/(account)/profile",
        icon: "person-outline",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        label: "Settings",
        route: "/(account)/settings",
        icon: "settings-outline",
      },
    ],
  },
];

export const PROFILE_SCREENS: PublicScreenItem[] = [
  {
    label: "Update Profile",
    route: "/(account)/profile/update-personal-info",
    icon: "person-outline",
  },
  {
    label: "Update Password",
    route: "/(account)/profile/update-password",
    icon: "lock-closed-outline",
  },
];
