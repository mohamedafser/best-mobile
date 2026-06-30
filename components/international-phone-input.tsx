import { getCountryCallingCode } from "libphonenumber-js";
import React from "react";
import { Text, TextInput, View } from "react-native";

type InternationalPhoneInputProps = {
  label?: string;
  value: string;
  onChange: (value: string, dialCode: string) => void;
  selectedCountry: any;
  error?: string;
  disabled?: boolean;
};

export default function InternationalPhoneInput({
  label = "Phone Number",
  value,
  onChange,
  selectedCountry,
  error,
  disabled = false,
}: InternationalPhoneInputProps) {
  const dialCode = `+${getCountryCallingCode(
    (selectedCountry?.id as any) || "US",
  )}`;

  const getFlagEmoji = (countryCode: string) =>
    countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0)),
      );

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-slate-700">{label}</Text>

      <View
        className={`flex-row items-center rounded-2xl border bg-transparent px-4 py-4 ${
          error ? "border-red-500" : "border-slate-300"
        } ${disabled ? "opacity-50" : ""}`}
      >
        <View className="mr-3 flex-row items-center">
          <Text className="text-base font-semibold text-slate-300">
            {getFlagEmoji(selectedCountry?.id || "US")}
            {dialCode}
          </Text>
        </View>

        <View className="mr-3 h-6 w-px bg-slate-300" />

        <TextInput
          value={value}
          editable={!disabled}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          placeholderTextColor="#94A3B8"
          onChangeText={(text) => {
            const numbersOnly = text.replace(/[^0-9]/g, "");
            onChange(numbersOnly, dialCode);
          }}
          className="flex-1 text-base text-slate-300"
          style={{ lineHeight: 16, height: 20, paddingVertical: 0 }}
        />
      </View>

      {!!error && <Text className="text-xs text-red-500">{error}</Text>}
    </View>
  );
}
