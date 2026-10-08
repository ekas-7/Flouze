import { ImageResponse } from "next/og";
import { Logo } from "./brand";

export function generateImageMetadata() {
  return [192, 512].map((px) => ({
    id: String(px),
    size: { width: px, height: px },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const px = Number(await id);
  return new ImageResponse(<Logo size={px} />, { width: px, height: px });
}
