import { View } from "react-native";

import GalleryImage from "../gallery-image";
import type { GalleryLayoutProps } from "../types";

export default function DualLayout({
  images,
  height,
  onOpen,
}: GalleryLayoutProps) {
  return (
    <View className="w-full flex-row gap-2" style={{ height }}>
      {images.slice(0, 2).map((src, index) => (
        <GalleryImage
          key={`${src}-${index}`}
          uri={src}
          onPress={() => onOpen(index)}
          className={`flex-1 ${index === 0 ? "rounded-l-[15px]" : "rounded-r-[15px]"}`}
          imageClassName={index === 0 ? "rounded-l-[15px]" : "rounded-r-[15px]"}
        />
      ))}
    </View>
  );
}
