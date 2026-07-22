import React from "react";
import { Pressable, Text, View } from "react-native";

type BookingSearchFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  className?: string;
};

export default function BookingSearchField({
  label,
  value,
  placeholder = "Add details",
  leftIcon,
  rightIcon,
  active = false,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  className = "",
}: BookingSearchFieldProps) {
  const displayValue = value.trim() || placeholder;
  const isPlaceholder = !value.trim();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? `${label}: ${displayValue}`}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      className={`rounded-xl border p-3 ${
        active
          ? "border-[#ff7a45]/40 bg-white shadow-sm"
          : "border-gray-100 bg-[#fdf8f6]"
      } ${className}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.92 : 1,
        transform: [{ scale: pressed ? 0.995 : 1 }],
      })}
    >
      <View className="flex-row items-center gap-2">
        {leftIcon}

        <View className="flex-1">
          <Text className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#85736d]">
            {label}
          </Text>
          <Text
            className={`text-sm font-bold ${
              isPlaceholder ? "text-[#85736d]" : "text-[#1d1b1a]"
            }`}
            numberOfLines={1}
          >
            {displayValue}
          </Text>
        </View>

        {rightIcon}
      </View>
    </Pressable>
  );
}
