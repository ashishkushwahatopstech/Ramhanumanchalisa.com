"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CookieRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Parse user preference cookie
    const cookies = document.cookie.split("; ");
    const langCookie = cookies.find((row) => row.startsWith("user-selected-lang="));
    if (langCookie) {
      const lang = langCookie.split("=")[1];
      if (lang && ["en", "te", "bn", "kn"].includes(lang)) {
        router.replace(`/hanuman-chalisa/${lang}`);
      }
    }
  }, [router]);

  return null;
}
