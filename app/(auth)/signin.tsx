import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { clearSigninError, signInThunk } from "@/store/slice/authSlice";

const SigninScreen = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearSigninError());
  }, [dispatch]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Focus states for input fields
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const handleSignin = async (): Promise<void> => {
    if (!email || !password) return;
    try {
      await dispatch(
        signInThunk({
          email,

          password,
        }),
      ).unwrap();

      router.replace("/(public)" as any);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${isDark ? "bg-[#0b0f19]" : "bg-[#f8fafc]"}`}
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
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        className="px-6"
      >
        <View className="py-12">
          {/* Logo and Brand Header */}
          <View className="items-center mb-8">
            <View
              className={`p-4 rounded-3xl border ${
                isDark
                  ? "bg-[#1e293b]/40 border-white/10"
                  : "bg-white/80 border-slate-200"
              } shadow-lg items-center justify-center mb-4`}
            >
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ width: 60, height: 60, borderRadius: 15 }}
                contentFit="contain"
              />
            </View>
            <Text
              className={`text-2xl font-black tracking-widest ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              BEST
            </Text>
            <Text
              className={`text-sm mt-1 font-medium ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Sign in to continue to your account
            </Text>
          </View>

          {/* Form Card */}
          <View
            className={`p-6 rounded-3xl border ${
              isDark
                ? "bg-[#1e293b]/20 border-white/5"
                : "bg-white border-slate-100"
            } shadow-xl`}
          >
            <Text
              className={`text-xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Welcome back
            </Text>

            {/* Error Message */}
            {!!error && (
              <View className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex-row items-center">
                <Ionicons
                  name="alert-circle-outline"
                  size={20}
                  color="#ef4444"
                />
                <Text className="ml-2 flex-1 text-sm font-medium text-red-500">
                  {error}
                </Text>
              </View>
            )}

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
                isEmailFocused
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
                  isEmailFocused
                    ? isDark
                      ? "#3b82f6"
                      : "#2563eb"
                    : isDark
                      ? "#64748b"
                      : "#94a3b8"
                }
              />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                className={`flex-1 ml-3 text-base leading-[16px] ${
                  isDark ? "text-white" : "text-slate-850"
                }`}
              />
            </View>

            {/* Password Input */}
            <Text
              className={`text-xs font-semibold mb-2 ml-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Password
            </Text>
            <View
              className={`mb-6 flex-row items-center rounded-2xl border px-4 py-3.5 transition-all ${
                isPasswordFocused
                  ? isDark
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-blue-600 bg-blue-50/20"
                  : isDark
                    ? "border-white/10 bg-slate-900/50"
                    : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={
                  isPasswordFocused
                    ? isDark
                      ? "#3b82f6"
                      : "#2563eb"
                    : isDark
                      ? "#64748b"
                      : "#94a3b8"
                }
              />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className={`flex-1 ml-3 text-base leading-[16px]  ${
                  isDark ? "text-white" : "text-slate-850"
                }`}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={isDark ? "#64748b" : "#94a3b8"}
                />
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSignin}
              disabled={loading}
              activeOpacity={0.8}
              className={`w-full items-center justify-center rounded-2xl py-4 shadow-md ${
                isDark ? "bg-[#2563eb]" : "bg-black"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="font-bold text-base text-white tracking-wide">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Navigation Links */}
          <View className="mt-8 flex-row justify-center items-center">
            <Text
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text
                className={`text-sm font-bold ${
                  isDark ? "text-[#3b82f6]" : "text-[#2563eb]"
                }`}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SigninScreen;
