import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCountdown } from "./use-countdown";

type Props = {
  duration?: number;
  onComplete?: () => void;
  persistKey?: string;
  isReset?: boolean;
  className?: string;
};

const CountdownTimer = ({
  duration = 600,
  onComplete,
  persistKey,
  isReset = false,
  className = "text-3xl font-bold text-slate-900",
}: Props) => {
  const { timeLeft, reset } = useCountdown({
    duration,
    onComplete,
    persistKey,
  });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View className="items-center gap-4">
      <Text className={className}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </Text>

      {isReset && (
        <TouchableOpacity
          onPress={reset}
          className="rounded-xl bg-black px-4 py-2"
        >
          <Text className="font-medium text-white">Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CountdownTimer;
