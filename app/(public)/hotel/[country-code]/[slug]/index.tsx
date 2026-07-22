import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Gallery from "@/components/gallery";
import LightboxGallery from "@/components/lightbox-gallery";
import { useHotelDetails } from "./use-hotel-details";

// --- Types ---
interface Room {
  id: string;
  name: string;
  specs: string;
  price: string;
  image: string;
}

const ROOMS: Room[] = [
  {
    id: "1",
    name: "Deluxe King Room",
    specs: "City view • 45 sqm",
    price: "₹15,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgKYcZXfgR3dd4BOfNtwCeTlDzTxvPhtRWFrj4-_ar_QjtZCn6qi5ssund3OMRwLRenFTYu5a3t1kK5cFhfb8d8FvPQntt0RKc8pDFZDa8kXWNgl__HJFSVyXpAONsOZSelQVwoeud04dkfGQfaWnZ5Rk10J-mh7A-JajPtK6vQY8-pyJGBgVOkGOnTt1w_9-pJv2chFXnadf7AryFIAOpcGeH7QxQP1yIQ0j9rCpthkbXV8Rm0isGoAz1IEInpPZRNTftXyFyJFk",
  },
  {
    id: "2",
    name: "Executive Suite",
    specs: "Club Access • 70 sqm",
    price: "₹28,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDseTYqzBwu-tz6qS-c1cccdfunkbB550AHOev11utalvbA1lVM7U0I2fK0GLUbrG1IT0ESsRsrtMpgrgthZiiOvgMqyDQrbpLEYvCKt5GVv6Kc5C22BFjNPtxt5oWXVLXLCuXPgaZgiTHslfBsJjVkKk91ZXVEc0xyyNeum6KRdEeNiBqQM3C_VCKsYoGNBywWKaQoQlZGoSEzJvl69pyK6Py3yzV_nAarbZySWSnv5oxlORQh1SBtGKl4_e_chx7icLFUv-dZQGI",
  },
];

const AMENITY_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  pool: "pool",
  wifi: "wifi",
  gym: "fitness-center",
  fitness: "fitness-center",
  restaurant: "restaurant",
  dining: "restaurant",
  parking: "local-parking",
  spa: "spa",
};

