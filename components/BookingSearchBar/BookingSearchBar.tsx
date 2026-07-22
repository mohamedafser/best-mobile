import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DateRangePicker from "@/components/date-range-picker";
import { DestinationSearch } from "@/components/destination-search";
import GuestSelector from "@/components/guest-selector";

import SearchButton from "./SearchButton";
import type { BookingSearchBarProps } from "./types";
import { useBookingSearchBar } from "./useBookingSearchBar";

export default function BookingSearchBar(props: BookingSearchBarProps) {
  const { className = "" } = props;
  const insets = useSafeAreaInsets();
  const {
    value,
    loading,
    disabled,
    placeholder,
    expanded,
    datePickerOpen,
    guestSelectorOpen,
    activeField,
    minDate,
    dateRange,
    destinationSummary,
    datesSummary,
    guestsSummary,
    handleDestinationSelect,
    handleDestinationInputChange,
    handleDateChange,
    handleGuestsChange,
    handleSearchPress,
    openExpanded,
    closeExpanded,
    handleDatePickerOpenChange,
    handleGuestSelectorOpenChange,
    handleTopResultUpdate,
  } = useBookingSearchBar(props);

  return (
    <View className={className}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Search stays. ${destinationSummary}. ${datesSummary}. ${guestsSummary}`}
        accessibilityHint="Opens booking search options"
        disabled={disabled}
        onPress={openExpanded}
        className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${
          disabled ? "opacity-50" : ""
        }`}
        style={({ pressed }) => ({
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
          transform: [{ scale: pressed && !disabled ? 0.99 : 1 }],
        })}
      >
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-[#fdf8f6]">
            <MaterialIcons name="search" size={22} color="#4D4743" />
          </View>

          <View className="flex-1">
            <Text
              className="text-base font-bold text-[#1d1b1a]"
              numberOfLines={1}
            >
              {destinationSummary}
            </Text>
            <Text className="mt-0.5 text-xs text-[#85736d]" numberOfLines={1}>
              {datesSummary} · {guestsSummary}
            </Text>
          </View>

          <View className="h-10 w-10 items-center justify-center rounded-full bg-[#ff7a45]">
            <Ionicons name="options-outline" size={18} color="#fff" />
          </View>
        </View>
      </Pressable>

      <Modal
        visible={expanded}
        animationType="slide"
        onRequestClose={closeExpanded}
        presentationStyle="fullScreen"
        statusBarTranslucent={Platform.OS === "android"}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 bg-white"
          style={{
            paddingTop: insets.top + 35,
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          <View className="items-center border-b border-gray-100 px-4 pb-3 pt-2">
            <View className="mb-3 h-1.5 w-10 rounded-full bg-gray-200" />
            <View className="w-full flex-row items-center justify-between">
              <Text className="text-lg font-bold text-[#1d1b1a]">
                Search stays
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close search"
                hitSlop={8}
                onPress={closeExpanded}
                className="h-9 w-9 items-center justify-center rounded-full bg-[#fdf8f6]"
              >
                <Ionicons name="close" size={20} color="#1d1b1a" />
              </Pressable>
            </View>
          </View>

          <ScrollView
            className="flex-1"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 12,
              gap: 12,
            }}
          >
            <View
              className={`rounded-2xl ${
                activeField === "destination"
                  ? "border border-[#ff7a45]/30 p-1"
                  : ""
              }`}
            >
              <DestinationSearch
                label="Destination"
                placeholder={placeholder}
                value={value.destinationText}
                onChange={handleDestinationInputChange}
                onSelect={handleDestinationSelect}
                onTopResultUpdate={handleTopResultUpdate}
                showRightIcon
              />
            </View>

            <View
              className={`rounded-2xl ${
                activeField === "dates" ? "border border-[#ff7a45]/30 p-1" : ""
              }`}
            >
              <DateRangePicker
                label="Dates"
                value={dateRange}
                onChange={handleDateChange}
                isOpen={datePickerOpen}
                onOpenChange={handleDatePickerOpenChange}
                dualCalendar={false}
                enableDone
                embedded
                minDate={minDate}
                placeholder="Add dates"
              />
            </View>

            <View
              className={`rounded-2xl ${
                activeField === "guests" ? "border border-[#ff7a45]/30 p-1" : ""
              }`}
            >
              <GuestSelector
                label="Guests"
                counts={[value.adults, value.children, value.rooms]}
                defaultChildrenAges={value.childrenAges}
                onChange={handleGuestsChange}
                isOpen={guestSelectorOpen}
                onOpenChange={handleGuestSelectorOpenChange}
                embedded
                showRightIcon
              />
            </View>

            <SearchButton
              loading={loading}
              disabled={disabled}
              onPress={handleSearchPress}
              className="mt-2 mb-2"
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export type { BookingSearchBarProps, BookingSearchValues } from "./types";
