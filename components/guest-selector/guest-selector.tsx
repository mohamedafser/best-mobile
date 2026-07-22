import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getPluralWord } from "@/lib/utils/pluralize";
import ChildAgePicker from "./child-age-picker";
import GuestCounterRow from "./guest-counter-row";

type CounterItem = {
  label: string;
  sublabel?: string;
  min?: number;
  max?: number;
};

const ITEMS: CounterItem[] = [
  { label: "Adults", min: 1 },
  {
    label: "Children",
    sublabel: "Ages 0–17",
    min: 0,
  },
  {
    label: "Rooms",
    sublabel: "Max 3 rooms",
    max: 3,
    min: 1,
  },
];

export type GuestSelectorValue = {
  adults: number;
  children: number;
  rooms: number;
  childrenAges: number[];
};

type GuestSelectorProps = {
  hideInputLabel?: boolean;
  counts?: number[];
  size?: "small" | "large";
  label?: string;
  defaultChildrenAges?: number[];
  showRightIcon?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (guests: GuestSelectorValue) => void;
  /** Use inline panel instead of nested Modal (needed inside another Modal) */
  embedded?: boolean;
};

function formatGuestSummary(adults: number, children: number, rooms: number) {
  const parts = [`${adults} ${getPluralWord(adults, "Adult")}`];

  if (children > 0) {
    parts.push(
      `${children} ${getPluralWord(children, "Child", "Children")}`,
    );
  }

  if (rooms > 0) {
    parts.push(`${rooms} ${getPluralWord(rooms, "Room")}`);
  }

  return parts.join(", ");
}

