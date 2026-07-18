import React from "react";
import { Text, View } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";

type SectionBlockProps = {
  title: string;
  children: React.ReactNode;
};

export const SectionBlock = ({ title, children }: SectionBlockProps) => {
  const C = useThemeColors();

  return (
    <View>
      <Text className="text-base font-bold mb-4" style={{ color: C.text }}>
        {title}
      </Text>
      {children}
    </View>
  );
};
