import { Stepper } from "@/components";
import { OnboardingLayout } from "@/components/layouts";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { isValidEmail } from "@/lib/utils/validation";
import {
  registerThunk,
  sendOtpThunk,
  setError,
  setStep,
  verifyOtpThunk,
} from "@/store/slice/onboarding-slice";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

export default function StepOneScreen(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const {
    loading,
    error,
    country,
    mobileNumber,
    dialCode,
    step,
    otp,
    familyEmailOne,
    familyEmailTwo,
    familyEmailThree,
  } = useAppSelector((state) => state.onboarding);
  const dispatch = useAppDispatch();

  const handleStepOne = () => {
    if (isValidPhoneNumber(mobileNumber, country?.id as any)) {
      dispatch(setError(null));
      dispatch(sendOtpThunk({ phone: `${dialCode}${mobileNumber}` }));
    } else {
      dispatch(setError("Invalid phone number"));
    }
  };

  const handleStepTwo = () => {
    if (otp.length === 6) {
      dispatch(setError(null));
      dispatch(verifyOtpThunk({ phone: `${dialCode}${mobileNumber}`, otp }));
    } else {
      dispatch(setError("Invalid OTP"));
    }
  };

  const validateEmails = useCallback(() => {
    const newErrors: any = {};

    if (familyEmailOne.trim() && !isValidEmail(familyEmailOne)) {
      newErrors.familyEmailOne = "Invalid family email one";
    }

    if (familyEmailTwo.trim() && !isValidEmail(familyEmailTwo)) {
      newErrors.familyEmailTwo = "Invalid family email two";
    }
    if (familyEmailThree.trim() && !isValidEmail(familyEmailThree)) {
      newErrors.familyEmailThree = "Invalid family email three";
    }

    if (Object.keys(newErrors).length > 0) {
      dispatch(setError(Object.values(newErrors)[0] as string));
      return false;
    }

    return true;
  }, [familyEmailOne, familyEmailTwo, familyEmailThree, dispatch]);

  const handleStepThree = () => {
    const familyEmails = [
      familyEmailOne,
      familyEmailTwo,
      familyEmailThree,
    ].filter(Boolean);

    if (familyEmails.length && !validateEmails()) return;
    dispatch(setError(null));
    const data = {
      country_id: country?.value?.uuid,
      ...(familyEmails.length ? { family_emails: familyEmails } : {}),
      phone_number: `${dialCode}${mobileNumber}`,
    };
    dispatch(registerThunk(data));
  };

  const buttonAction = {
    1: handleStepOne,
    2: handleStepTwo,
    3: handleStepThree,
  };
  console.log("country", country);

  const continueDisabled = step === 1 && (!country || !mobileNumber);
  return (
    <OnboardingLayout>
      <Stepper steps={3} activeStep={step} />
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}

      {!!error && (
        <Text className="text-sm font-medium text-red-500">{error}</Text>
      )}
      <View className="flex-row items-center justify-center gap-2 mt-10">
        {step === 2 && (
          <TouchableOpacity
            onPress={() => dispatch(setStep(1))}
            activeOpacity={0.8}
            className={`w-fit items-center justify-center rounded-2xl px-6 py-4 shadow-md ${
              isDark ? "bg-[#2563eb]" : "bg-black"
            }`}
          >
            <Text className="font-bold text-base text-white tracking-wide">
              Back
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => buttonAction[step]?.()}
          disabled={continueDisabled}
          activeOpacity={0.8}
          className={`w-fit items-center justify-center rounded-2xl px-6 py-4 shadow-md ${
            isDark ? "bg-[#2563eb]" : "bg-black"
          } ${continueDisabled ? "opacity-50" : ""}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="font-bold text-base text-white tracking-wide">
              {step === 3 ? "Submit" : "Continue"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </OnboardingLayout>
  );
}
