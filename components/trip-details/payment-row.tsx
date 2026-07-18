import { Text, View } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";

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
  const C = useThemeColors();

  const valueColor =
    valueStyle === "success"
      ? C.success500
      : valueStyle === "muted"
        ? C.textMuted
        : C.text;

  return (
    <View className="flex-row justify-between mb-3">
      <Text className="text-sm" style={{ color: C.textMuted }}>
        {label}
      </Text>
      <Text className="text-sm font-medium" style={{ color: valueColor }}>
        {value}
      </Text>
    </View>
  );
};
