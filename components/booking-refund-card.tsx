import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type RefundType = "full" | "partial" | "none";

type BookingRefundCardProps = {
  type: RefundType;
  hotelName: string;
  dateRange: string;
  totalPrice: number | string;
  roomPrice: number | string;
  taxes: number | string;
  cancellationFee: number | string;
  refundAmount: number | string;
  image: string;
  refundUntilDate: string;
  isLoadingCancel?: boolean;
  onCancel: () => void;
  onKeep: () => void;
};

const TYPE_CONFIG = {
  full: {
    title: "Full Refund Eligible",
    titleColor: "text-green-600",
    bg: "bg-green-50",
    bgText: "text-zinc-800",
    message: "You'll get a full refund",
    note: "Refund within 5–7 business days",
    buttonText: "Cancel & Get full refund",
    refundAmountTextColor: "text-green-600",
  },
  partial: {
    title: "Partial Refund Applies",
    titleColor: "text-orange-500",
    bg: "bg-orange-50",
    bgText: "text-orange-600",
    message: "You'll get a Partial refund",
    note: "Refund within 5–7 business days",
    buttonText: (amount: number | string) => `Cancel & Get ${amount} back`,
    refundAmountTextColor: "text-orange-500",
  },
  none: {
    title: "Non-Refundable Booking",
    titleColor: "text-red-600",
    bg: "bg-red-50",
    bgText: "text-red-600",
    message: "You will lose the entire booking amount if you cancel.",
    note: "",
    buttonText: "Confirm Cancellation",
    refundAmountTextColor: "text-red-600",
  },
};

const RefundButton = ({
  label,
  variant = "outline",
  loading,
  onPress,
}: {
  label: string;
  variant?: "outline" | "black";
  loading?: boolean;
  onPress: () => void;
}) => {
  const isBlack = variant === "black";

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      className={`flex-1 rounded-full px-3 py-3 ${
        isBlack ? "bg-zinc-950" : "border border-zinc-950 bg-white"
      } ${loading ? "opacity-60" : ""}`}
    >
      <Text
        className={`text-center text-xs font-semibold ${
          isBlack ? "text-white" : "text-zinc-950"
        }`}
      >
        {loading ? "Please wait..." : label}
      </Text>
    </TouchableOpacity>
  );
};

const PriceRow = ({
  label,
  value,
  valueClassName = "text-zinc-950",
}: {
  label: string;
  value: number | string;
  valueClassName?: string;
}) => (
  <View className="flex-row justify-between py-1">
    <Text className="text-sm font-medium text-zinc-900">{label}</Text>
    <Text className={`text-sm font-medium ${valueClassName}`}>{value}</Text>
  </View>
);

const BookingRefundCard: React.FC<BookingRefundCardProps> = ({
  type,
  hotelName,
  dateRange,
  totalPrice,
  roomPrice,
  taxes,
  cancellationFee,
  refundAmount,
  image,
  refundUntilDate,
  isLoadingCancel = false,
  onCancel,
  onKeep,
}) => {
  const config = TYPE_CONFIG[type];

  const cancelLabel =
    typeof config.buttonText === "function"
      ? config.buttonText(refundAmount)
      : config.buttonText;

  return (
    <View className="w-full rounded-2xl bg-white p-6">
      <Text className={`text-[22px] font-bold ${config.titleColor}`}>
        {config.title}
      </Text>

      <Text className="mt-1 text-sm leading-5 text-zinc-600">
        {type === "full" &&
          `Free Cancellation on or before ${refundUntilDate}, no charges apply. You get your full ${totalPrice} back.`}
        {type === "partial" &&
          `Cancellation after ${refundUntilDate}, a ${cancellationFee} non-refundable penalty applies as per hotel policy.`}
        {type === "none" &&
          "This booking was made under a non-refundable rate. No refund will be issued upon cancellation."}
      </Text>

      <View className="mt-[18px] rounded-xl bg-zinc-50 p-3">
        <View className="flex-row items-center gap-4">
          <Image
            source={{ uri: image }}
            className="h-[62px] w-[74px] rounded-lg"
            resizeMode="cover"
          />

          <View className="flex-1">
            <Text className="text-lg font-normal capitalize text-zinc-900">
              {hotelName}
            </Text>
            <Text className="text-sm font-normal text-zinc-950">
              {dateRange}
            </Text>
          </View>

          <Text className="text-lg font-semibold text-zinc-950">
            {totalPrice}
          </Text>
        </View>
      </View>

      <View className="mt-[18px]">
        <Text className="mb-2 text-lg font-semibold text-zinc-950">
          Price Breakdown
        </Text>

        <PriceRow label="1 room x 2 nights" value={roomPrice} />

        <PriceRow
          label="Taxes & fees"
          value={taxes}
          valueClassName="text-zinc-600"
        />

        <PriceRow
          label="Cancellation fee"
          value={`-${cancellationFee}`}
          valueClassName="text-red-600"
        />

        <PriceRow
          label="Refund to your account"
          value={refundAmount}
          valueClassName={config.refundAmountTextColor}
        />
      </View>

      <View
        className={`mt-[18px] flex-row items-center justify-between rounded-xl p-3 ${config.bg}`}
      >
        <View className="flex-1">
          <Text className={`text-sm font-medium ${config.bgText}`}>
            {config.message}
          </Text>

          {!!config.note && (
            <Text className="mt-1 text-[10px] text-zinc-600">
              {config.note}
            </Text>
          )}
        </View>

        {type !== "none" && (
          <Text className="ml-3 text-sm font-bold text-zinc-800">
            {refundAmount}
          </Text>
        )}
      </View>

      <View className="mt-5 flex-row gap-[18px]">
        <RefundButton
          label={cancelLabel}
          variant="outline"
          loading={isLoadingCancel}
          onPress={onCancel}
        />

        <RefundButton
          label="Keep the Booking"
          variant="black"
          onPress={onKeep}
        />
      </View>
    </View>
  );
};

export default BookingRefundCard;
