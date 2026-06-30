import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type ChipVariant =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "pending"
  | "warningDark"
  | "coin"
  | "active"
  | "amadeus"
  | "webbeds"
  | "default";

export type ChipSize = "small" | "large";

interface ChipProps {
  label: string;
  size?: ChipSize;
  variant?: ChipVariant;
  type?: "filled" | "outlined";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  closable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onClose?: () => void;
}

const COLORS = {
  filled: {
    active: {
      bg: "#DCFCE7",
      text: "#15803D",
      border: "#DCFCE7",
    },
    primary: {
      bg: "#2563EB",
      text: "#FFFFFF",
      border: "#2563EB",
    },
    success: {
      bg: "#ECFDF5",
      text: "#059669",
      border: "#ECFDF5",
    },
    error: {
      bg: "#FEF2F2",
      text: "#DC2626",
      border: "#FEF2F2",
    },
    warning: {
      bg: "#FFF7ED",
      text: "#EA580C",
      border: "#FFF7ED",
    },
    info: {
      bg: "#E5E7EB",
      text: "#374151",
      border: "#E5E7EB",
    },
    pending: {
      bg: "#FFEDD5",
      text: "#C2410C",
      border: "#FFEDD5",
    },
    warningDark: {
      bg: "#FFD54F",
      text: "#514F6E",
      border: "#E6B927",
    },
    coin: {
      bg: "#E86532",
      text: "#fff",
      border: "#E86532",
    },
    amadeus: {
      bg: "#0D66E1",
      text: "#fff",
      border: "#0D66E1",
    },
    webbeds: {
      bg: "#DC1409",
      text: "#fff",
      border: "#DC1409",
    },
    default: {
      bg: "#E5E7EB",
      text: "#4B5563",
      border: "#E5E7EB",
    },
  },

  outlined: {
    active: {
      bg: "#fff",
      text: "#15803D",
      border: "#15803D",
    },
    primary: {
      bg: "#EFF6FF",
      text: "#2563EB",
      border: "#2563EB",
    },
    success: {
      bg: "#ECFDF5",
      text: "#059669",
      border: "#059669",
    },
    error: {
      bg: "#FEF2F2",
      text: "#DC2626",
      border: "#DC2626",
    },
    warning: {
      bg: "#FEFCE8",
      text: "#CA8A04",
      border: "#CA8A04",
    },
    info: {
      bg: "#F3F4F6",
      text: "#4B5563",
      border: "#4B5563",
    },
    pending: {
      bg: "#FFF7ED",
      text: "#EA580C",
      border: "#EA580C",
    },
    warningDark: {
      bg: "#FFD54F",
      text: "#514F6E",
      border: "#E6B927",
    },
    coin: {
      bg: "#FFF7ED",
      text: "#E86532",
      border: "#E86532",
    },
    amadeus: {
      bg: "#EFF6FF",
      text: "#0D66E1",
      border: "#0D66E1",
    },
    webbeds: {
      bg: "#FEF2F2",
      text: "#DC1409",
      border: "#DC1409",
    },
    default: {
      bg: "#F9FAFB",
      text: "#4B5563",
      border: "#4B5563",
    },
  },
};

export default function Chip({
  label,
  variant = "success",
  size = "large",
  type = "outlined",
  leftIcon,
  rightIcon,
  closable,
  onPress,
  onClose,
}: ChipProps) {
  const color = COLORS[type][variant];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: color.bg,
          borderColor: color.border,
          minHeight: size === "small" ? 28 : 34,
          paddingHorizontal: size === "small" ? 8 : 12,
        },
      ]}
    >
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

      <Text style={[styles.label, { color: color.text }]}>{label}</Text>

      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}

      {closable && (
        <Pressable
          hitSlop={8}
          onPress={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          <Text style={[styles.close, { color: color.text }]}>×</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  icon: {
    marginHorizontal: 4,
  },

  close: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
  },
});
