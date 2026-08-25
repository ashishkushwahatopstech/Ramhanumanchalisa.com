"use client";

import { useEffect } from "react";

export default function CookieRedirect() {
  useEffect(() => {
    // Parse user preference cookie
    const cookies = document.cookie.split("; ");
    const langCookie = cookies.find((row) => row.startsWith("user-selected-lang="));
    if (langCookie) {
      const lang = langCookie.split("=")[1];
      if (lang && ["en", "te", "bn", "kn"].includes(lang)) {
        window.location.replace(`/hanuman-chalisa/${lang}`);
      }
    }
  }, []);

  return null;
}
