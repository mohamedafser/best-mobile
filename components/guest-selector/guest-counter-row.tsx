import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type GuestCounterRowProps = {
  label: string;
  sublabel?: string;
  count: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function GuestCounterRow({
  label,
  sublabel,
  count,
  min = 0,
  max,
  onIncrement,
  onDecrement,
}: GuestCounterRowProps) {
  const canDecrement = count > min;
  const canIncrement = max === undefined || count < max;

  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-1 pr-3">
        <Text className="text-sm font-medium text-[#1d1b1a]">{label}</Text>
        {!!sublabel && (
          <Text className="mt-0.5 text-xs text-[#85736d]">{sublabel}</Text>
        )}
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={onDecrement}
          disabled={!canDecrement}
          hitSlop={8}
          className={`h-[26px] w-[26px] items-center justify-center rounded-full ${
            canDecrement ? "opacity-100" : "opacity-30"
          }`}
        >
          <Ionicons name="remove-circle-outline" size={26} color="#4D4743" />
        </TouchableOpacity>

        <Text className="min-w-[24px] text-center text-base font-semibold text-[#1d1b1a]">
          {count}
        </Text>

        <TouchableOpacity
          onPress={onIncrement}
          disabled={!canIncrement}
          hitSlop={8}
          className={`h-[26px] w-[26px] items-center justify-center rounded-full ${
            canIncrement ? "opacity-100" : "opacity-30"
          }`}
        >
          <Ionicons name="add-circle-outline" size={26} color="#4D4743" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
