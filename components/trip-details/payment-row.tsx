import { Colors } from "@/constants/theme";
import { Text, useColorScheme, View } from "react-native";

type PaymentRowProps = {
  label: string;
  value: string;
  valueStyle?: "default" | "success" | "muted";
};

export const PaymentRow = ({
  label,
  value,
  valueStyle = "default",
}: PaymentRowProps) => {
  const colorScheme = useColorScheme();
  const c = Colors[colorScheme as "dark" | "light"];

  const valueColor =
    valueStyle === "success"
      ? c.success600
      : valueStyle === "muted"
        ? c.gray600
        : c.gray900;

  return (
    <View className="flex-row justify-between mb-3">
      <Text className="text-sm" style={{ color: c.gray600 }}>
        {label}
      </Text>
      <Text className="text-sm font-medium" style={{ color: valueColor }}>
        {value}
      </Text>
    </View>
  );
};
