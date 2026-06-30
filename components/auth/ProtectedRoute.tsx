import React, { useEffect } from "react";

import { router } from "expo-router";

import { ActivityIndicator, View } from "react-native";

import { useAppSelector } from "@/hooks/redux";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props): React.JSX.Element => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/signin");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
