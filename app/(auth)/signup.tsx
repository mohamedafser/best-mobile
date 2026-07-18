import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { SignupFormData, signupSchema } from "@/lib/validators/auth";
import { clearSignupError, signUpThunk } from "@/store/slice/authSlice";

const SignupScreen = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearSignupError());
  }, [dispatch]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Focus states for input fields
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignupFormData): Promise<void> => {
    try {
      await dispatch(
        signUpThunk({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
          terms_accepted: data.termsAccepted,
        }),
      ).unwrap();
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
              Create an account to get started
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
              Get Started
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

            {/* First & Last Name side-by-side */}
            <View className="flex-row mb-4 gap-x-3">
              {/* First Name */}
              <View className="flex-1">
                <Text
                  className={`text-xs font-semibold mb-2 ml-1 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  First Name
                </Text>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <View
                        className={`flex-row items-center rounded-2xl border px-3 py-3 transition-all ${
                          focusedField === "firstName"
                            ? isDark
                              ? "border-blue-500 bg-blue-500/5"
                              : "border-blue-600 bg-blue-50/20"
                            : isDark
                              ? "border-white/10 bg-slate-900/50"
                              : "border-slate-200 bg-slate-50/50"
                        }`}
                      >
                        <TextInput
                          placeholder="First Name"
                          placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                          value={value}
                          onChangeText={onChange}
                          onFocus={() => setFocusedField("firstName")}
                          onBlur={() => setFocusedField(null)}
                          className={`flex-1 text-base leading-[16px] ${
                            isDark ? "text-white" : "text-slate-850"
                          }`}
                        />
                      </View>
                      {errors.firstName && (
                        <Text className="mt-1 ml-1 text-xs text-red-500">
                          {errors.firstName.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              {/* Last Name */}
              <View className="flex-1">
                <Text
                  className={`text-xs font-semibold mb-2 ml-1 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Last Name
                </Text>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <View
                        className={`flex-row items-center rounded-2xl border px-3 py-3 transition-all ${
                          focusedField === "lastName"
                            ? isDark
                              ? "border-blue-500 bg-blue-500/5"
                              : "border-blue-600 bg-blue-50/20"
                            : isDark
                              ? "border-white/10 bg-slate-900/50"
                              : "border-slate-200 bg-slate-50/50"
                        }`}
                      >
                        <TextInput
                          placeholder="Last Name"
                          placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                          value={value}
                          onChangeText={onChange}
                          onFocus={() => setFocusedField("lastName")}
                          onBlur={() => setFocusedField(null)}
                          className={`flex-1 text-base leading-[16px] ${
                            isDark ? "text-white" : "text-slate-850"
                          }`}
                        />
                      </View>
                      {errors.lastName && (
                        <Text className="mt-1 ml-1 text-xs text-red-500">
                          {errors.lastName.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
            </View>

            {/* Email Input */}
            <Text
              className={`text-xs font-semibold mb-2 ml-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Email Address
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <View
                    className={`flex-row items-center rounded-2xl border px-4 py-3.5 transition-all ${
                      focusedField === "email"
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
                        focusedField === "email"
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
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`flex-1 ml-3 text-base leading-[16px] ${
                        isDark ? "text-white" : "text-slate-850"
                      }`}
                    />
                  </View>
                  {errors.email && (
                    <Text className="mt-1 ml-1 text-xs text-red-500">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Password Input */}
            <Text
              className={`text-xs font-semibold mb-2 ml-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <View
                    className={`flex-row items-center rounded-2xl border px-4 py-3.5 transition-all ${
                      focusedField === "password"
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
                        focusedField === "password"
                          ? isDark
                            ? "#3b82f6"
                            : "#2563eb"
                          : isDark
                            ? "#64748b"
                            : "#94a3b8"
                      }
                    />
                    <TextInput
                      placeholder="Enter password"
                      placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className={`flex-1 ml-3 text-base leading-[16px] ${
                        isDark ? "text-white" : "text-slate-850"
                      }`}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={isDark ? "#64748b" : "#94a3b8"}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="mt-1 ml-1 text-xs text-red-500">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Confirm Password Input */}
            <Text
              className={`text-xs font-semibold mb-2 ml-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Confirm Password
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <View className="mb-6">
                  <View
                    className={`flex-row items-center rounded-2xl border px-4 py-3.5 transition-all ${
                      focusedField === "confirmPassword"
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
                        focusedField === "confirmPassword"
                          ? isDark
                            ? "#3b82f6"
                            : "#2563eb"
                          : isDark
                            ? "#64748b"
                            : "#94a3b8"
                      }
                    />
                    <TextInput
                      placeholder="Re-enter password"
                      placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showConfirmPassword}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField(null)}
                      className={`flex-1 ml-3 text-base leading-[16px] ${
                        isDark ? "text-white" : "text-slate-850"
                      }`}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color={isDark ? "#64748b" : "#94a3b8"}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text className="mt-1 ml-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Terms Accepted Checkbox */}
            <Controller
              control={control}
              name="termsAccepted"
              render={({ field: { onChange, value } }) => (
                <View className="mb-6 ml-1">
                  <TouchableOpacity
                    onPress={() => onChange(!value)}
                    activeOpacity={0.8}
                    className="flex-row items-start"
                  >
                    <View
                      className={`mr-3 h-5.5 w-5.5 rounded-lg border items-center justify-center transition-all ${
                        value
                          ? isDark
                            ? "bg-blue-500 border-blue-500"
                            : "bg-black border-black"
                          : isDark
                            ? "bg-slate-900/50 border-white/10"
                            : "bg-slate-50/50 border-slate-350"
                      }`}
                    >
                      {value && (
                        <Ionicons name="checkmark" size={14} color="#ffffff" />
                      )}
                    </View>

                    <Text
                      className={`flex-1 text-sm ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      I accept the{" "}
                      <Text
                        className={`font-semibold ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Terms & Conditions
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  {errors.termsAccepted && (
                    <Text className="mt-2 ml-1 text-xs text-red-500">
                      {errors.termsAccepted.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
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
                  Sign Up
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
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
              <Text
                className={`text-sm font-bold ${
                  isDark ? "text-[#3b82f6]" : "text-[#2563eb]"
                }`}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
