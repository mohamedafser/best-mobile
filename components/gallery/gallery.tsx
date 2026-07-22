import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import LightboxGallery from "@/components/lightbox-gallery";
import Button from "@/components/ui/button";

import GallerySkeleton from "./gallery-skeleton";
import DualLayout from "./layouts/dual-layout";
import GridLayout from "./layouts/grid-layout";
import QuadLayout from "./layouts/quad-layout";
import SingleLayout from "./layouts/single-layout";
import TripleLayout from "./layouts/triple-layout";
import type { GalleryProps } from "./types";
import { normalizeGalleryImages } from "./utils";

export default function Gallery({
  medias = [],
  loading = false,
  height = 320,
  onImagePress,
}: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = useMemo(() => normalizeGalleryImages(medias), [medias]);
  const isControlled = typeof onImagePress === "function";

  useEffect(() => {
    if (current >= images.length) {
      setCurrent(0);
    }
  }, [images.length, current]);

  const openImage = (index: number) => {
    if (!images.length) return;

    const nextIndex = Math.min(index, images.length - 1);

    if (isControlled) {
      onImagePress(nextIndex);
      return;
    }

    setCurrent(nextIndex);
    setIsOpen(true);
  };

  if (loading) {
    return <GallerySkeleton height={height} />;
  }

  if (!images.length) {
    return null;
  }

  const layoutProps = {
    images,
    height,
    onOpen: openImage,
  };

  return (
    <View className="relative w-full">
      {images.length === 1 && <SingleLayout {...layoutProps} />}
      {images.length === 2 && <DualLayout {...layoutProps} />}
      {images.length === 3 && <TripleLayout {...layoutProps} />}
      {images.length === 4 && <QuadLayout {...layoutProps} />}
      {images.length >= 5 && <GridLayout {...layoutProps} />}

      <View className="absolute bottom-4 right-4 z-20">
        <Button
          title="See all photos"
          variant="secondary"
          size="sm"
          className="bg-white shadow-lg"
          onPress={() => openImage(0)}
        />
      </View>

      {!isControlled && isOpen && (
        <LightboxGallery
          images={images}
          current={current}
          onChange={setCurrent}
          onClose={() => setIsOpen(false)}
        />
      )}
    </View>
  );
}
