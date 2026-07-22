export type GalleryProps = {
  medias?: string[];
  loading?: boolean;
  height?: number;
  /** When provided, parent owns the lightbox. Otherwise Gallery opens its own. */
  onImagePress?: (index: number) => void;
};

export type GalleryImageProps = {
  uri: string;
  alt?: string;
  onPress: () => void;
  className?: string;
  imageClassName?: string;
};

export type GalleryLayoutProps = {
  images: string[];
  height: number;
  onOpen: (index: number) => void;
};
