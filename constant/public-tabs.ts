import { TabItem } from "@/components/layouts/tab-layout";

export const PUBLIC_TABS: TabItem[] = [
  {
    name: "explore",
    label: "Explore",
    iosIconFocused: "house.fill",
    iosIconUnfocused: "house",

    androidIconUnfocused: "home",
    androidIconFocused: "home",
  },
  {
    name: "trips",
    label: "Trips",
    iosIconFocused: "airplane",
    iosIconUnfocused: "airplane",

    androidIconUnfocused: "flight",
    androidIconFocused: "flight",
  },
  {
    name: "wallet",
    label: "Wallet",
    iosIconFocused: "dollarsign.circle.fill",
    iosIconUnfocused: "dollarsign.circle",

    androidIconUnfocused: "wallet",
    androidIconFocused: "wallet",
  },
  {
    name: "referral",
    label: "Referral",
    iosIconFocused: "gift.fill",
    iosIconUnfocused: "gift",

    androidIconUnfocused: "star",
    androidIconFocused: "star",
  },
  {
    name: "my-space",
    label: "My Space",
    iosIconFocused: "person.crop.circle.fill",
    iosIconUnfocused: "person.crop.circle",

    androidIconUnfocused: "person",
    androidIconFocused: "person",
  },
];
