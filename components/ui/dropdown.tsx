import React, { ReactNode, useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Option = {
  id?: string | number;
  uuid?: string | number;
  name?: string;
  value?: any;
  dom?: ReactNode;
};

type DropdownProps = {
  label: string;
  options: Option[];
  value: any | null;
  selected: boolean;
  validationError?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  isDisabled?: boolean;
  onChange: (value: any) => void;
};

export default function Dropdown({
  label,
  options,
  value,
  selected,
  validationError,
  searchable = false,
  searchPlaceholder = "Search...",
  isDisabled = false,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options;

    return options.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search, searchable]);

  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-slate-700">{label}</Text>

      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center justify-between rounded-xl border px-4 py-4 ${
          validationError ? "border-red-500" : "border-slate-300"
        }`}
      >
        <Text
          className={`text-sm ${
            !selected ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {value}
        </Text>

        <Ionicons name="chevron-down" size={18} color="#64748b" />
      </TouchableOpacity>

      {!!validationError && (
        <Text className="mt-1 text-sm text-red-500">{validationError}</Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
          className="flex-1 justify-center bg-black/40 px-5"
        >
          <TouchableOpacity
            activeOpacity={1}
            className="max-h-[400px] rounded-2xl bg-white p-4"
          >
            {searchable && (
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={searchPlaceholder}
                placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                className="mb-3 rounded-xl border border-slate-300 px-4 py-3"
              />
            )}

            <ScrollView>
              {filteredOptions.length === 0 ? (
                <Text className="px-3 py-4 text-slate-500">No Data Found</Text>
              ) : (
                filteredOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option.uuid ?? option.id ?? option.name ?? index}
                    className="rounded-xl px-3 py-4"
                    onPress={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearch("");
                    }}
                  >
                    {option.dom ? (
                      option.dom
                    ) : (
                      <Text className="text-slate-700">{option.name}</Text>
                    )}
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
