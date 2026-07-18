import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { formatCurrency, formatToPercentage } from "@/lib/utils/format";
import {
  getTransactionsThunk,
  getWalletCoinsThunk,
} from "@/store/slice/wallet.slice";
import { WalletTransaction } from "@/types/wallet.types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import BookingCard from "./BookingTable";

export default function WalletScreen() {
  const colorScheme = useColorScheme();
  const C = Colors[colorScheme as "dark" | "light"];
  const walletCoins = useAppSelector((state) => state.wallet.coins);
  const transactions = useAppSelector((state) => state.wallet.transactions);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWalletCoinsThunk());
    dispatch(getTransactionsThunk({}));
  }, [dispatch]);

  const [selectedTab, setSelectedTab] = useState("All");
  const filteredActivities: WalletTransaction[] =
    selectedTab === "All"
      ? (transactions?.data ?? [])
      : (transactions?.data ?? []).filter(
          (item) =>
            item.booking_status?.toLowerCase() === selectedTab?.toLowerCase(),
        );

  const ListHeader = (
    <View style={{ backgroundColor: C.surfacePage }}>
      {/* Balance Card */}
      <ThemedView
        className="rounded-3xl p-6 mb-4"
        lightColor={Colors.light.surfaceCard}
        darkColor={Colors.dark.surfaceCard}
      >
        <ThemedText className="text-slate-500 dark:text-slate-400">
          Available Coins
        </ThemedText>

        <ThemedText className="text-4xl font-bold mt-2">
          {formatCurrency(
            formatToPercentage(walletCoins?.[0]?.total_active_coins || 0, 2),
            "",
            { hideCurrency: true },
          )}
        </ThemedText>

        <Button
          title="Convert to Cash"
          className="mt-5 w-full"
          onPress={() => router.push("/wallet/coin-transfer" as any)}
        />
      </ThemedView>

      {/* Stats */}
      <View className="flex-row gap-3 mb-5">
        <ThemedView
          className="flex-1 rounded-2xl p-4"
          lightColor={Colors.light.surfaceCard}
          darkColor={Colors.dark.surfaceCard}
        >
          <ThemedText className="text-slate-500">Lifetime Coins</ThemedText>
          <ThemedText className="text-xl font-bold mt-1">
            {formatCurrency(
              formatToPercentage(walletCoins?.[0]?.total_coins || 0, 2),
              "",
              { hideCurrency: true },
            )}
          </ThemedText>
        </ThemedView>

        <ThemedView
          className="flex-1 rounded-2xl p-4"
          lightColor={Colors.light.surfaceCard}
          darkColor={Colors.dark.surfaceCard}
        >
          <ThemedText className="text-slate-500">Pending Coins</ThemedText>
          <ThemedText className="text-xl font-bold mt-1">
            {formatCurrency(
              formatToPercentage(walletCoins?.[0]?.total_locked_coins || 0, 2),
              "",
              { hideCurrency: true },
            )}
          </ThemedText>
        </ThemedView>
      </View>

      {/* Activity Header */}
      <View className="flex-row items-center justify-between mb-3">
        <ThemedText className="text-lg font-bold">Recent Activity</ThemedText>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {["All", "Booked", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className="px-4 py-2 rounded-full mr-2"
            style={{
              backgroundColor: selectedTab === tab ? C.brand400 : C.surfaceCard,
            }}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={{ color: C.gray200 }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty state */}
      {filteredActivities.length === 0 && (
        <ThemedView
          className="mt-4 items-center rounded-xl p-8"
          lightColor={Colors.light.surfaceCard}
          darkColor={Colors.dark.surfaceCard}
        >
          <Text className="text-sm text-gray-500">No Records</Text>
        </ThemedView>
      )}
    </View>
  );

  const ListFooter = (
    <ThemedView
      className="rounded-3xl p-5 mt-4 mb-8"
      style={{ backgroundColor: C.surfaceCard }}
    >
      <ThemedText className="text-3xl font-bold">80% Cashback</ThemedText>

      <ThemedText className="mt-2 text-slate-600">
        Upgrade to premium and unlock higher cashback rewards on every booking.
      </ThemedText>

      <TouchableOpacity className="self-start bg-black rounded-full px-5 py-3 mt-4">
        <Text className="text-white font-semibold">Learn More</Text>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <FlatList
      data={filteredActivities}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        padding: 16,
        paddingTop: 65,
      }}
      style={{ backgroundColor: C.surfacePage }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      renderItem={({ item }) => <BookingCard trans={item} />}
    />
  );
}
