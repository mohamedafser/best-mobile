export type LightboxGalleryProps = {
  images: string[];
  current: number;
  onChange: (index: number) => void;
  onClose: () => void;
};
