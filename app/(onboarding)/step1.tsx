import { CountriesDropdown, InternationalPhoneInput } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setCountry, setMobileNumber } from "@/store/slice/onboarding-slice";
import React from "react";
import { View } from "react-native";

const Step1: React.FC = () => {
  const { country, mobileNumber } = useAppSelector((state) => state.onboarding);
  const dispatch = useAppDispatch();

  return (
    <View className="flex-col gap-4">
      <CountriesDropdown
        selectedCountry={country}
        onChange={(country: any) => dispatch(setCountry(country))}
      />
      <InternationalPhoneInput
        selectedCountry={country}
        value={mobileNumber}
        disabled={!Boolean(country)}
        onChange={(phone: string, dialCode: string) =>
          dispatch(setMobileNumber({ phone, dialCode }))
        }
      />
    </View>
  );
};

export default Step1;
