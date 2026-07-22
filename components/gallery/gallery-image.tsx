import { Image, Pressable, View } from "react-native";

import type { GalleryImageProps } from "./types";

export default function GalleryImage({
  uri,
  onPress,
  className = "",
  imageClassName = "",
}: GalleryImageProps) {
  return (
    <Pressable
      accessibilityRole="imagebutton"
      onPress={onPress}
      className={`overflow-hidden ${className}`}
    >
      {({ pressed }) => (
        <View className="relative h-full w-full">
          <Image
            source={{ uri }}
            className={`h-full w-full ${imageClassName}`}
            resizeMode="cover"
          />
          <View
            className={`absolute inset-0 ${pressed ? "bg-black/15" : "bg-transparent"}`}
            pointerEvents="none"
          />
        </View>
      )}
    </Pressable>
  );
}
