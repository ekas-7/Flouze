import type { Metadata, Viewport } from "next";
import { TimeZoneCookie } from "@/components/time-zone-cookie";
import { BRAND, IPHONES } from "./brand";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND.name,
  description: "Log every expense in seconds.",
  applicationName: BRAND.name,
  appleWebApp: {
    capable: true,
    title: BRAND.name,
    statusBarStyle: "default",
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
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-dvh flex flex-col">
        {children}
        <TimeZoneCookie />
      </body>
    </html>
  );
}
