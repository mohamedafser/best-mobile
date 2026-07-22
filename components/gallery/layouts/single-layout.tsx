import { View } from "react-native";

import GalleryImage from "../gallery-image";
import type { GalleryLayoutProps } from "../types";

export default function SingleLayout({
  images,
  height,
  onOpen,
}: GalleryLayoutProps) {
  return (
    <View className="w-full overflow-hidden rounded-[15px]" style={{ height }}>
      <GalleryImage
        uri={images[0]}
        onPress={() => onOpen(0)}
        className="h-full w-full rounded-[15px]"
        imageClassName="rounded-[15px]"
      />
    </View>
  );
}
