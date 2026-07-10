import BookingRefundCard from "@/components/booking-refund-card";
import AppModal from "@/components/common/app-modal";
import {
  BookingDetailsSection,
  CancellationSection,
  PaymentCard,
  SupportSection,
  TariffNotesSection,
} from "@/components/trip-details";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useCurrency } from "@/hooks/use-currency";
import { formatDate, getNow, getNowSafe } from "@/lib/utils/dateHelpers";
import {
  totalHotelCalc,
  totalHotelCoinRedeemtion,
} from "@/lib/utils/total-hotel-helper";
import { getReservationDetailsThunk } from "@/store/slice/reservation.slice";
import { differenceInCalendarDays, isAfter, parse } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const Divider = () => <View className="h-px bg-zinc-200 my-6" />;

const canShowCancelButton = (refunds: any, isCancelled: boolean) => {
  if (isCancelled) return false;
  if (!refunds?.refundable || !refunds?.refundable_until_iso) return false;

  const refundableUntilDate = getNowSafe(refunds?.refundable_until_iso);
  // const refundableUntilDate = "2026-04-13T23:11:00+05:30";

  if (!refundableUntilDate) return false;

  return !isAfter(refundableUntilDate, getNow());
};

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { reservationDetails, loading, error } = useAppSelector(
    (state) => state.reservation,
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { amountWithCurrency } = useCurrency();

  useEffect(() => {
    if (id) {
      dispatch(getReservationDetailsThunk({ id }));
    }
  }, [dispatch, id]);

  const paymentStatus = useMemo(() => {
    return reservationDetails?.is_cancelled
      ? "Refunded"
      : reservationDetails?.order?.payment_details?.payment_status ===
          "Confirmed"
        ? "Paid"
        : reservationDetails?.order?.payment_details?.payment_status;
  }, [reservationDetails]);

  const startDate = parse(
    reservationDetails?.order?.booking_details?.trip_start || "",
    "EEE, MMM dd, yyyy",
    new Date(),
  );
  const endDate = parse(
    reservationDetails?.order?.booking_details?.trip_end || "",
    "EEE, MMM dd, yyyy",
    new Date(),
  );

  const nights = differenceInCalendarDays(endDate, startDate);

  const plan = "free";
  const grandTotal = totalHotelCalc(
    reservationDetails?.room?.pricing?.[plan]?.tax || 0,
    reservationDetails?.room?.pricing?.[plan]?.selling_price || 0,
  );

  const totalAmount = totalHotelCoinRedeemtion(
    // @ts-expect-error
    reservationDetails?.room?.pricing?.coins_redeemed?.coins / 100 || 0,
    grandTotal,
  );

  // Determine whether cancellation is allowed based on 'refundable_until'
  const isRefundableDateExpired = useMemo(
    () =>
      canShowCancelButton(
        reservationDetails?.order?.room?.refunds,
        reservationDetails?.is_cancelled as boolean,
      ),
    [
      reservationDetails?.order?.room?.refunds,
      reservationDetails?.is_cancelled,
    ],
  );

  // Payment/refund amounts used to render messages and modal description
  const refundTotalAmount =
    reservationDetails?.order?.payment_details?.totalAmount?.amount || 0;

  const refundAmount =
    reservationDetails?.order?.room?.refunds?.converted_best_refund_amount ?? 0;

  const isRefundable = reservationDetails?.order?.room?.refunds?.refundable;

  const refundType = isRefundable
    ? isRefundableDateExpired
      ? "partial"
      : "full"
    : "none";

  if (loading) {
    return (
      <View className="flex-1  justify-center items-center">
        <ActivityIndicator size="large" color="#0066ff" />
      </View>
    );
  }
  // TODO: use `id` to fetch the reservation details (e.g. dispatch a thunk)
  // console.log("trip id:", id, reservationDetails);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-5 pt-5 pb-10">
        <View className="flex-row items-center mb-4">
          <Text className="text-2xl font-bold text-zinc-950 capitalize">
            {reservationDetails?.order?.hotel?.name.toLowerCase()}
          </Text>
        </View>

        <Text className="text-base leading-6 text-zinc-900 mb-5">
          We are pleased to inform you that your reservation request has been
          received and confirmed!
        </Text>

        <Divider />

        <BookingDetailsSection
          name={`${reservationDetails?.order?.booked_by?.first_name} ${reservationDetails?.order?.booked_by?.last_name}`}
          tripStart={
            reservationDetails?.order?.booking_details?.trip_start || ""
          }
          tripEnd={reservationDetails?.order?.booking_details?.trip_end || ""}
          guest={reservationDetails?.order?.booking_details?.guest || ""}
          reservationRoomType={
            reservationDetails?.order?.booking_details?.reservation_room_type ||
            ""
          }
        />
        <Divider />
        <PaymentCard
          // HOTEL INFO
          images={reservationDetails?.order?.hotel?.images || []}
          title={reservationDetails?.order?.hotel?.name || ""}
          address={reservationDetails?.order?.hotel?.contact as any}
          // PAYMENT INFO
          pnr={reservationDetails?.order?.pnr || ""}
          date={reservationDetails?.order?.payment_details?.date || ""}
          paymentMethod={
            reservationDetails?.order?.payment_details?.payment_method || ""
          }
          paidVia={`${
            reservationDetails?.order?.payment_details?.paid_card_brand || ""
          } **** ${reservationDetails?.order?.payment_details?.paid_via || ""}`}
          paymentStatus={paymentStatus || ""}
          total={`${amountWithCurrency(totalAmount)}`}
          tax={`${amountWithCurrency(
            reservationDetails?.order?.room?.pricing?.free?.tax,
          )}`}
          roomPrice={`${amountWithCurrency(
            reservationDetails?.order?.room?.pricing?.free?.selling_price,
          )}`}
          reservationRoomType={`${reservationDetails?.params?.roomQuantity || ""} Room x ${nights} Nights`}
          // RECEIPT DATA
          reservationDetails={reservationDetails}
          onPressCancelBtn={() => setOpen(true)}
          showCancelBtn={isRefundableDateExpired}
        />
        <Divider />
        <CancellationSection
          cancellationPolicyText={
            reservationDetails?.room?.refunds?.description || ""
          }
          reservationDetails={reservationDetails}
        />
        <Divider />
        {reservationDetails?.order?.tariff_notes &&
          reservationDetails?.order?.tariff_notes?.messages?.length > 0 && (
            <>
              <TariffNotesSection
                notes={reservationDetails?.order?.tariff_notes?.messages?.[0]}
              />
              <Divider />
            </>
          )}

        {/* <MapSection
          lat={reservationDetails?.order?.hotel?.location?.latitude as number}
          long={reservationDetails?.order?.hotel?.location?.longitude as number}
          hotelName={reservationDetails?.order?.hotel?.name || ""}
        />
        <Divider /> */}

        <SupportSection />
      </View>

      <AppModal
        visible={open}
        // description="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="OK"
        onClose={() => setOpen(false)}
        showCloseIcon={true}
      >
        <BookingRefundCard
          type={refundType}
          hotelName={
            reservationDetails?.order?.hotel?.name?.toLowerCase() || ""
          }
          dateRange={`${formatDate(reservationDetails?.params?.checkInDate as string, "dd MMMM")} - ${formatDate(reservationDetails?.params?.checkOutDate as string, "dd MMMM yyyy")}`}
          totalPrice={`${amountWithCurrency(totalAmount)}`}
          roomPrice={`${amountWithCurrency(
            reservationDetails?.order?.room?.pricing?.free?.selling_price,
          )}`}
          taxes={`${amountWithCurrency(
            reservationDetails?.order?.room?.pricing?.free?.tax,
          )}`}
          cancellationFee={`${amountWithCurrency(!isRefundable ? totalAmount : isRefundableDateExpired ? refundAmount : 0)}`}
          // @ts-expect-error
          refundAmount={`${amountWithCurrency(!isRefundable ? 0 : isRefundableDateExpired ? refundTotalAmount - refundAmount : totalAmount)}`}
          image={reservationDetails?.order?.hotel?.images?.[0] || ""}
          refundUntilDate={formatDate(
            reservationDetails?.order?.room?.refunds
              ?.refundable_until_iso as string,
            "MMM d",
          )}
          isLoadingCancel={false}
          onCancel={() => ""}
          onKeep={() => ""}
        />
      </AppModal>
    </ScrollView>
  );
}
