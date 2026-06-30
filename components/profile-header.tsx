import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/hooks/redux";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import Avatar from "./ui/avatar";

type ProfileHeaderProps = {
  image?: string;
  avatarSize?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function ProfileHeader({
  image,
  avatarSize = 100,
  className = "",
  children,
}: ProfileHeaderProps) {
  const { loading, error, userProfile } = useAppSelector(
    (state) => state.userProfile,
  );
  if (loading)
    return (
      <ThemedView className="flex items-center justify-center py-4">
        <ActivityIndicator size={16} color={Colors.light.text} />
      </ThemedView>
    );
  if (error)
    return (
      <ThemedView className="flex items-center justify-center py-4">
        <ThemedText className="text-red-500">{error}</ThemedText>
      </ThemedView>
    );
  return (
    <ThemedView className={`items-center justify-center py-4 ${className}`}>
      <Avatar
        image={image}
        name={`${userProfile?.first_name} ${userProfile?.last_name}`}
        size={avatarSize}
      />

      <ThemedText className="mt-4 text-xl font-semibold">{`${userProfile?.first_name} ${userProfile?.last_name}`}</ThemedText>

      <ThemedText className="mt-1 text-sm text-neutral-500">
        {userProfile?.email}
      </ThemedText>

      {children && <View className="mt-4">{children}</View>}
    </ThemedView>
  );
}