export default function GuestSelector({
  hideInputLabel = false,
  counts: countsProp,
  size = "large",
  onChange,
  defaultChildrenAges,
  label = "Guests",
  showRightIcon = true,
  isOpen,
  onOpenChange,
  embedded = false,
}: GuestSelectorProps) {
  const insets = useSafeAreaInsets();
  const [counts, setCounts] = useState<number[]>(countsProp ?? [1, 0, 1]);
  const [childrenAges, setChildrenAges] = useState<number[]>(
    () => defaultChildrenAges ?? [],
  );
  const [error, setError] = useState("");

  const isControlledOpen = isOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = isControlledOpen ? !!isOpen : uncontrolledOpen;

  const [adults, children, rooms] = counts;
  const isLarge = size === "large";
  const summary = formatGuestSummary(adults, children, rooms);

  const updateOpen = useCallback(
    (value: boolean) => {
      if (!isControlledOpen) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlledOpen, onOpenChange],
  );

  useEffect(() => {
    if (!countsProp || countsProp.length !== ITEMS.length) return;

    setCounts((prev) => {
      const unchanged = prev.every((value, index) => value === countsProp[index]);
      return unchanged ? prev : countsProp;
    });
  }, [countsProp]);

  useEffect(() => {
    setChildrenAges((prev) => {
      const source =
        defaultChildrenAges && defaultChildrenAges.length > 0
          ? defaultChildrenAges
          : prev;

      const updated = source.slice(0, children);
      while (updated.length < children) {
        updated.push(0);
      }

      const unchanged =
        updated.length === prev.length &&
        updated.every((value, index) => value === prev[index]);

      return unchanged ? prev : updated;
    });
  }, [children, defaultChildrenAges]);

  const emitChange = useCallback(
    (updatedCounts: number[], updatedAges: number[]) => {
      const [a, c, r] = updatedCounts;
      onChange?.({
        adults: a,
        children: c,
        rooms: r,
        childrenAges: updatedAges,
      });
    },
    [onChange],
  );

  const validate = (ages: number[]) => {
    if (children > 0 && ages.some((age) => age === 0)) {
      setError("Please select age for all children");
      return false;
    }
    setError("");
    return true;
  };

  const tryClose = useCallback(() => {
    if (children > 0 && childrenAges.some((age) => age === 0)) {
      setError("Please select age for all children");
      return;
    }
    setError("");
    updateOpen(false);
  }, [children, childrenAges, updateOpen]);

  const increment = (index: number) => {
    const max = ITEMS[index].max ?? Infinity;
    if (counts[index] >= max) return;

    const updated = [...counts];
    updated[index] += 1;
    setCounts(updated);
    emitChange(updated, childrenAges);
  };

  const decrement = (index: number) => {
    const min = ITEMS[index].min ?? 0;
    if (counts[index] <= min) return;

    const updated = [...counts];
    updated[index] -= 1;
    const updatedAges = childrenAges.slice(0, updated[1]);
    setCounts(updated);
    setChildrenAges(updatedAges);
    emitChange(updated, updatedAges);
  };

  const handleAgeChange = (childIndex: number, age: number) => {
    const updated = [...childrenAges];
    updated[childIndex] = age;
    setChildrenAges(updated);
    if (validate(updated)) {
      emitChange(counts, updated);
    }
  };

  const guestPanel = (
    <View
      className={
        embedded
          ? "mt-2 rounded-2xl border border-[#E6DED8] bg-white px-3 pt-3"
          : "max-h-[85%] rounded-t-3xl bg-white px-4 pb-6 pt-4"
      }
      style={
        embedded ? undefined : { paddingBottom: Math.max(insets.bottom, 16) }
      }
      onStartShouldSetResponder={() => true}
    >
      {!embedded ? (
        <View className="mb-3 items-center">
          <View className="mb-3 h-1.5 w-10 rounded-full bg-gray-200" />
          <Text className="text-lg font-bold text-[#1d1b1a]">
            Guests & rooms
          </Text>
          <Text className="mt-1 text-xs text-[#85736d]">{summary}</Text>
        </View>
      ) : (
        <Text className="mb-2 text-center text-xs font-medium text-[#7A736E]">
          {summary}
        </Text>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        bounces={false}
        style={embedded ? { maxHeight: 320 } : undefined}
      >
        {ITEMS.map((item, index) => (
          <Fragment key={item.label}>
            <GuestCounterRow
              label={item.label}
              sublabel={item.sublabel}
              count={counts[index]}
              min={item.min}
              max={item.max}
              onIncrement={() => increment(index)}
              onDecrement={() => decrement(index)}
            />

            {item.label === "Children" &&
              children > 0 &&
              childrenAges.map((age, childIndex) => (
                <ChildAgePicker
                  key={childIndex}
                  childIndex={childIndex}
                  age={age}
                  embedded={embedded}
                  onChange={(nextAge) => handleAgeChange(childIndex, nextAge)}
                />
              ))}

            {index < ITEMS.length - 1 && (
              <View className="h-px bg-[#e6ded8]" />
            )}
          </Fragment>
        ))}

        {!!error && (
          <Text className="mt-3 text-sm text-red-600">{error}</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={tryClose}
        className="mt-4 h-12 items-center justify-center rounded-xl bg-[#ff7a45]"
      >
        <Text className="text-base font-bold text-white">Done</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="w-full">
      <Pressable
        onPress={() => updateOpen(true)}
        className="rounded-lg border border-gray-100 bg-[#fdf8f6] p-3"
      >
        <View className="flex-row items-center gap-2">
          {isLarge && (
            <MaterialIcons name="group" size={22} color="#4D4743" />
          )}

          <View className="flex-1">
            {!hideInputLabel && (
              <Text className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#85736d]">
                {label}
              </Text>
            )}
            <Text
              className="text-sm font-bold text-[#1d1b1a]"
              numberOfLines={1}
            >
              {summary}
            </Text>
          </View>

          {isLarge && showRightIcon && (
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              size={18}
              color="#4D4743"
            />
          )}
        </View>
      </Pressable>

      {embedded ? (
        open ? guestPanel : null
      ) : (
        <Modal
          visible={open}
          transparent
          animationType="slide"
          presentationStyle="overFullScreen"
          statusBarTranslucent={Platform.OS === "android"}
          onRequestClose={tryClose}
        >
          <View className="flex-1 justify-end bg-black/40">
            <Pressable className="absolute inset-0" onPress={tryClose} />
            {guestPanel}
          </View>
        </Modal>
      )}
    </View>
  );
}
