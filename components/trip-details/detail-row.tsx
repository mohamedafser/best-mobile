import { Text, View } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";

type DetailRowProps = {
  label: string;
  value: string;
};

export const DetailRow = ({ label, value }: DetailRowProps) => {
  const C = useThemeColors();

  return (
    <View className="w-1/2 mb-5">
      <Text className="text-xs font-semibold mb-2" style={{ color: C.brand500 }}>
        {label}
      </Text>
      <Text className="text-sm font-medium" style={{ color: C.text }}>
        {value}
      </Text>
    </View>
  );
};
