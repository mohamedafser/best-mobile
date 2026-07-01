import { Colors } from "@/constants/theme";
import React from "react";
import { Text, useColorScheme, View } from "react-native";

type SectionBlockProps = {
  title: string;
  children: React.ReactNode;
};

export const SectionBlock = ({ title, children }: SectionBlockProps) => {
  const colorScheme = useColorScheme();
  const c = Colors[colorScheme as "dark" | "light"];

  return (
    <View>
      <Text
        className="text-base font-bold mb-4"
        style={{ color: c.gray900 }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
};
