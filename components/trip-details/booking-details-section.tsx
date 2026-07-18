import { Text, View } from "react-native";
import { ThemedText } from "../themed-text";
import { DetailRow } from "./detail-row";
import { SectionBlock } from "./section-block";

type BookingDetailsSectionProps = {
  name: string;
  tripStart: string;
  tripEnd: string;
  guest: string;
  reservationRoomType: string;
};

const BookingDetailsSection = (props: BookingDetailsSectionProps) => {
  const { guest, name, tripEnd, tripStart, reservationRoomType } = props;
  return (
    <SectionBlock title="Booking Details">
      <View className="mb-2">
        <Text className="text-xs font-semibold text-orange-600 mb-2">
          Name on the Reservation
        </Text>
        <ThemedText type="2XlBold">{name}</ThemedText>
      </View>

      <View className="flex-row flex-wrap mt-5">
        <DetailRow label="Trip Start" value={tripStart} />
        <DetailRow label="Trip End" value={tripEnd} />
      </View>
      <View className="flex-row flex-wrap mt-5">
        <DetailRow label="Guest" value={guest} />
        <DetailRow label="Reservation Room Type" value={reservationRoomType} />
      </View>
    </SectionBlock>
  );
};

export default BookingDetailsSection;
