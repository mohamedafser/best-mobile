import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// --- Types ---
interface Room {
  id: string;
  name: string;
  specs: string;
  price: string;
  image: string;
}

// --- Mock Data ---
const GALLERY = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMwQ4icsy-jBuK0ord8P_wnxHwa9TSolbJPWr5mCqS5jPZt_3ruITORuNOwT_gGd5A8lndAKINpyY9VSbyNUkGlg4f3SIw8yJX-oacklChewKCylCQP9rDuGrkbmxGRV0tH8pOF7sUbnoCSxHcebpiKwpaNxIaEb-mwGFJbq_D3RH2MCXIOi98fJyLwfrmJXleXvyElYHAYoB1CkKUAvHKbF8VXi4QlyypsRuSA6V75I5hOvLi78WN5oYqxerbBNxR8GWIwj0n9bM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDczqZdOJDGlUtSxjFLZcqHasCGqN7cCiAllZ6BWl8XVTLIaW1wOEDB2o4p7Q7Uc3-2ONrqsDkygpEyZbbFhTYeUerdfjbzSF90FgXZS1-wWxAvgWhIkcInITlvWgHjebstOQzWYhDAII7qz5k7qldFYDDDrK63alALVQhQbi64Q8v6x0P4lRJVeSnY2-fY3H9ja26EwswXp5dKz4Ax9xrwblVGgRTGQUUinlHdBmTa2pVa1IApnmGmcDcXrCHB50myS2iRZ6ladc",
];

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

const HotelDetailsScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState("1");

  return (
    <View className="flex-1 bg-[#fffbf9]">
      <StatusBar barStyle="dark-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Gallery Section */}
        <View className="relative h-[350px]">
          <FlatList
            data={GALLERY}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              setActiveSlide(
                Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH),
              );
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: SCREEN_WIDTH }}
                className="h-full"
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          <View className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">
              {activeSlide + 1}/5 Photos
            </Text>
          </View>
        </View>

        {/* Title & Info */}
        <View className="px-5 pt-6">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-2xl font-bold text-[#1b1c1c]">
                The Grand Regency Palace
              </Text>
              <View className="flex-row items-center gap-1 mt-1">
                <MaterialIcons name="star" size={16} color="#725500" />
                <Text className="font-bold text-sm">4.9</Text>
                <Text className="text-[#727687] text-sm">(1,248 Reviews)</Text>
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#f5eeeb] items-center justify-center border border-gray-200">
              <MaterialIcons name="favorite-border" size={22} color="#424656" />
            </TouchableOpacity>
          </View>

          {/* Location Card */}
          <TouchableOpacity className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex-row items-center gap-4">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBwx4JDHVuJepd5FMPDiM38KqqiobDFR4uMjfalWsLkTjqo-z2eVinWVVUxB4WyQE5Gqj5zqAEgFPneX6QEQ-DU_y2apZVM8J0azmgKQztwPDW_e57xy4yPxPIIicQDRm3H2cfpqeTTPMm3UVqq6pTlgI5NpuSET3BbkG0pEpEoeWhl95FxBk-m0UhxBX6O58Sr4JS0T1tTCX8WdmXE4-tjA4Zj_srb-9uSyaBB2HADi31aAdM9CkpwcBkFyx9P3WGU5MVTCBV7No",
              }}
              className="w-16 h-16 rounded-lg"
            />
            <View className="flex-1">
              <Text className="font-bold text-lg text-[#1b1c1c]">
                Central Plaza, District 1
              </Text>
              <Text className="text-sm text-[#727687]">
                2.5 km from City Center
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
            Experience unparalleled luxury in the heart of the city. The Grand
            Regency combines historic charm with modern sophistication.
          </Text>

          <View className="flex-row justify-between mt-6">
            {[
              { icon: "pool", label: "Pool" },
              { icon: "wifi", label: "Free WiFi" },
              { icon: "fitness-center", label: "Gym" },
              { icon: "restaurant", label: "Dining" },
            ].map((item, idx) => (
              <View key={idx} className="items-center w-1/4">
                <View className="w-12 h-12 rounded-xl bg-[#f5eeeb] items-center justify-center mb-1">
                  <MaterialIcons
                    name={item.icon as any}
                    size={24}
                    color="#424656"
                  />
                </View>
                <Text className="text-[10px] font-bold uppercase text-[#727687]">
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
    </View>
  );
};

export default HotelDetailsScreen;
