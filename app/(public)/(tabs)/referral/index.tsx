import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { showErrorToast } from "@/lib/utils/toast";
import {
  CreateReferralData,
  createReferralSchema,
} from "@/lib/validators/referral";
import {
  clearSuccess,
  createReferralThunk,
} from "@/store/slice/referrals.slice";

// Type definitions
interface StepCardProps {
  number: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  title: string;
  desc: string;
}

const COLORS = {
  primary: "#a73a05",
  primaryContainer: "#ff7a45",
  surface: "#fff8f6",
  surfaceCard: "#fffbf9",
  surfaceSoft: "#f5eeeb",
  textSecondary: "#4d4743",
  textTertiary: "#7a736e",
  onSurface: "#251915",
  outlineVariant: "#dfc0b5",
  secondaryContainer: "#fd8363",
} as const;

const InviteEarnScreen: React.FC = () => {
  const { loading, success, error } = useAppSelector(
    (state) => state.referrals,
  );
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReferralData>({
    resolver: zodResolver(createReferralSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: CreateReferralData) => {
    try {
      await dispatch(
        createReferralThunk({
          referee_email: data.email,
        }),
      ).unwrap();
      resetReferral();
    } catch (error: any) {
      showErrorToast(error || "Failed to send referral");
    }
  };

  const resetReferral = () => {
    reset({ email: "" });
    setTimeout(() => {
      dispatch(clearSuccess());
    }, 5000);
  };
  return (
    <View className="flex-1 bg-[#fff8f6]">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View className="mt-6 relative h-64 w-full rounded-3xl overflow-hidden shadow-sm">
          <Image
            source={require("../../../../assets/images/referral-banner.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-2xl flex-row items-center shadow-md">
            <View className="bg-[#fd8363] p-2 rounded-full mr-3">
              <MaterialIcons name="workspace-premium" size={24} color="white" />
            </View>
            <View>
              <Text className="text-lg font-bold text-[#a73a05]">
                Give 1,000 Coins
              </Text>
              <Text className="text-lg font-bold text-[#a73a05]">
                Get 1,000 Coins
              </Text>
            </View>
          </View>
        </View>

        {/* Text Intro */}
        <View className="mt-8">
          <Text className="text-3xl font-bold text-[#a73a05] mb-2 leading-tight">
            Win Cashback with Friends
          </Text>
          <Text className="text-base text-[#4d4743] leading-6">
            Earn 1000 coins when your friend accepts your referral — and they’ll
            get 1000 coins too.
          </Text>
        </View>

        {/* Referral Box */}
        <View className="mt-8 mb-4 bg-white p-6 rounded-2xl border border-[#f5eeeb] shadow-sm">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email Address"
                value={value}
                onChangeText={onChange}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={
                  <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                }
                error={errors.email?.message}
              />
            )}
          />
          {success && (
            <View className="flex-row items-center gap-x-1.5 p-3 bg-white border border-gray-200 rounded-[6px] shadow-md">
              <MaterialIcons
                name="check-circle-outline"
                size={20}
                color="#16A34A"
              />
              <Text className="text-gray-800 text-sm font-medium">
                Referral Sent
              </Text>
            </View>
          )}
        </View>

        {/* Action Button */}
        <Button
          loading={loading}
          fullWidth={true}
          title="Send Invite"
          onPress={handleSubmit(onSubmit)}
        />

        {/* Steps Section */}
        <View className="mt-12 mb-24">
          <Text className="text-2xl font-bold text-[#251915] mb-6">
            How it Works
          </Text>

          <StepCard
            number="1"
            iconName="send"
            title="Refer a Friend"
            desc="Invite your friends by sharing your referral link via email. Anyone with the link can use it to join."
          />
          <StepCard
            number="2"
            iconName="hotel"
            title="Friend Signs Up"
            desc="When your friend signs up using your referral link, 1000 coins will be instantly credited to their account."
          />
          <StepCard
            number="3"
            iconName="card-giftcard"
            title="Both Earn Cashback"
            desc="Once your friend successfully signs up through your referral link, you’ll receive 1000 coins as a referral reward."
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Sub-component for the How-it-works cards
const StepCard: React.FC<StepCardProps> = ({
  number,
  iconName,
  title,
  desc,
}) => (
  <View className="bg-white p-6 rounded-2xl border border-[#f5eeeb] mb-4 flex-row items-start">
    <View className="w-10 h-10 bg-[#f5ded6] rounded-full items-center justify-center mr-4">
      <Text className="text-[#a73a05] font-bold">{number}</Text>
    </View>
    <View className="flex-1">
      <View className="flex-row items-center mb-1">
        <MaterialIcons name={iconName} size={20} color={COLORS.primary} />
        <Text className="ml-2 text-lg font-bold text-[#251915]">{title}</Text>
      </View>
      <Text className="text-[#4d4743] text-sm leading-5">{desc}</Text>
    </View>
  </View>
);

export default InviteEarnScreen;
