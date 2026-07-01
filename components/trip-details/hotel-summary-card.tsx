import { Feather } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import Address, { Contact } from "../address";
import AppCarousel from "../common/app-carousel";

type HotelSummaryCardProps = {
  images: any[];
  title: string;
  address: Contact;
};
const HotelSummaryCard = ({
  images,
  title,
  address,
}: HotelSummaryCardProps) => (
  <View className="flex-row">
    <AppCarousel<string>
      data={images?.slice(0, 4)}
      height={100}
      width={100}
      autoPlay
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          className="h-full w-full rounded-2xl"
          resizeMode="cover"
        />
      )}
    />
    <View className="ml-4 flex-1">
      <View className="flex-row justify-between">
        <Text className="text-base font-bold text-zinc-950">{title}</Text>
        <Feather name="share-2" size={20} color="#111" />
      </View>

      <Address contact={address} />
    </View>
  </View>
);

export default HotelSummaryCard;
