import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AGE_OPTIONS = Array.from({ length: 17 }, (_, i) => i + 1);

type ChildAgePickerProps = {
  childIndex: number;
  age: number;
  onChange: (age: number) => void;
  embedded?: boolean;
};

export default function ChildAgePicker({
  childIndex,
  age,
  onChange,
  embedded = false,
}: ChildAgePickerProps) {
  const [open, setOpen] = useState(false);

  const ageList = (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      style={embedded ? { maxHeight: 180 } : undefined}
      keyboardShouldPersistTaps="handled"
    >
      {AGE_OPTIONS.map((option) => {
        const selected = age === option;

        return (
          <TouchableOpacity
            key={option}
            className={`rounded-xl px-3 py-3 ${selected ? "bg-[#fdf8f6]" : ""}`}
            onPress={() => {
              onChange(option);
              setOpen(false);
            }}
          >
            <Text
              className={`text-sm ${
                selected ? "font-semibold text-[#1d1b1a]" : "text-slate-700"
              }`}
            >
              {option} years
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <View className="mt-3">
      <Text className="mb-1 text-sm text-gray-600">
        Child {childIndex + 1} Age
      </Text>

      <TouchableOpacity
        onPress={() => setOpen((prev) => !prev)}
        className="flex-row items-center justify-between rounded-md border border-gray-300 px-3 py-2"
      >
        <Text
          className={`text-sm ${age === 0 ? "text-[#85736d]" : "text-[#1d1b1a]"}`}
        >
          {age === 0 ? "Select age" : `${age} years`}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color="#4D4743"
        />
      </TouchableOpacity>

      {embedded ? (
        open ? (
          <View className="mt-2 rounded-xl border border-gray-200 bg-white p-2">
            {ageList}
          </View>
        ) : null
      ) : (
        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <Pressable
            className="flex-1 justify-center bg-black/40 px-5"
            onPress={() => setOpen(false)}
          >
            <Pressable
              className="max-h-[360px] rounded-2xl bg-white p-4"
              onPress={(e) => e.stopPropagation()}
            >
              <Text className="mb-3 text-base font-bold text-[#1d1b1a]">
                Child {childIndex + 1} Age
              </Text>
              {ageList}
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}
