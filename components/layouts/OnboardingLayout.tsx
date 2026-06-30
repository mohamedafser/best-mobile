import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";

type Props = {
  children: React.ReactNode;
};

export default function OnboardingLayout({ children }: Props) {
  const isDark = useColorScheme() === "dark";

  return (
    <KeyboardAvoidingView
      className={`flex-1 ${isDark ? "bg-[#0b0f19]" : "bg-[#f8fafc]"}`}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Dynamic Background Decorative Orbs */}
      <View
        className={`absolute top-[-10%] left-[-10%] w-[90vw] h-[90vw] rounded-full opacity-[0.12] ${
          isDark ? "bg-[#3b82f6]" : "bg-[#93c5fd]"
        }`}
        style={{ borderRadius: 9999, filter: "blur(60px)" }}
      />
      <View
        className={`absolute bottom-[-5%] right-[-10%] w-[90vw] h-[90vw] rounded-full opacity-[0.12] ${
          isDark ? "bg-[#8b5cf6]" : "bg-[#c084fc]"
        }`}
        style={{ borderRadius: 9999, filter: "blur(60px)" }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {/* Form Card */}
        <View
          className={`p-6 rounded-3xl border ${
            isDark
              ? "bg-[#1e293b]/20 border-white/5"
              : "bg-white border-slate-100"
          } shadow-xl`}
        >
          <Text
            className={`text-xl font-bold mb-2 text-center ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Welcome to Onboarding!
          </Text>
          <Text
            className={`text-sm mb-6 text-center ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Please complete the steps below to get started.
          </Text>

          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
