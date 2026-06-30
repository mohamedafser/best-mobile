import { useThemeColor } from "@/hooks/use-theme-color";
import { View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  lightColor,
  darkColor,
  className = "",
  style,
  ...props
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <View
      className={className}
      style={[{ backgroundColor }, style]}
      {...props}
    />
  );
}
