import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
};

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerClassName = "",
  className = "",
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="mb-2 ml-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center rounded-2xl border px-4 py-3.5
        ${
          isFocused
            ? "border-blue-500 bg-blue-50/20 dark:bg-blue-500/5"
            : "border-slate-200 bg-slate-50/50 dark:border-white/10 dark:bg-slate-900/50"
        }`}
      >
        {leftIcon}

        <TextInput
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor="#94a3b8"
          className={`flex-1 ml-3 text-base text-slate-900 dark:text-white leading-[16px] ${className}`}
        />

        {rightIcon}
      </View>

      {error && <Text className="mt-1 ml-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
}

// REFERENCE FOR PASSWORD INPUT
// const [secure, setSecure] = useState(true);

// <Input
//   label="Password"
//   value={password}
//   onChangeText={setPassword}
//   secureTextEntry={secure}
//   placeholder="Enter password"
//   leftIcon={
//     <Ionicons
//       name="lock-closed-outline"
//       size={20}
//       color="#94a3b8"
//     />
//   }
//   rightIcon={
//     <TouchableOpacity
//       onPress={() => setSecure(!secure)}
//     >
//       <Ionicons
//         name={secure ? "eye-off-outline" : "eye-outline"}
//         size={20}
//         color="#94a3b8"
//       />
//     </TouchableOpacity>
//   }
// />
