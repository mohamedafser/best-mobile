import { View } from "react-native";

type GallerySkeletonProps = {
  height?: number;
};

export default function GallerySkeleton({
  height = 320,
}: GallerySkeletonProps) {
  return (
    <View className="w-full overflow-hidden rounded-[15px]" style={{ height }}>
      <View className="flex-1 flex-row gap-2">
        <View className="flex-1 rounded-l-[15px] bg-[#f5eeeb]" />
        <View className="flex-1 gap-2">
          <View className="flex-1 flex-row gap-2">
            <View className="flex-1 bg-[#f5eeeb]" />
            <View className="flex-1 rounded-tr-[15px] bg-[#f5eeeb]" />
          </View>
          <View className="flex-1 flex-row gap-2">
            <View className="flex-1 bg-[#f5eeeb]" />
            <View className="flex-1 rounded-br-[15px] bg-[#f5eeeb]" />
          </View>
        </View>
      </View>
    </View>
  );
}
