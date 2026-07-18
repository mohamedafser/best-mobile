import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: {
    container: "bg-[#ff7a45]",
    text: "text-white",
  },
  secondary: {
    container: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-900 dark:text-white",
  },
  outline: {
    container: "border border-slate-300 dark:border-slate-700",
    text: "text-slate-900 dark:text-white",
  },
  danger: {
    container: "bg-red-500/10",
    text: "text-red-600",
  },
  ghost: {
    container: "bg-transparent",
    text: "text-slate-900 dark:text-white",
  },
};

const sizeStyles = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-5 py-4",
};

export default function Button({
  title,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const styles = variantStyles[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center rounded-full
        ${sizeStyles[size]}
        ${styles.container}
        ${fullWidth ? "w-full" : "self-start"}
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {leftIcon && <View>{leftIcon}</View>}

          <Text className={`mx-2 text-base font-semibold ${styles.text}`}>
            {title}
          </Text>

          {rightIcon && <View>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}

// BUTTON USAGES
{
  /* <Button
  title="Logout"
  variant="danger"
  leftIcon={
    <Ionicons
      name="log-out-outline"
      size={20}
      color="#dc2626"
    />
  }
  onPress={handleLogout}
/> */
}
