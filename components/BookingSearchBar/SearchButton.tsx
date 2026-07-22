import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type SearchButtonProps = {
  title?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  compact?: boolean;
  accessibilityLabel?: string;
  className?: string;
};

export default function SearchButton({
  title = "Search Best Stays",
  onPress,
  loading = false,
  disabled = false,
  compact = false,
  accessibilityLabel,
  className = "",
}: SearchButtonProps) {
  const isDisabled = disabled || loading;

  if (compact) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPress={onPress}
        className={`h-11 w-11 items-center justify-center rounded-full bg-[#ff7a45] ${
          isDisabled ? "opacity-50" : ""
        } ${className}`}
        style={({ pressed }) => ({
          opacity: isDisabled ? 0.5 : pressed ? 0.88 : 1,
          transform: [{ scale: pressed && !isDisabled ? 0.96 : 1 }],
        })}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Ionicons name="search" size={20} color="#fff" />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      className={`h-14 flex-row items-center justify-center rounded-xl bg-[#ff7a45] shadow-md ${
        isDisabled ? "opacity-50" : ""
      } ${className}`}
      style={({ pressed }) => ({
        opacity: isDisabled ? 0.5 : pressed ? 0.9 : 1,
        transform: [{ scale: pressed && !isDisabled ? 0.98 : 1 }],
      })}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View className="flex-row items-center gap-2">
          <Ionicons name="search" size={20} color="#fff" />
          <Text className="text-lg font-bold text-white">{title}</Text>
        </View>
      )}
    </Pressable>
  );
}
