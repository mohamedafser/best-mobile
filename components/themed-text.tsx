import { useThemeColor } from "@/hooks/use-theme-color";
import { Text, TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "xsSmall";
};

export function ThemedText({
  className = "",
  lightColor,
  darkColor,
  type = "default",
  style,
  ...rest
}: ThemedTextProps & { className?: string }) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const variants = {
    default: "text-base leading-6",
    defaultSemiBold: "text-base leading-6 font-semibold",
    title: "text-[32px] leading-[32px] font-bold",
    subtitle: "text-xl font-bold",
    link: "text-base leading-[30px] text-[#0a7ea4]",
    xsSmall: "text-xs",
  };

  return (
    <Text
      className={`${variants[type]} ${className}`}
      style={[{ color }, style]}
      {...rest}
    />
  );
}
