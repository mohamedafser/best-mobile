import { Colors } from "@/constants/theme";
import { Text, useColorScheme, View } from "react-native";

type DetailRowProps = {
  label: string;
  value: string;
};

export const DetailRow = ({ label, value }: DetailRowProps) => {
  const colorScheme = useColorScheme();
  const c = Colors[colorScheme as "dark" | "light"];

  return (
    <View className="w-1/2 mb-5">
      <Text
        className="text-xs font-semibold mb-2"
        style={{ color: c.brand500 }}
      >
        {label}
      </Text>
      <Text className="text-sm font-medium" style={{ color: c.gray900 }}>
        {value}
      </Text>
    </View>
  );
};
