import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export default function Tooltip({ children, content }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
      >
        {children}
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.tooltip}>
            {typeof content === "string" ? (
              <Text style={styles.text}>{content}</Text>
            ) : (
              content
            )}

            <View style={styles.arrow} />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  tooltip: {
    maxWidth: 240,
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  text: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
  },

  arrow: {
    position: "absolute",
    bottom: -5,
    alignSelf: "center",
    width: 10,
    height: 10,
    backgroundColor: "#111827",
    transform: [{ rotate: "45deg" }],
  },
});
