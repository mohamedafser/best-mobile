import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Easing, Text, View } from "react-native";

export default function Loader() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in and scale up the container
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    // Infinite pulsing animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View
      className={`flex-1 items-center justify-center ${
        isDark ? "bg-[#0b0f19]" : "bg-[#f8fafc]"
      }`}
    >
      {/* Background Decorative Gradients/Orbs (Aesthetic Boost) */}
      <View
        className={`absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full opacity-[0.15] ${
          isDark ? "bg-[#3b82f6]" : "bg-[#93c5fd]"
        }`}
        style={{ borderRadius: 9999, filter: "blur(60px)" }}
      />
      <View
        className={`absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full opacity-[0.15] ${
          isDark ? "bg-[#8b5cf6]" : "bg-[#c084fc]"
        }`}
        style={{ borderRadius: 9999, filter: "blur(60px)" }}
      />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center justify-center"
      >
        {/* Modern logo container (Glassmorphic look) */}
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
          className={`p-6 rounded-3xl border ${
            isDark
              ? "bg-[#1e293b]/50 border-white/10"
              : "bg-white/80 border-slate-200"
          } shadow-2xl items-center justify-center mb-8`}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 80, height: 80, borderRadius: 20 }}
            contentFit="contain"
            transition={500}
          />
        </Animated.View>

        {/* Dynamic Loading Text */}
        <Text
          className={`text-xl font-bold tracking-wider mb-2 ${
            isDark ? "text-white" : "text-slate-800"
          }`}
        >
          BEST
        </Text>
        <Text
          className={`text-sm font-medium tracking-wide mb-6 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Starting your experience...
        </Text>

        {/* Beautiful minimalist loader spinner */}
        <View className="flex-row items-center justify-center">
          <ActivityIndicator
            size="small"
            color={isDark ? "#3b82f6" : "#2563eb"}
          />
        </View>
      </Animated.View>
    </View>
  );
}
