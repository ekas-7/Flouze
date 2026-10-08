"use client";

import { useEffect } from "react";

/** Tells the server the device's time zone so days and hours group correctly. */
export function TimeZoneCookie() {
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cookie = `tz=${encodeURIComponent(tz)}`;
    if (!document.cookie.split("; ").includes(cookie)) {
      document.cookie = `${cookie}; path=/; max-age=31536000; samesite=lax`;
    }
  }, []);
  return null;
}
