import { MaterialIcons } from "@expo/vector-icons";
import { format, startOfDay } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

import DateFooterPlugin from "./date-footer-plugin";

export type DateRangeValue = Date[];

type DateRangePickerProps = {
  value?: DateRangeValue | null;
  onChange: (value: DateRangeValue) => void;
  dualCalendar?: boolean;
  showPlugins?: boolean;
  enableDone?: boolean;
  variant?: "outline" | "filled";
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "large" | "small";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  dateSeparator?: string;
  /** Use overlay instead of nested Modal (needed inside another Modal on Android) */
  embedded?: boolean;
};

function isValidRange(val: DateRangeValue | null | undefined) {
  return Array.isArray(val) && val.length === 2 && !!val[0] && !!val[1];
}

function normalizeRange(val: DateRangeValue | null | undefined): Date[] {
  if (!Array.isArray(val)) return [];
  return val.filter(Boolean).map((d) => startOfDay(d));
}

function toDate(value: DateType): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : startOfDay(value);
  }

  if (typeof value === "object" && "toDate" in value) {
    const date = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(date.getTime()) ? null : startOfDay(date);
  }

  const date = new Date(value as string | number);
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

function formatRangeDisplay(
  range: Date[],
  separator: string,
  placeholder: string,
) {
  if (!range.length) return placeholder;
  if (range.length === 1) return format(range[0], "MMM d");
  return `${format(range[0], "MMM d")}${separator}${format(range[1], "MMM d")}`;
}

