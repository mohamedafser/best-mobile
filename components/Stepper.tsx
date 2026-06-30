import React from "react";
import { View } from "react-native";

interface StepperProps {
  steps: number;
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <View className="flex-row items-center justify-center gap-1 py-4">
      {Array.from({ length: steps }, (_, index) => {
        const isActive = index + 1 <= activeStep;

        return (
          <View
            key={index}
            className={`h-2 w-8 rounded-full ${
              isActive ? "bg-[#2563eb]" : "bg-[#f2ece7]"
            }`}
          />
        );
      })}
    </View>
  );
};

export default Stepper;