const HotelDetailsScreen: React.FC = () => {
  const { details, loading, error, refetch } = useHotelDetails();
  const [selectedRoom, setSelectedRoom] = useState("1");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = useMemo(() => details?.media ?? [], [details?.media]);

  // const locationLabel = useMemo(() => {
  //   if (!details?.contact) return "";

  //   return [details.contact.city, details.contact.country]
  //     .filter(Boolean)
  //     .join(", ");
  // }, [details?.contact]);

  const addressLabel = details?.contact?.address;

  const amenities = useMemo(() => {
    const list = details?.amenities ?? [];
    if (!list.length) {
      return [
        { icon: "pool" as const, label: "Pool" },
        { icon: "wifi" as const, label: "Free WiFi" },
        { icon: "fitness-center" as const, label: "Gym" },
        { icon: "restaurant" as const, label: "Dining" },
      ];
    }

    return list.slice(0, 4).map((item) => {
      const key = item.name?.toLowerCase() || item.code?.toLowerCase() || "";
      const matchedKey = Object.keys(AMENITY_ICONS).find((iconKey) =>
        key.includes(iconKey),
      );

      return {
        icon: matchedKey ? AMENITY_ICONS[matchedKey] : ("hotel" as const),
        label: item.name || item.code,
      };
    });
  }, [details?.amenities]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  if (loading && !details) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 items-center justify-center bg-[#fffbf9]"
      >
        <ActivityIndicator size="large" color="#ff7a45" />
      </SafeAreaView>
    );
  }

  if (error && !details) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 items-center justify-center bg-[#fffbf9] px-6"
      >
        <Text className="mb-4 text-center text-base text-[#424656]">
          {error}
        </Text>
        <TouchableOpacity
          onPress={refetch}
          className="rounded-xl bg-[#ff7a45] px-5 py-3"
        >
          <Text className="font-bold text-white">Try again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#fffbf9]">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fffbf9"
        translucent={false}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >
        {/* Gallery Section */}
        <View className="px-4 pt-2">
          <Gallery
            medias={galleryImages}
            loading={loading && !galleryImages.length}
            height={320}
            onImagePress={openLightbox}
          />
        </View>

        {/* Title & Info */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-3">
              <Text className="text-2xl font-bold text-[#1b1c1c]">
                {details?.name || "Hotel"}
              </Text>
              <View className="flex-row items-center gap-1 mt-1">
                <MaterialIcons name="star" size={16} color="#725500" />
                <Text className="font-bold text-sm">
                  {details?.local_rating || "-"}
                </Text>
                {/* {locationLabel ? (
                  <Text className="text-[#727687] text-sm">
                    • {locationLabel}
                  </Text>
                ) : null} */}
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#f5eeeb] items-center justify-center border border-gray-200">
              <MaterialIcons
                name={details?.is_in_wishlist ? "favorite" : "favorite-border"}
                size={22}
                color={details?.is_in_wishlist ? "#ff7a45" : "#424656"}
              />
            </TouchableOpacity>
          </View>

          {/* Location Card */}
          <TouchableOpacity className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex-row items-center gap-4">
            <View className="h-16 w-16 items-center justify-center rounded-lg bg-[#f5eeeb]">
              <MaterialIcons name="location-on" size={28} color="#ff7a45" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-lg text-[#1b1c1c]">
                {addressLabel || "Location unavailable"}
              </Text>
              <Text className="text-sm text-[#727687]">
                {[details?.contact?.city, details?.state?.name]
                  .filter(Boolean)
                  .join(", ") || "View on map"}
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ff7a45" />
          </TouchableOpacity>
        </View>

        {/* Cashback Section */}
        <View className="px-5 mt-6">
          <View className="p-6 rounded-2xl bg-[#fff1ec] border-2 border-[#ff7a45]/20 shadow-sm relative overflow-hidden">
            <View className="flex-row justify-between items-center mb-4">
              <View className="bg-[#ff7a45] px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-bold uppercase tracking-wider">
                  CASHBACK DEAL
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <MaterialIcons
                  name="monetization-on"
                  size={20}
                  color="#725500"
                />
                <Text className="font-bold text-sm text-[#725500]">
                  Premium Reward
                </Text>
              </View>
            </View>

            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-[#424656]">Stay Price</Text>
                <Text className="font-bold text-[#1b1c1c]">₹15,000</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-[#424656]">Cashback Rate</Text>
                <View className="bg-[#e9f5f2] px-2 py-0.5 rounded-md">
                  <Text className="text-[#2e9c7b] font-bold text-xs">
                    10% OFF
                  </Text>
                </View>
              </View>
              <View className="h-[1px] bg-gray-200 my-2" />
              <View className="flex-row justify-between items-baseline">
                <Text className="text-lg font-bold text-[#1b1c1c]">
                  You Earn
                </Text>
                <Text className="text-3xl font-bold text-[#ff7a45] tracking-tight">
                  150,000{" "}
                  <Text className="text-[10px] text-gray-500 tracking-widest">
                    COINS
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description & Amenities */}
        <View className="px-5 mt-8">
          <Text className="text-xl font-bold mb-2">About this hotel</Text>
          <Text className="text-base text-[#424656] leading-6">
            {details?.description || "No description available."}
          </Text>

          <View className="flex-row justify-between mt-6">
            {amenities.map((item, idx) => (
              <View key={`${item.label}-${idx}`} className="items-center w-1/4">
                <View className="w-12 h-12 rounded-xl bg-[#f5eeeb] items-center justify-center mb-1">
                  <MaterialIcons name={item.icon} size={24} color="#424656" />
                </View>
                <Text className="text-[10px] font-bold uppercase text-[#727687] text-center">
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Room Selection */}
        <View className="px-5 mt-8 mb-40">
          <Text className="text-xl font-bold mb-4">Choose your room</Text>
          <View className="gap-4">
            {ROOMS.map((room) => (
              <TouchableOpacity
                key={room.id}
                onPress={() => setSelectedRoom(room.id)}
                className={`p-4 rounded-xl border-2 flex-row gap-4 relative ${
                  selectedRoom === room.id
                    ? "border-[#ff7a45] bg-[#fff1ec]"
                    : "border-gray-200 bg-white"
                }`}
              >
                {selectedRoom === room.id && (
                  <View className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#ff7a45] items-center justify-center z-10">
                    <MaterialIcons name="check" size={14} color="white" />
                  </View>
                )}
                <Image
                  source={{ uri: room.image }}
                  className="w-20 h-20 rounded-lg"
                />
                <View className="flex-1 justify-center">
                  <Text className="text-lg font-bold text-[#1b1c1c]">
                    {room.name}
                  </Text>
                  <Text className="text-sm text-[#424656]">{room.specs}</Text>
                  <Text
                    className={`font-bold mt-1 ${selectedRoom === room.id ? "text-[#ff7a45]" : "text-[#1b1c1c]"}`}
                  >
                    {room.price}{" "}
                    <Text className="text-xs font-normal text-[#727687]">
                      / night
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View className="absolute bottom-24 left-0 w-full px-5">
        <TouchableOpacity className="w-full h-14 bg-[#ff7a45] rounded-xl flex-row items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
          <MaterialIcons name="payments" size={24} color="white" />
          <Text className="text-white font-bold text-lg">
            Book & Earn Cashback
          </Text>
        </TouchableOpacity>
      </View>

      {isLightboxOpen && galleryImages.length > 0 && (
        <LightboxGallery
          images={galleryImages}
          current={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default HotelDetailsScreen;
