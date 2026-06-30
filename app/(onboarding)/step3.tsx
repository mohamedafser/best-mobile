import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import {
  setFamilyEmailOne,
  setFamilyEmailThree,
  setFamilyEmailTwo,
} from "@/store/slice/onboarding-slice";
import { Ionicons } from "@expo/vector-icons";

const Step3 = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const isDark = useColorScheme() === "dark";
  const { familyEmailOne, familyEmailTwo, familyEmailThree } = useAppSelector(
    (state) => state.onboarding,
  );
  const [isEmailOneFocused, setIsEmailOneFocused] = useState<boolean>(false);
  const [isEmailTwoFocused, setIsEmailTwoFocused] = useState<boolean>(false);
  const [isEmailThreeFocused, setIsEmailThreeFocused] =
    useState<boolean>(false);

  return (
    <View className="flex-1 justify-center ">
      {/* Email Input */}
      <Text
        className={`text-xs font-semibold mb-2 ml-1 ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        Email Address
      </Text>
      <View
        className={`mb-4 flex-row items-center rounded-2xl border px-4 py-3.5 transition-all ${
          isEmailOneFocused
            ? isDark
              ? "border-blue-500 bg-blue-500/5"
              : "border-blue-600 bg-blue-50/20"
            : isDark
              ? "border-white/10 bg-slate-900/50"
              : "border-slate-200 bg-slate-50/50"
        }`}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={
            isEmailOneFocused
              ? isDark
                ? "#3b82f6"
                : "#2563eb"
              : isDark
                ? "#64748b"
                : "#94a3b8"
          }
        />
        <TextInput
          placeholder="Enter family member 1 email"
          placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
          value={familyEmailOne}
          onChangeText={(value) => dispatch(setFamilyEmailOne(value))}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsEmailOneFocused(true)}
          onBlur={() => setIsEmailOneFocused(false)}
          className={`flex-1 ml-3 text-base ${
            isDark ? "text-white" : "text-slate-850"
          }`}
        />
      </View>

      <View
        className={`mb-4 flex-row items-center rounded-2xl border px-4 py-3.5 transition-all ${
          isEmailTwoFocused
            ? isDark
              ? "border-blue-500 bg-blue-500/5"
              : "border-blue-600 bg-blue-50/20"
            : isDark
              ? "border-white/10 bg-slate-900/50"
              : "border-slate-200 bg-slate-50/50"
        }`}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={
            isEmailTwoFocused
              ? isDark
                ? "#3b82f6"
                : "#2563eb"
              : isDark
                ? "#64748b"
                : "#94a3b8"
          }
        />
        <TextInput
          placeholder="Enter family member 2 email"
          placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
          value={familyEmailTwo}
          onChangeText={(value) => dispatch(setFamilyEmailTwo(value))}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsEmailTwoFocused(true)}
          onBlur={() => setIsEmailTwoFocused(false)}
          className={`flex-1 ml-3 text-base ${
            isDark ? "text-white" : "text-slate-850"
          }`}
        />
      </View>

      <View
        className={`mb-4 flex-row items-center rounded-2xl border px-4 py-3.5 transition-all ${
          isEmailThreeFocused
            ? isDark
              ? "border-blue-500 bg-blue-500/5"
              : "border-blue-600 bg-blue-50/20"
            : isDark
              ? "border-white/10 bg-slate-900/50"
              : "border-slate-200 bg-slate-50/50"
        }`}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={
            isEmailThreeFocused
              ? isDark
                ? "#3b82f6"
                : "#2563eb"
              : isDark
                ? "#64748b"
                : "#94a3b8"
          }
        />
        <TextInput
          placeholder="Enter family member 3 email"
          placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
          value={familyEmailThree}
          onChangeText={(value) => dispatch(setFamilyEmailThree(value))}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsEmailThreeFocused(true)}
          onBlur={() => setIsEmailThreeFocused(false)}
          className={`flex-1 ml-3 text-base ${
            isDark ? "text-white" : "text-slate-850"
          }`}
        />
      </View>
    </View>
  );
};

export default Step3;
