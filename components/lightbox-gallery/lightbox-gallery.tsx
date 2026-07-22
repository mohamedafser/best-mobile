import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { LightboxGalleryProps } from "./types";

const BRAND = "#FF7A45";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LightboxGallery({
  images,
  current,
  onChange,
  onClose,
}: LightboxGalleryProps) {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<string>>(null);
  const [slideHeight, setSlideHeight] = useState(
    Dimensions.get("window").height,
  );

  const scrollTo = useCallback(
    (index: number, animated = true) => {
      if (index < 0 || index >= images.length) return;

      onChange(index);
      listRef.current?.scrollToIndex({ index, animated });
    },
    [images.length, onChange],
  );

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(
        event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
      );

      if (nextIndex !== current && nextIndex >= 0 && nextIndex < images.length) {
        onChange(nextIndex);
      }
    },
    [current, images.length, onChange],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => {
      return (
        <View
          style={[styles.slide, { width: SCREEN_WIDTH, height: slideHeight }]}
        >
          <Image
            source={{ uri: item }}
            style={{ width: SCREEN_WIDTH, height: slideHeight * 0.75 }}
            resizeMode="contain"
          />
        </View>
      );
    },
    [slideHeight],
  );

  const canGoPrev = current > 0;
  const canGoNext = current < images.length - 1;
  const imageHeight = slideHeight * 0.75;
  const imageTop = (slideHeight - imageHeight) / 2;
  const topPad =
    Platform.OS === "android"
      ? Math.max(insets.top, StatusBar.currentHeight ?? 0) + 16
      : Math.max(insets.top, 16) + 8;

  return (
    <Modal
      visible
      transparent={false}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent={Platform.OS === "android"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#111111" />

      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: topPad }]}>
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {current + 1} / {images.length}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close gallery"
            onPress={onClose}
            hitSlop={16}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
        </View>

        <View
          style={styles.viewer}
          onLayout={(event) => {
            const nextHeight = event.nativeEvent.layout.height;
            if (nextHeight > 0 && nextHeight !== slideHeight) {
              setSlideHeight(nextHeight);
            }
          }}
        >
          <FlatList
            ref={listRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={renderItem}
            onMomentumScrollEnd={onMomentumScrollEnd}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            initialScrollIndex={current}
            onScrollToIndexFailed={({ index }) => {
              requestAnimationFrame(() => {
                listRef.current?.scrollToIndex({ index, animated: false });
              });
            }}
          />

          {images.length > 1 && (
            <View
              pointerEvents="box-none"
              style={[
                styles.arrowsOnImage,
                {
                  top: imageTop,
                  height: imageHeight,
                },
              ]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous photo"
                disabled={!canGoPrev}
                onPress={() => scrollTo(current - 1)}
                hitSlop={16}
                style={({ pressed }) => [
                  styles.navButton,
                  !canGoPrev && styles.navButtonDisabled,
                  pressed && canGoPrev && styles.buttonPressed,
                ]}
              >
                <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next photo"
                disabled={!canGoNext}
                onPress={() => scrollTo(current + 1)}
                hitSlop={16}
                style={({ pressed }) => [
                  styles.navButton,
                  !canGoNext && styles.navButtonDisabled,
                  pressed && canGoNext && styles.buttonPressed,
                ]}
              >
                <Ionicons name="chevron-forward" size={30} color="#FFFFFF" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  header: {
    zIndex: 100,
    elevation: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: "#111111",
  },
  viewer: {
    flex: 1,
    position: "relative",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111111",
  },
  arrowsOnImage: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 100,
    elevation: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BRAND,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  navButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BRAND,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  navButtonDisabled: {
    backgroundColor: "#5C5652",
    borderColor: "#8A827C",
    opacity: 0.7,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  counter: {
    borderRadius: 999,
    backgroundColor: BRAND,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
