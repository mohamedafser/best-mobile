import { TabItem } from "@/components/layouts/tab-layout";

export const PUBLIC_TABS: TabItem[] = [
  {
    name: "explore",
    label: "Explore",
    iconFocused: "house.fill",
    iconUnfocused: "house",
  },
  {
    name: "trips",
    label: "Trips",
    iconFocused: "airplane",
    iconUnfocused: "airplane",
  },
  {
    name: "wallet",
    label: "Wallet",
    iconFocused: "dollarsign.circle.fill",
    iconUnfocused: "dollarsign.circle",
  },
  {
    name: "referral",
    label: "Referral",
    iconFocused: "gift.fill",
    iconUnfocused: "gift",
  },
  {
    name: "my-space",
    label: "My Space",
    iconFocused: "person.crop.circle.fill",
    iconUnfocused: "person.crop.circle",
  },
];
