import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { getReservationThunk } from "@/store/slice/reservation.slice";
import { ReservationResponse } from "@/types/reservation.types";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

// --- Reusable Trip Card Component ---
const TripCard = ({
  title,
  date,
  guests,
  rooms,
  price,
  image,
  status,
  isCancelled = false,
  id,
}: any) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`rounded-[20px] mb-6 overflow-hidden shadow-lg ${
        isCancelled ? "opacity-60" : ""
      }`}
      style={{
        // Native shadow for iOS/Android stability
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        backgroundColor: Colors[colorScheme as "dark" | "light"]?.surfaceCard,
      }}
      onPress={() => router.push(`/trip-details/${id}`)}
    >
      {/* Image Container */}
      <View
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: 16 / 9 }}
      >
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Grayscale overlay for cancelled trips */}
        {isCancelled && <View className="absolute inset-0 bg-black/40" />}

        {/* Status Badge */}
        <View className="absolute top-4 left-4">
          <View
            className={`px-3 py-1 rounded-full ${
              isCancelled ? "bg-[#ba1a1a]" : "bg-[#00C853]"
            }`}
          >
            <Text className="text-white text-[10px] font-extrabold uppercase tracking-widest">
              {status}
            </Text>
          </View>
        </View>
      </View>

      {/* Content Area */}
      <View className="p-5">
        <View className="flex-row justify-between items-end">
          {/* Left Side: Info */}
          <View className="flex-1 mr-2">
            <Text
              className="text-xl font-bold mb-2"
              numberOfLines={1}
              style={{
                color: Colors[colorScheme as "dark" | "light"]?.gray900,
              }}
            >
              {title}
            </Text>

            <View className="flex-row items-center mb-1">
              <MaterialIcons name="calendar-today" size={14} color="#A0A4B8" />
              <Text className="text-[#A0A4B8] text-sm ml-2 font-medium">
                {date}
              </Text>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons name="person" size={14} color="#727687" />
              <Text className="text-[#727687] text-sm ml-2">
                {guests} guest{guests !== 1 ? "s" : ""}
              </Text>
              <Text className="text-[#727687] text-sm mx-2">·</Text>
              <MaterialIcons name="bed" size={14} color="#727687" />
              <Text className="text-[#727687] text-sm ml-2">
                {rooms} room{rooms !== 1 ? "s" : ""}
              </Text>
            </View>
          </View>

          {/* Right Side: Pricing */}
          <View className="items-end">
            <Text className="text-[#727687] text-[10px] font-black uppercase tracking-widest mb-1">
              TOTAL
            </Text>
            <ThemedText className="text-lg font-bold">{price}</ThemedText>
          </View>
        </View>

        {/* Bottom Arrow */}
        <View className="items-end mt-2">
          <MaterialIcons name="chevron-right" size={24} color="#727687" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Helper to build tabs ---
const buildTabs = (
  reservationsModified: any,
): { name: string; data: ReservationResponse[] }[] => {
  const list: { name: string; data: ReservationResponse[] }[] = [];
  const upcomingList = [
    ...(reservationsModified?.current || []),
    ...(reservationsModified?.upcoming || []),
  ];
  const completedList = reservationsModified?.past || [];
  const cancelledList = reservationsModified?.cancelled || [];

  if (upcomingList.length > 0) {
    list.push({ name: "Upcoming", data: upcomingList });
  }
  if (completedList.length > 0) {
    list.push({ name: "Completed", data: completedList });
  }
  if (cancelledList.length > 0) {
    list.push({ name: "Cancelled", data: cancelledList });
  }
  return list;
};

// --- Reusable Empty State Component ---
const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <View className="flex-1 justify-center items-center px-6 py-20">
    <View className="bg-[#1F232B] p-6 rounded-full mb-6">
      <MaterialIcons name="card-travel" size={48} color="#0066ff" />
    </View>
    <Text className="text-white text-xl font-bold text-center mb-2">
      No trips found
    </Text>
    <Text className="text-[#727687] text-base text-center leading-6 max-w-[280px]">
      {searchQuery
        ? "No trips match your search criteria. Try a different search."
        : "Keep exploring to plan and book your next adventure!"}
    </Text>
  </View>
);

const MyTripsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();

  const { reservationsModified, loading } = useAppSelector(
    (state) => state.reservation,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReservationThunk());
  }, [dispatch]);

  // Dynamically build tabs containing data and memoize them to avoid unnecessary recalculations
  const tabs = useMemo(
    () => buildTabs(reservationsModified),
    [reservationsModified],
  );

  // Derive the active tab based on availability in computed tabs
  const activeTab =
    selectedTab && tabs.some((t) => t.name === selectedTab)
      ? selectedTab
      : tabs[0]?.name || "Upcoming";

  const setActiveTab = setSelectedTab;

  const currentTabData = tabs.find((t) => t.name === activeTab)?.data || [];

  // Filter based on search query
  const filteredData = currentTabData.filter((item: ReservationResponse) => {
    const hotelName = item.order?.hotel?.name || "";
    const resId = item.order?.reservation_id || "";
    const query = searchQuery.toLowerCase();
    return (
      hotelName.toLowerCase().includes(query) ||
      resId.toLowerCase().includes(query) ||
      item.uuid.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#0066ff" />
      </View>
    );
  }

  return (
    <ThemedView
      className="flex-1 "
      lightColor={Colors.light.surfacePage}
      darkColor={Colors.dark.surfacePage}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5">
          {/* Search Bar */}
          <View
            className="mt-4 flex-row items-center border border-[#272B33] rounded-xl px-4 h-14"
            style={{
              backgroundColor:
                Colors[colorScheme as "dark" | "light"]?.surfaceCard,
            }}
          >
            <MaterialIcons name="search" size={22} color="#727687" />
            <TextInput
              placeholder="Search trips"
              placeholderTextColor="#727687"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-white text-base"
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialIcons name="close" size={20} color="#727687" />
              </TouchableOpacity>
            )}
          </View>

          {tabs.length === 0 ? (
            <EmptyState searchQuery={searchQuery} />
          ) : (
            <>
              {/* Segmented Tabs */}
              <View className="flex-row mt-8 border-b border-[#272B33]">
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.name}
                    onPress={() => setActiveTab(tab.name)}
                    className={`flex-1 pb-4 items-center ${
                      activeTab === tab.name
                        ? "border-b-2 border-[#0066ff]"
                        : ""
                    }`}
                  >
                    <Text
                      className={`font-bold`}
                      style={{
                        color: Colors[colorScheme as "dark" | "light"]?.gray600,
                      }}
                    >
                      {tab.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* List of Cards */}
              <View className="mt-8 pb-40">
                {filteredData.length === 0 ? (
                  <EmptyState searchQuery={searchQuery} />
                ) : (
                  filteredData.map((item: ReservationResponse) => {
                    const checkIn = item.room?.check_in_date;
                    const checkOut = item.room?.check_out_date;
                    const dateStr =
                      checkIn && checkOut
                        ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
                        : "";
                    const priceStr = item.order?.payment_details?.totalAmount
                      ? formatCurrency(
                          item.order.payment_details.totalAmount.amount,
                          item.order.payment_details.totalAmount.currency,
                        )
                      : "";
                    const imageUrl =
                      item.order?.hotel?.images?.[0] ||
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_3BxyF24XXElbd0MM8mJGVowxoYEIaFUijm146f9spFlGPUo7X4GI6ceoKA4pmQLVlt50KsXaMMSZFvhzw65sSiWfvmKDPY_v5GgkRppdn79J_XOwsEqbV0vdC6P1SCkYLB5oAI4yhOUi_r_ABlkkj-dGWPUx5EM-4Q0SZME1JJGMSvGKbO1NpM0MpYZOzd0N8TiAFpjvxY_UWbjudoHvpzNo5jI5R_Q-rBqxN-kUuTHzfPWzhnyh9trZ0eMK87-L0LYtCajmnUs";

                    return (
                      <TripCard
                        key={item.uuid}
                        title={item.order?.hotel?.name || "Stay"}
                        date={dateStr}
                        guests={
                          item.room?.guests?.adults ?? item.params?.adults ?? 1
                        }
                        rooms={item.params?.roomQuantity ?? 1}
                        price={priceStr}
                        status={
                          item.is_cancelled
                            ? "Cancelled"
                            : activeTab === "Completed"
                              ? "Completed"
                              : "Upcoming"
                        }
                        isCancelled={item.is_cancelled}
                        image={imageUrl}
                        id={item?.uuid}
                      />
                    );
                  })
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default MyTripsScreen;
