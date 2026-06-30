import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Types & Interfaces ---
interface Deal {
  id: string;
  title: string;
  image: string;
  cashback: string;
  rating: number;
  price: number;
  coins: number;
}

interface Hotel {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
}

// --- Constants & Mock Data ---
const COLORS = {
  primary: "#ff7a45",
  secondary: "#2e9c7b",
  surface: "#ffffff",
  background: "#fffbf9",
  outline: "#85736d",
  tertiary: "#725500",
};

const DEALS: Deal[] = [
  {
    id: "1",
    title: "Azure Bay Resort",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3IDeOFrGOFmG-YUzLJFqXj10Bd-wqTultwcwju-blooSHOzq4w74VBxWcotsgwyA1TuYY2StA4DyqjrPjHabLxt8-8Ca9SI95EoPkvmDMWuoRiPjmoomwzzRzAM9gJ0Di9HqJP62eGjZHR1_gd5qgeL375U9uRvOgmSuz_qfCFaIHd9caNj1hs_35SE7PnsH8MtLhdegVS9pwNwrzlvCYfZlm92j5mFJMIlxECIkpTF3QQztzAIOUwJIwys4VL16fLePYkr_DVns",
    cashback: "10% BACK",
    rating: 4.9,
    price: 299,
    coins: 85,
  },
  {
    id: "2",
    title: "Peak Summit Lodge",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5D1Wl57sHObupkPOeguqIhdVPVxGiKMZwt1_63xC0-8LlBAmfm3PpddBu8QXJcGY9PTmXiE6mGuWprmmUI4p6XCobSvyn0lX1yb7UlZJF-yjTJDxFCYdY4XgmjG0agYbdsHkYJACLAjDrTnEUEEbiPzLmJ-JUhMhE82DMAGi97LuA1sq9FuK7HqGt91i8MtKZa_vPUgXgA6q9YDfrK566rU3iUWaltSPrGKHMtKLbELrirPZy9DGDo--a9p4FEyYhymYt3uu_O_U",
    cashback: "15% BACK",
    rating: 4.7,
    price: 450,
    coins: 120,
  },
];

const HOTELS: Hotel[] = [
  {
    id: "1",
    title: "The Tokyo Edit",
    location: "Shibuya, Japan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXCAismzutyjePGfe07cedB4iJkqrRplga8YHMNE1Pa0KBVcxBR9hcizhWUSt36N9s61_nhC3ubWztuqFhD1hmGLGPFGF-XZ4v0iKJSydGStI0hmekw7yWvWVYMOAc3ZpBYB_kxDW38Zy5fh9DzrPv60sbBEMr1E-Did6ZdXTOpTLwnnk1COXJjjhfwBZBhbcoqACZUNlUUVY-fanXPxwX9opCQK-9QXUZPhzZCW3UdEQscPe2YXgJmzMDd6XpS2AB_gQC_XnenlY",
    price: 189,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Hotel de l'Opera",
    location: "Paris, France",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5v8fK1gRsXb2fbqfxJmKyTZJGmRkZM4KryHYehIRS-Mm-4nE0rZ--XIYGSnAnEl5FwtI1s36UenFlfRfCtCNKEFpgOtcq1ASR1LILO_Ja7frDGPO0mIMZAsRcT5t5KgvhQrwZGnpu3NnRs6JitlRu8jIRXJpz5w9JHbHka1yziHuXJYANiElvpr_qKNpgeCsqvmfkfpLP1AhmO68yNKpxwMaOgbb-QGnq2RfpaagB_dGAiqAGwFr3YaBSxsDOocn6flX2Q6QEGZc",
    price: 342,
    rating: 5.0,
  },
];

// --- Reusable Components ---

const SectionHeader = ({ title }: { title: string }) => (
  <View className="flex-row justify-between items-end mb-4 px-5">
    <Text
      className="text-2xl font-bold text-[#1d1b1a]"
      style={{
        fontFamily: Platform.OS === "ios" ? "Playfair Display" : "serif",
      }}
    >
      {title}
    </Text>
    <TouchableOpacity>
      <Text className="text-[#ff7a45] font-bold text-xs tracking-widest">
        VIEW ALL
      </Text>
    </TouchableOpacity>
  </View>
);

