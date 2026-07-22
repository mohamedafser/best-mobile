export function normalizeGalleryImages(medias: string[] = []): string[] {
  return medias.filter(
    (img): img is string =>
      typeof img === "string" &&
      img.trim() !== "" &&
      img !== "null" &&
      img !== "undefined",
  );
}
