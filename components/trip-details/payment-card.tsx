import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Contact } from "../address";
import ReceiptButton from "../receipt-button";
import HotelSummaryCard from "./hotel-summary-card";
import { PaymentRow } from "./payment-row";
import { SectionBlock } from "./section-block";

const Divider = () => <View className="h-px bg-zinc-200 my-6" />;

type PaymentCardProps = {
  // HOTEL INFO
  images: any[];
  title: string;
  address: Contact;

  // PAYMENT INFO
  pnr: string;
  date: string;
  paymentMethod: string;
  paidVia: string;
  paymentStatus: string;
  total: string;
  roomPrice: string;
  tax: string;
  reservationRoomType: string;

  // RECEIPT DATA
  reservationDetails: any;

  // CANCEL BUTTON
  showCancelBtn: boolean;
  onPressCancelBtn: () => void;
};

const PaymentCard = (props: PaymentCardProps) => {
  const {
    // HOTEL INFO
    images,
    title,
    address,
    // PAYMENT INFO
    pnr,
    date,
    paymentMethod,
    paidVia,
    paymentStatus,
    total,
    roomPrice,
    reservationRoomType,
    tax,

    // RECEIPT DATA
    reservationDetails,

    // CANCEL BUTTON
    showCancelBtn,
    onPressCancelBtn,
  } = props;

  return (
    <View className="mt-8 rounded-2xl border border-zinc-200 p-4">
      <HotelSummaryCard images={images} title={title} address={address} />

      <Divider />

      <SectionBlock title="Payment Details">
        <PaymentRow label="PNR" value={pnr} />
        <PaymentRow label="Date" value={date} />
        <PaymentRow label="Payment method" value={paymentMethod} />
        <PaymentRow label="Paid Via" value={paidVia} />
        <PaymentRow
          label="Payment Status"
          value={paymentStatus}
          valueStyle="success"
        />
      </SectionBlock>

      <Divider />

      <SectionBlock title="Price Breakdown">
        <PaymentRow label={reservationRoomType} value={roomPrice} />
        <PaymentRow label="Taxes & fees" value={tax} valueStyle="muted" />

        <View className="flex-row justify-between mt-1 mb-5">
          <Text className="text-lg font-bold text-zinc-950">Total</Text>
          <Text className="text-lg font-bold text-zinc-950">{total}</Text>
        </View>

        <View className="flex-row justify-center gap-3">
          <ReceiptButton data={reservationDetails} />

          {showCancelBtn && (
            <TouchableOpacity
              className="flex-row items-center rounded-full border border-red-500 px-4 py-2"
              onPress={onPressCancelBtn}
            >
              <Ionicons name="close" size={18} color="#ef4444" />
              <Text className="ml-2 text-sm font-semibold text-red-600">
                Cancel Booking
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SectionBlock>
    </View>
  );
};

export default PaymentCard;
