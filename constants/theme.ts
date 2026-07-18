/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    gray1: "#E8E3DE",
    gray50: "#141210",
    gray100: "#1E1C1A",
    gray200: "#2A2725",
    gray300: "#3D3835",
    gray400: "#5C5652",
    gray500: "#8A827C",
    gray600: "#B5ADA6",
    gray700: "#D4CCC5",
    gray800: "#EDE6E0",
    gray900: "#FFF9F4",

    // Surface
    surfacePage: "#FFFFFF",
    surfaceCard: "#FFFBF9",
    surfaceRaised: "#FFF5F2",
    surfaceSoft: "#F5EEEB",

    // Brand
    brand50: "#FFF1EC",
    brand100: "#FFE0D0",
    brand200: "#FFC2A5",
    brand300: "#FFA070",
    brand400: "#FF8A4C",
    brand500: "#FF7A45",
    brand600: "#E65E32",
    brand700: "#CC4A28",
    brand800: "#99381F",
    brand900: "#7A2B18",

    // Success
    success50: "#ECFDF5",
    success100: "#D1FAE5",
    success200: "#A7F3D0",
    success300: "#6EE7B7",
    success400: "#34D399",
    success500: "#2E9C7B",
    success600: "#16A34A",
    success700: "#15803D",
    success800: "#166534",

    // Error
    error50: "#FFF1F1",
    error100: "#FFE2E2",
    error200: "#FECDCA",
    error300: "#FDA29B",
    error400: "#F97066",
    error500: "#F04438",
    error600: "#D92D20",
    error700: "#B42318",
    error800: "#912018",
    error900: "#7A271A",

    // Warning
    warning50: "#FFFCF5",
    warning100: "#FFFAEB",
    warning200: "#FEF0C7",
    warning300: "#FEC84B",
    warning400: "#FDB022",
    warning500: "#F79009",
    warning600: "#DC6803",
    warning700: "#B54708",
    warning800: "#93370D",
    warning900: "#7A2E0E",

    // Legacy Primary
    primary1: "#4045EF",
    primary2: "#1216B3",
    primaryContainer: "#E3E3FF",
    primaryDivider: "#D3E0FE",

    // Semantic
    text: "#1A1A1A",
    textMuted: "#7A736E",
    background: "#FFFFFF",
    icon: "#7A736E",
    border: "#E6DED8",
    tabBar: "#FFFFFF",
    tabBarActive: "#2563eb",
    tabBarInactive: "#000000",
    tabBarTint: "#2563eb",
  },

  dark: {
    // Gray
    gray1: "#333333",
    gray50: "#FFF9F4",
    gray100: "#FFFFFF",
    gray200: "#F2ECE7",
    gray300: "#E6DED8",
    gray400: "#CFC6BF",
    gray500: "#AFA7A1",
    gray600: "#7A736E",
    gray700: "#4D4743",
    gray800: "#2E2A28",
    gray900: "#1A1A1A",

    surfacePage: "#121110",
    surfaceCard: "#1E1C1A",
    surfaceRaised: "#2A2725",
    surfaceSoft: "#242220",

    brand50: "#2A1810",
    brand100: "#3D2218",
    brand200: "#5C3018",
    brand300: "#8A4520",
    brand400: "#C45A28",
    brand500: "#FF7A45",
    brand600: "#FF8A4C",
    brand700: "#FFA070",
    brand800: "#FFC2A5",
    brand900: "#FFE0D0",

    success50: "#0A1F17",
    success100: "#0F2E22",
    success200: "#154032",
    success300: "#1B5242",
    success400: "#2E9C7B",
    success500: "#34D399",
    success600: "#6EE7B7",
    success700: "#A7F3D0",
    success800: "#D1FAE5",

    error50: "#2A1210",
    error100: "#3D1815",
    error200: "#5C221C",
    error300: "#7A2B24",
    error400: "#F04438",
    error500: "#F97066",
    error600: "#FDA29B",
    error700: "#FECDCA",
    error800: "#FFE2E2",
    error900: "#FFF1F1",

    warning50: "#1F1608",
    warning100: "#2E210C",
    warning200: "#453010",
    warning300: "#5C4014",
    warning400: "#F79009",
    warning500: "#FDB022",
    warning600: "#FEC84B",
    warning700: "#FEF0C7",
    warning800: "#FFFAEB",
    warning900: "#FFFCF5",

    primary1: "#6B70FF",
    primary2: "#4045EF",
    primaryContainer: "#1E2040",
    primaryDivider: "#2A2D55",

    // Semantic
    text: "#FFF9F4",
    textMuted: "#B5ADA6",
    background: "#121110",
    icon: "#B5ADA6",
    border: "#3D3835",
    tabBar: "#1E1C1A",
    tabBarActive: "#60a5fa",
    tabBarInactive: "#94a3b8",
    tabBarTint: "#60a5fa",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    // sans: "normal",
    // serif: "serif",
    // rounded: "normal",
    // mono: "monospace",
    sans: "DM Sans",
    serif: "Playfair Display",
    rounded: "DM Sans",
    mono: "monospace",
  },
  //   web: {
  //   sans: "DM Sans",
  //   serif: "Playfair Display",
  //   rounded: "DM Sans",
  //   mono: "monospace",
  // },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
