import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type AppModalProps = {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCloseIcon?: boolean;
};

const AppModal = ({
  visible,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText,
  showCloseIcon = true,
}: AppModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center bg-black/50 px-5"
      >
        <Pressable className="w-full rounded-3xl bg-white p-5">
          {showCloseIcon && (
            <TouchableOpacity
              onPress={onClose}
              className="absolute right-4 top-4 z-10 h-9 w-9 items-center justify-center rounded-full bg-zinc-100"
            >
              <Ionicons name="close" size={20} color="#18181b" />
            </TouchableOpacity>
          )}

          {title && (
            <Text className="pr-10 text-xl font-bold text-zinc-950">
              {title}
            </Text>
          )}

          {children && <View className="mt-5">{children}</View>}

          <View className="mt-6 flex-row gap-3">
            {cancelText && (
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 rounded-2xl border border-zinc-300 py-3"
              >
                <Text className="text-center font-semibold text-zinc-900">
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}

            {onConfirm && (
              <TouchableOpacity
                onPress={onConfirm}
                className="flex-1 rounded-2xl bg-zinc-950 py-3"
              >
                <Text className="text-center font-semibold text-white">
                  {confirmText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AppModal;
