import { ImageResponse } from "next/og";
import { Logo } from "./brand";

const ICONS = {
  "192": { px: 192, scale: undefined },
  "512": { px: 512, scale: undefined },
  // Maskable icons are cropped to a circle 80% wide; keep the bubble inside it.
  maskable: { px: 512, scale: 0.62 },
};

export function generateImageMetadata() {
  return Object.entries(ICONS).map(([id, { px }]) => ({
    id,
    size: { width: px, height: px },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const { px, scale } = ICONS[(await id) as keyof typeof ICONS];
  return new ImageResponse(<Logo size={px} scale={scale} />, { width: px, height: px });
}
