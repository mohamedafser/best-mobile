import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { joinWithComma } from "@/lib/utils/join-with-comma";
import type { CitiesItem } from "@/types/cities.types";
import { useDestinationSearch } from "./useDestinationSearch";

type DestinationSearchProps = {
  hideInputLabel?: boolean;
  label?: string;
  size?: "large" | "small";
  value?: string;
  stateCode?: string | null;
  onChange?: (value: string) => void;
  onSelect?: (value: CitiesItem) => void;
  onTopResultUpdate?: (value: CitiesItem | null) => void;
  showRightIcon?: boolean;
  placeholder?: string;
};

const DropdownItem = React.memo(function DropdownItem({
  item,
  icon,
  onPress,
}: {
  item: CitiesItem;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row gap-3 px-3 py-3 rounded-lg"
    >
      {icon}
      <View className="flex-1">
        <Text className="text-sm text-gray-800 capitalize font-medium">
          {item?.name?.toLowerCase()}
        </Text>

        {!!item.country?.name && (
          <Text className="text-xs text-gray-500 mt-0.5">
            {item?.state?.name ? `${item.state.name}, ` : ""}
            {item.country.name}
          </Text>
        )}

        {!!item?.contact && (
          <Text className="text-xs text-gray-500 mt-0.5 capitalize">
            {item?.contact?.city?.toLowerCase()}
            {item?.contact?.country
              ? `, ${item.contact.country.toLowerCase()}`
              : ""}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

function DestinationSearchEmptyState({
  searchTerm,
  isNoDestinationApiCalled,
  onClickLetUsKnowCta,
}: {
  searchTerm: string;
  isNoDestinationApiCalled: boolean;
  onClickLetUsKnowCta: () => void;
}) {
  if (!searchTerm) return null;

  if (isNoDestinationApiCalled) {
    return (
      <View className="p-3 mt-2 rounded-lg bg-[#D1FAE5]">
        <Text className="text-[#16A34A] font-semibold text-xs mb-1 text-center">
          Thanks! We have received your request.
        </Text>
        <Text className="text-xs text-gray-700 text-center">
          {`Meanwhile you can try searching from someplace else associated with "${searchTerm}"`}
        </Text>
      </View>
    );
  }

  return (
    <View className="pt-3 mt-2 border-t border-gray-200">
      <Text className="text-xs text-gray-700 text-center">
        Still can{"'"}t find your destination?{" "}
        <Text className="font-bold text-[#FF7A45]" onPress={onClickLetUsKnowCta}>
          Let us know
        </Text>
      </Text>
    </View>
  );
}

function SearchDropdown({
  lists,
  onSelect,
  onItemSelected,
  setSearchTerm,
  setShowDropdown,
  onClickLetUsKnowCta,
  isNoDestinationApiCalled,
  searchTerm,
}: {
  lists: ReturnType<typeof useDestinationSearch>["lists"];
  onSelect?: (item: CitiesItem) => void;
  onItemSelected?: () => void;
  setSearchTerm: (value: string) => void;
  setShowDropdown: (value: boolean) => void;
  isNoDestinationApiCalled: boolean;
  onClickLetUsKnowCta: () => void;
  searchTerm: string;
}) {
  const handleSelect = useCallback(
    (item: CitiesItem, category: "city" | "hotel") => {
      const inputVal =
        category === "city"
          ? joinWithComma(item?.name, item?.state?.name, item?.country?.name)
          : item?.name || "";

      setSearchTerm(inputVal);
      onSelect?.(item);
      onItemSelected?.();
      setShowDropdown(false);
    },
    [onSelect, onItemSelected, setSearchTerm, setShowDropdown],
  );

  const locationItems = useMemo(
    () => [...(lists?.data || []), ...(lists?.cities || [])],
    [lists?.data, lists?.cities],
  );

  const hasHotels = (lists?.hotels?.length || 0) > 0;
  const hasLocations = locationItems.length > 0;

  if (!hasLocations && !hasHotels) {
    return (
      <View>
        <Text className="p-3 text-sm text-gray-500">No results found</Text>
        <DestinationSearchEmptyState
          searchTerm={searchTerm}
          isNoDestinationApiCalled={isNoDestinationApiCalled}
          onClickLetUsKnowCta={onClickLetUsKnowCta}
        />
      </View>
    );
  }

  return (
    <View>
      {hasLocations && (
        <View>
          <Text className="bg-[#F5EEEB] px-3 py-1.5 text-sm text-gray-800 rounded-lg mb-1 font-medium">
            Cities
          </Text>
          {locationItems.map((item, i) => (
            <DropdownItem
              key={String(item.id ?? item.uuid ?? `${item.name}-${i}`)}
              item={item}
              icon={
                <MaterialIcons name="location-on" size={20} color="#4D4743" />
              }
              onPress={() => handleSelect(item, "city")}
            />
          ))}
        </View>
      )}

      {hasHotels && (
        <View className="mt-2">
          <Text className="bg-[#F5EEEB] px-3 py-1.5 text-sm text-gray-800 rounded-lg mb-1 font-medium">
            Hotels
          </Text>
          {(lists.hotels || []).map((item, i) => (
            <DropdownItem
              key={String(item.id ?? item.uuid ?? `${item.name}-${i}`)}
              item={item}
              icon={<MaterialIcons name="hotel" size={20} color="#4D4743" />}
              onPress={() => handleSelect(item, "hotel")}
            />
          ))}
        </View>
      )}

      <DestinationSearchEmptyState
        searchTerm={searchTerm}
        isNoDestinationApiCalled={isNoDestinationApiCalled}
        onClickLetUsKnowCta={onClickLetUsKnowCta}
      />
    </View>
  );
}

function ListSkeleton() {
  return (
    <View className="gap-3 py-2">
      <View className="h-4 w-40 bg-gray-200 rounded" />
      <View className="h-3 w-28 bg-gray-200 rounded" />
      <View className="h-3 w-32 bg-gray-200 rounded" />
      <ActivityIndicator className="mt-2" color="#FF7A45" />
    </View>
  );
}

export default function DestinationSearch({
  hideInputLabel = false,
  label = "Location",
  size = "large",
  value = "",
  stateCode,
  onChange,
  onSelect,
  onTopResultUpdate,
  showRightIcon = true,
  placeholder = "Where to?",
}: DestinationSearchProps) {
  const {
    lists,
    searchTerm,
    setSearchTerm,
    showDropdown,
    setShowDropdown,
    closeDropdown,
    loading,
    topResult,
    isNoDestinationApiCalled,
    onClickLetUsKnowCta,
  } = useDestinationSearch(value, stateCode);

  const [isEditing, setIsEditing] = useState(false);
  const isLarge = size === "large";

  useEffect(() => {
    onTopResultUpdate?.(topResult);
  }, [topResult, onTopResultUpdate]);

  const handleClear = useCallback(() => {
    setSearchTerm("");
    onChange?.("");
    setIsEditing(true);
    setShowDropdown(true);
  }, [onChange, setSearchTerm, setShowDropdown]);

  const openDropdown = () => {
    setIsEditing(true);
    setShowDropdown(true);
  };

  return (
    <View className="w-full">
      <Pressable
        onPress={openDropdown}
        className={`bg-[#fdf8f6] p-3 rounded-lg border border-gray-100 ${
          isLarge ? "" : ""
        }`}
      >
        <View className="flex-row items-center gap-2">
          {isLarge && (
            <MaterialIcons name="location-on" size={22} color="#4D4743" />
          )}

          <View className="flex-1">
            {!hideInputLabel && (
              <Text className="text-[#85736d] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                {label}
              </Text>
            )}

            {isEditing || showDropdown ? (
              <TextInput
                value={searchTerm}
                placeholder={placeholder}
                placeholderTextColor="#85736d"
                autoFocus={showDropdown}
                onChangeText={(text) => {
                  setSearchTerm(text);
                  onChange?.(text);
                }}
                onFocus={() => {
                  setIsEditing(true);
                  setShowDropdown(true);
                }}
                className="text-[#1d1b1a] text-sm font-bold p-0"
              />
            ) : (
              <Text
                className="text-[#1d1b1a] text-sm font-bold capitalize"
                numberOfLines={1}
              >
                {searchTerm?.toLowerCase() || placeholder}
              </Text>
            )}
          </View>

          {!!searchTerm && (
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={8}
              className="h-8 w-8 items-center justify-center"
            >
              <Ionicons name="close" size={18} color="#6B7280" />
            </TouchableOpacity>
          )}

          {isLarge && showRightIcon && (
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={18}
              color="#4D4743"
            />
          )}
        </View>
      </Pressable>

      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={closeDropdown}
        >
          <Pressable className="bg-white rounded-t-3xl max-h-[70%] p-4">
            <View className="flex-row items-center gap-2 mb-3 border border-gray-200 rounded-xl px-3 py-2 bg-[#fdf8f6]">
              <MaterialIcons name="search" size={20} color="#4D4743" />
              <TextInput
                value={searchTerm}
                placeholder={placeholder}
                placeholderTextColor="#85736d"
                autoFocus
                onChangeText={(text) => {
                  setSearchTerm(text);
                  onChange?.(text);
                }}
                className="flex-1 text-[#1d1b1a] text-sm font-bold p-0"
              />
              {!!searchTerm && (
                <TouchableOpacity onPress={handleClear} hitSlop={8}>
                  <Ionicons name="close" size={18} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {loading ? (
                <ListSkeleton />
              ) : (
                <SearchDropdown
                  lists={lists}
                  onSelect={onSelect}
                  onItemSelected={() => setIsEditing(false)}
                  setSearchTerm={setSearchTerm}
                  setShowDropdown={setShowDropdown}
                  isNoDestinationApiCalled={isNoDestinationApiCalled}
                  onClickLetUsKnowCta={onClickLetUsKnowCta}
                  searchTerm={searchTerm}
                />
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
