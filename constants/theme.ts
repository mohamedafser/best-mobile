/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
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
  },

  dark: {
    // Same tokens for consistency
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

    surfacePage: "#1A1A1A",
    surfaceCard: "#2E2A28",
    surfaceRaised: "#4D4743",
    surfaceSoft: "#2E2A28",

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

    success50: "#ECFDF5",
    success100: "#D1FAE5",
    success200: "#A7F3D0",
    success300: "#6EE7B7",
    success400: "#34D399",
    success500: "#2E9C7B",
    success600: "#16A34A",
    success700: "#15803D",
    success800: "#166534",

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

    primary1: "#4045EF",
    primary2: "#1216B3",
    primaryContainer: "#E3E3FF",
    primaryDivider: "#D3E0FE",
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
