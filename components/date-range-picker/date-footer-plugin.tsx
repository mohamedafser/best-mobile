import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type DateFooterPluginProps = {
  onDone: () => void;
  onCancel: () => void;
  disabled?: boolean;
};

export default function DateFooterPlugin({
  onDone,
  onCancel,
  disabled,
}: DateFooterPluginProps) {
  return (
    <View className="mt-2 flex-row items-center justify-between rounded-b-2xl bg-white px-2 py-2">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onCancel}
        className="px-2 py-2"
      >
        <Text className="text-sm font-medium text-[#1A1A1A]">Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={onDone}
        className={`h-[35px] min-w-[100px] items-center justify-center rounded-full px-4 ${
          disabled ? "bg-[#E6DED8]" : "bg-[#4D4743]"
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            disabled ? "text-[#7A736E]" : "text-white"
          }`}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
}