const SearchInput = ({
  icon,
  label,
  value,
  isFullWidth = false,
}: {
  icon: string;
  label: string;
  value: string;
  isFullWidth?: boolean;
}) => (
  <View
    className={`bg-[#fdf8f6] p-3 rounded-lg border border-transparent border-gray-100 ${isFullWidth ? "w-full" : "flex-1"}`}
  >
    <View className="flex-row items-center">
      <MaterialIcons name={icon as any} size={20} color={COLORS.primary} />
      <View className="ml-3">
        <Text className="text-[10px] font-bold uppercase text-[#85736d] tracking-tighter">
          {label}
        </Text>
        <Text className="text-base font-bold text-[#1d1b1a]">{value}</Text>
      </View>
    </View>
  </View>
);

const DealCard = ({ item }: { item: Deal }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    className="bg-white rounded-2xl overflow-hidden ml-5 w-72 shadow-sm border border-gray-100"
  >
    <View className="relative h-40">
      <Image source={{ uri: item.image }} className="w-full h-full" />
      <View className="absolute top-3 right-3 bg-[#2e9c7b] px-3 py-1 rounded-full flex-row items-center">
        <MaterialIcons name="payments" size={12} color="white" />
        <Text className="text-white text-[10px] font-bold ml-1">
          {item.cashback}
        </Text>
      </View>
    </View>
    <View className="p-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-[#1d1b1a] flex-1 mr-2">
          {item.title}
        </Text>
        <View className="flex-row items-center">
          <MaterialIcons name="star" size={14} color={COLORS.tertiary} />
          <Text className="font-bold ml-1 text-sm">{item.rating}</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-[10px] uppercase font-bold text-[#85736d]">
            Starting at
          </Text>
          <Text className="text-lg font-bold text-[#ff7a45]">
            ${item.price}
            <Text className="text-xs font-normal text-[#85736d]">/night</Text>
          </Text>
        </View>
        <View className="bg-[#fff9f2] px-2 py-1 rounded-lg border border-[#fabd00]/20 flex-row items-center">
          <MaterialCommunityIcons
            name="database"
            size={14}
            color={COLORS.tertiary}
          />
          <Text className="text-[#725500] font-bold text-xs ml-1">
            {item.coins} Coins
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const HotelCard = ({ item }: { item: Hotel }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    className="bg-[#fdf8f6] rounded-2xl overflow-hidden ml-5 w-64 border border-gray-100"
  >
    <Image source={{ uri: item.image }} className="w-full h-32" />
    <View className="p-3">
      <Text className="text-base font-bold text-[#1d1b1a]" numberOfLines={1}>
        {item.title}
      </Text>
      <Text className="text-[#85736d] text-xs mb-2">{item.location}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-[#ff7a45] font-bold">${item.price}</Text>
        <View className="flex-row items-center">
          <MaterialIcons name="star" size={12} color={COLORS.tertiary} />
          <Text className="text-[#725500] font-bold text-xs ml-1">
            {item.rating}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

// --- Main Screen ---

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#fffbf9]">
      {/* Header */}
      <View className="px-5 py-3 flex-row justify-between items-center bg-white border-b border-gray-50">
        <TouchableOpacity className="p-2">
          <MaterialIcons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Text
            className="text-2xl font-extrabold text-[#ff7a45] tracking-tight"
            style={{
              fontFamily: Platform.OS === "ios" ? "Playfair Display" : "serif",
            }}
          >
            BEST Travel
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full border-2 border-[#ffdbc3] overflow-hidden">
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8TDMgrMxxPAARAnG_a9x0CR-9NlLVkFVgRCErJb0WAh8N1Ll6pjsYK57JyIVKd2wWJFq-L22PK4pGLHzXBEGp2F3N9pe8pO_TNJBmhigLqo7Bu5nMHTtXCdqELdC6bncefIDrMl1q0G6Gi5hGsS3bqyYwKurOBCn3ZeCDy_76CE12c8DytNCQU_xjc-wZ0KgdW03HQTT5zq09-4oc3vk8-xJCqF2T7JW7RkJ02l0QAmDnHaHpmKs5gXZsFxCFy1jPLbCsGQcm5BA",
            }}
            className="w-full h-full"
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Search Section */}
        <View className="m-5 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <View className="space-y-3">
            <SearchInput
              icon="near-me"
              label="Destination"
              value="Where to?"
              isFullWidth
            />
            <View className="flex-row gap-3">
              <SearchInput
                icon="calendar-today"
                label="Dates"
                value="Sep 12 - 18"
              />
              <SearchInput icon="group" label="Guests" value="2 Adults" />
            </View>
            <TouchableOpacity className="w-full bg-[#ff7a45] h-14 rounded-xl items-center justify-center shadow-md">
              <Text className="text-white font-bold text-lg">
                Search Best Stays
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cashback Banner */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="mx-5 bg-[#2e9c7b] rounded-2xl h-32 flex-row items-center overflow-hidden"
        >
          <View className="px-6 flex-1 z-10">
            <View className="flex-row items-center mb-1">
              <MaterialIcons name="monetization-on" size={28} color="#fabd00" />
              <Text className="text-xl font-bold text-white ml-2">
                Earn 10% Cashback
              </Text>
            </View>
            <Text className="text-[#6ef6cc] text-sm">
              On all Boutique Hotel bookings this week.
            </Text>
          </View>
          <MaterialIcons
            name="military-tech"
            size={120}
            color="white"
            style={{
              opacity: 0.1,
              position: "absolute",
              right: -20,
              bottom: -20,
            }}
          />
        </TouchableOpacity>

        {/* Featured Deals Carousel */}
        <View className="mt-8">
          <SectionHeader title="Featured Deals" />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DEALS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DealCard item={item} />}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>

        {/* Recommended Hotels Carousel */}
        <View className="mt-8">
          <SectionHeader title="Recommended" />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={HOTELS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HotelCard item={item} />}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>

        {/* Trending Destinations */}
        <View className="mt-8 mb-32 px-5">
          <Text
            className="text-2xl font-bold text-[#1d1b1a] mb-4"
            style={{
              fontFamily: Platform.OS === "ios" ? "Playfair Display" : "serif",
            }}
          >
            Trending
          </Text>
          <View className="flex-row gap-4">
            <DestinationCard
              title="Italy"
              count="842 Hotels"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuABaNUmXCpN0FocTfirJeDnqMY174nynJ7mbY5pXko77x6aUo0fwr11Bi3idjLlP8aXTeWZmH2-MmDJQBQZYEut0GUXc7fWNsacf0WrcPXVuJCZDAwfYI5w1eh1Px1Qt6QqgfppCgOY-kdRQoeas_8eD-vE0y6GjKZ2QDPJqbapiw6E5_yIRchVqLoaesKzv3X0YZG7sTzlXsSvXOY1mll3V6bNhdm4M4PwiWmLknDAgfpm33B9r9fTlxt15HMoZ83HXN7zjro075o"
            />
            <DestinationCard
              title="Singapore"
              count="531 Hotels"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDji9ULsSWw_g5lz47ar4vtpvtIdp1AwaXEKHTOWIdaYNAluVJNA57jzK1LxKIRBCL6xuPJEW1hUAlWvJzQTTxk_jC7YKX3vu7DHO2TorHa2_Z8UfEAFPQzTTqC6FLzF72BCQ2UXk8ynPqBv4uBSSg7xU4iB-EHG51ipI0RH3OB16WOt40OLG8d-y4wqeSNM5cu27kkGE5J_kcvVNY3P08YiF_XYLrhKFnnXxf4nPdbIaM2FgHEUVbsXKCGGd8UZp_wQggHRSbkdv8"
            />
          </View>
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex-row justify-around items-center py-3 px-2 pb-8">
        <NavButton icon="search" label="Explore" active />
        <NavButton icon="luggage" label="Trips" />
        <NavButton icon="payments" label="Cashback" />
        <NavButton icon="military-tech" label="Rewards" />
        <NavButton icon="person" label="Space" />
      </View>
    </View>
  );
}

const DestinationCard = ({
  title,
  count,
  image,
}: {
  title: string;
  count: string;
  image: string;
}) => (
  <TouchableOpacity className="flex-1 h-48 rounded-2xl overflow-hidden relative">
    <Image source={{ uri: image }} className="absolute inset-0 w-full h-full" />
    <View className="absolute inset-0 bg-black/30" />
    <View className="absolute bottom-3 left-3">
      <Text className="text-white font-bold text-xl">{title}</Text>
      <Text className="text-white/80 text-xs font-medium">{count}</Text>
    </View>
  </TouchableOpacity>
);

const NavButton = ({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) => (
  <TouchableOpacity
    className={`items-center justify-center px-4 py-2 rounded-xl ${active ? "bg-[#ff7a45]" : ""}`}
  >
    <MaterialIcons
      name={icon as any}
      size={24}
      color={active ? "white" : "#424656"}
    />
    <Text
      className={`text-[10px] mt-1 font-bold uppercase ${active ? "text-white" : "text-[#424656]"}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
