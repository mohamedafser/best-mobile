import { CountdownTimer, OTPInput } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { showErrorToast } from "@/lib/utils/toast";
import {
  resendOtpThunk,
  setOtp,
  setResendOtp,
} from "@/store/slice/onboarding-slice";
import React from "react";
import { Text, View } from "react-native";

const Step2: React.FC = () => {
  const { otp, isResendOtp, mobileNumber, dialCode } = useAppSelector(
    (state) => state.onboarding,
  );
  const dispatch = useAppDispatch();
  const isDark = useColorScheme() === "dark";

  return (
    <>
      <Text
        className={`text-xl font-bold mb-2 text-center ${
          isDark ? "text-white" : "text-slate-800"
        }`}
      >
        OTP Verification
      </Text>
      <Text
        className={`text-sm mb-6 text-center ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        We have sent a OTP to your mobile number
      </Text>
      <View className="mb-4">
        <OTPInput
          value={otp}
          onChange={(otp: string) => dispatch(setOtp(otp))}
          length={6}
        />
      </View>
      {!isResendOtp && (
        <View className="flex-row items-center justify-center gap-1">
          <Text className="text-sm font-normal text-slate-400 ">
            OTP expires in
          </Text>
          <CountdownTimer
            className="text-sm font-bold text-slate-400 "
            onComplete={() => {
              showErrorToast("OTP expired. Please resend the OTP.");
              dispatch(setResendOtp());
            }}
          />
        </View>
      )}

      {isResendOtp && (
        <Text className="flex-row text-sm font-normal text-gray-500 text-center mt-6">
          OTP expired.{" "}
          <Text
            className="text-sm font-medium text-black cursor-pointer ml-1 underline"
            onPress={() =>
              dispatch(resendOtpThunk({ phone: `${dialCode}${mobileNumber}` }))
            }
          >
            Resend OTP
          </Text>
        </Text>
      )}
    </>
  );
};

export default Step2;
