import { ReactElement, useMemo, useState } from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type RenderItemParams<T> = {
  item: T;
  index: number;
};

type AppCarouselProps<T> = {
  data: T[];
  width?: number;
  height?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  pagingEnabled?: boolean;
  showPagination?: boolean;
  renderItem: (params: RenderItemParams<T>) => ReactElement;
};

function AppCarousel<T>({
  data,
  width = SCREEN_WIDTH,
  height = 240,
  autoPlay = false,
  autoPlayInterval = 3000,
  loop = true,
  pagingEnabled = true,
  showPagination = true,
  renderItem,
}: AppCarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = useMemo(() => data ?? [], [data]);

  if (!carouselData.length) return null;

  return (
    <View>
      <Carousel<T>
        width={width}
        height={height}
        data={carouselData}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        pagingEnabled={pagingEnabled}
        onSnapToItem={setActiveIndex}
        renderItem={({ item, index }) => renderItem({ item, index })}
      />

      {showPagination && carouselData.length > 1 && (
        <View className="mt-3 flex-row items-center justify-center">
          {carouselData.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 rounded-full ${
                activeIndex === index ? "w-5 bg-black" : "w-2 bg-zinc-300"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default AppCarousel;