export default function DateRangePicker({
  value,
  onChange,
  enableDone = true,
  variant = "outline",
  label,
  leftIcon,
  rightIcon,
  size = "large",
  isOpen,
  onOpenChange,
  placeholder = "Select dates",
  minDate,
  maxDate,
  dateSeparator = " - ",
  embedded = false,
}: DateRangePickerProps) {
  const insets = useSafeAreaInsets();
  const defaultStyles = useDefaultStyles();
  const normalizedValue = normalizeRange(value);
  const isControlledOpen = isOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = isControlledOpen ? !!isOpen : uncontrolledOpen;

  const [tempStartDate, setTempStartDate] = useState<Date | null>(
    normalizedValue[0] ?? null,
  );
  const [tempEndDate, setTempEndDate] = useState<Date | null>(
    normalizedValue[1] ?? null,
  );
  const [prevValueKey, setPrevValueKey] = useState(() =>
    normalizedValue.map((d) => d.toISOString()).join("|"),
  );
  const [prevOpen, setPrevOpen] = useState(open);

  const valueKey = normalizedValue.map((d) => d.toISOString()).join("|");

  if (valueKey !== prevValueKey) {
    setPrevValueKey(valueKey);
    if (!open) {
      setTempStartDate(normalizedValue[0] ?? null);
      setTempEndDate(normalizedValue[1] ?? null);
    }
  }

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setTempStartDate(normalizedValue[0] ?? null);
      setTempEndDate(normalizedValue[1] ?? null);
    }
  }

  const tempRange = useMemo(() => {
    if (tempStartDate && tempEndDate) return [tempStartDate, tempEndDate];
    if (tempStartDate) return [tempStartDate];
    return [];
  }, [tempEndDate, tempStartDate]);

  const updateOpen = useCallback(
    (next: boolean) => {
      if (!isControlledOpen) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlledOpen, onOpenChange],
  );

  const handlePickerChange = useCallback(
    ({ startDate, endDate }: { startDate: DateType; endDate: DateType }) => {
      const nextStart = toDate(startDate);
      const nextEnd = toDate(endDate);

      setTempStartDate(nextStart);
      setTempEndDate(nextEnd);

      if (!enableDone && nextStart && nextEnd) {
        onChange([nextStart, nextEnd]);
        updateOpen(false);
      }
    },
    [enableDone, onChange, updateOpen],
  );

  const handleDone = useCallback(() => {
    if (!tempStartDate || !tempEndDate) return;
    onChange([
      new Date(tempStartDate.getTime()),
      new Date(tempEndDate.getTime()),
    ]);
    updateOpen(false);
  }, [onChange, tempEndDate, tempStartDate, updateOpen]);

  const handleCancel = useCallback(() => {
    setTempStartDate(normalizedValue[0] ?? null);
    setTempEndDate(normalizedValue[1] ?? null);
    updateOpen(false);
  }, [normalizedValue, updateOpen]);

  const openPicker = () => {
    setTempStartDate(normalizedValue[0] ?? null);
    setTempEndDate(normalizedValue[1] ?? null);
    updateOpen(true);
  };

  const displayValue = formatRangeDisplay(
    normalizedValue,
    dateSeparator,
    placeholder,
  );
  const isPlaceholder = normalizedValue.length === 0;

  const triggerBorder =
    variant === "outline" ? "border border-[#D3E0FE]" : "border-0";
  const triggerPadding = size === "small" ? "px-0 py-1" : "px-3 py-3";

  const calendarPanel = (
    <View
      className={`${
        embedded
          ? "mt-2 rounded-2xl border border-[#E6DED8] bg-white px-3 pt-3"
          : "max-h-[85%] rounded-t-3xl border border-[#E6DED8] bg-white px-4 pt-4"
      }`}
      style={
        embedded ? undefined : { paddingBottom: Math.max(insets.bottom, 16) }
      }
    >
      {!embedded ? (
        <View className="mb-3 items-center">
          <View className="mb-3 h-1.5 w-10 rounded-full bg-[#E6DED8]" />
          <Text className="text-lg font-normal text-[#2E2A28]">
            Select dates
          </Text>
          <Text className="mt-1 text-xs font-medium text-[#7A736E]">
            {formatRangeDisplay(tempRange, dateSeparator, "Pick a range")}
          </Text>
        </View>
      ) : (
        <Text className="mb-2 text-center text-xs font-medium text-[#7A736E]">
          {formatRangeDisplay(tempRange, dateSeparator, "Pick a range")}
        </Text>
      )}

      <DateTimePicker
        mode="range"
        startDate={tempStartDate}
        endDate={tempEndDate}
        onChange={handlePickerChange}
        minDate={minDate ?? undefined}
        maxDate={maxDate ?? undefined}
        allowRangeReset
        styles={{
          ...defaultStyles,
          selected: { backgroundColor: "#4D4743" },
          selected_label: { color: "#FFFFFF" },
          range_fill: { backgroundColor: "#F2ECE7" },
          today: { borderColor: "#FF7A45", borderWidth: 1 },
          today_label: { color: "#FF7A45", fontWeight: "700" },
          button_prev_image: { tintColor: "#293050" },
          button_next_image: { tintColor: "#293050" },
          month_selector_label: { color: "#2E2A28", fontWeight: "600" },
          year_selector_label: { color: "#2E2A28", fontWeight: "600" },
        }}
      />

      {enableDone ? (
        <DateFooterPlugin
          onDone={handleDone}
          onCancel={handleCancel}
          disabled={!isValidRange(tempRange)}
        />
      ) : null}
    </View>
  );

  return (
    <View className="w-full">
      <Pressable
        onPress={openPicker}
        className={`w-full rounded-lg bg-[#FDF8F6] ${triggerBorder} ${triggerPadding}`}
      >
        <View className="relative w-full flex-row items-center">
          {leftIcon ? (
            <View className="mr-2" pointerEvents="none">
              {leftIcon}
            </View>
          ) : (
            <View className="mr-2" pointerEvents="none">
              <MaterialIcons name="calendar-today" size={18} color="#777777" />
            </View>
          )}

          <View className={`min-w-[150px] flex-1 ${rightIcon ? "pr-8" : ""}`}>
            {!!label && (
              <Text className="mb-1.5 text-xs font-medium text-[#7A736E]">
                {label}
              </Text>
            )}
            <Text
              className={`text-sm font-bold leading-[18px] ${
                isPlaceholder ? "text-[#7A736E]" : "text-[#1A1A1A]"
              } ${size === "small" ? "text-center" : "text-left"}`}
              numberOfLines={1}
            >
              {displayValue}
            </Text>
          </View>

          {rightIcon ? (
            <View className="absolute right-0">{rightIcon}</View>
          ) : null}
        </View>
      </Pressable>

      {embedded ? (
        open ? (
          calendarPanel
        ) : null
      ) : (
        <Modal
          visible={open}
          transparent
          animationType="slide"
          presentationStyle="overFullScreen"
          statusBarTranslucent={Platform.OS === "android"}
          onRequestClose={handleCancel}
        >
          <View className="flex-1 justify-end bg-black/40">
            <Pressable className="absolute inset-0" onPress={handleCancel} />
            {calendarPanel}
          </View>
        </Modal>
      )}
    </View>
  );
}
