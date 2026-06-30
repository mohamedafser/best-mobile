import React, { useRef } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export default function OTPInput({
  value,
  onChange,
  length = 6,
}: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    const otp = text.replace(/\D/g, "").slice(0, length);
    onChange(otp);
  };

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        caretHidden
        className="absolute opacity-0"
      />

      <View className="flex-row justify-center gap-3">
        {Array.from({ length }).map((_, index) => {
          const digit = value[index] || "";
          const isActive = index === value.length;

          return (
            <View
              key={index}
              className={`h-14 w-14 items-center justify-center rounded-xl border ${
                isActive ? "border-slate-500" : "border-slate-300"
              }`}
            >
              <Text className="text-xl font-semibold text-slate-100">
                {digit}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}
