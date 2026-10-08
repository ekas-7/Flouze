import type { Metadata, Viewport } from "next";
import { BRAND, IPHONES } from "./brand";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND.name,
  description: "Make money moves.",
  applicationName: BRAND.name,
  appleWebApp: {
    capable: true,
    title: BRAND.name,
    statusBarStyle: "black-translucent",
    startupImage: IPHONES.map(({ name, width, height }) => ({
      url: `/splash/${name}`,
      media: `(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
    })),
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: BRAND.background,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
