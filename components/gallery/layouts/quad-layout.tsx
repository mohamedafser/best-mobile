import { View } from "react-native";

import GalleryImage from "../gallery-image";
import type { GalleryLayoutProps } from "../types";

export default function QuadLayout({
  images,
  height,
  onOpen,
}: GalleryLayoutProps) {
  return (
    <View className="w-full flex-row gap-2" style={{ height }}>
      <GalleryImage
        uri={images[0]}
        onPress={() => onOpen(0)}
        className="flex-1 rounded-l-[15px]"
        imageClassName="rounded-l-[15px]"
      />

      <View className="flex-1 gap-2">
        <View className="flex-1 flex-row gap-2">
          {images.slice(1, 3).map((src, index) => {
            const galleryIndex = index + 1;

            return (
              <GalleryImage
                key={`${src}-${galleryIndex}`}
                uri={src}
                onPress={() => onOpen(galleryIndex)}
                className={`flex-1 ${index === 1 ? "rounded-tr-[15px]" : ""}`}
                imageClassName={index === 1 ? "rounded-tr-[15px]" : ""}
              />
            );
          })}
        </View>

        <GalleryImage
          uri={images[3]}
          onPress={() => onOpen(3)}
          className="flex-1 rounded-br-[15px]"
          imageClassName="rounded-br-[15px]"
        />
      </View>
    </View>
  );
}
