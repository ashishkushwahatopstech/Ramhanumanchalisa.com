"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CarvedDivider from "@/components/CarvedDivider";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already logged in, redirect directly to dashboard
  if (status === "authenticated" && session?.user?.email === "ashishkushwaha88643@gmail.com") {
    router.push("/admin");
  }

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/admin" });
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="bg-stone-ivory border-2 border-brass-gold p-8 rounded-lg shadow-xl text-center space-y-6">
        
        <div className="space-y-2">
          <span className="text-4xl block select-none">🔔</span>
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-maroon-deep uppercase">
            Admin Portal Login
          </h2>
          <p className="text-xs text-charcoal-brown/60">
            Authorization restricted strictly to ashishkushwaha88643@gmail.com
          </p>
        </div>

        <CarvedDivider icon="🕉️" />

        {status === "loading" ? (
          <p className="text-xs text-charcoal-brown/50">Verifying session state...</p>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-ivory/50 text-charcoal-brown border border-brass-gold/40 px-6 py-3 rounded font-bold text-sm shadow hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {/* Google Colored Icon */}
              <svg viewBox="0 0 24 24" width="18" height="18" className="inline">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.77z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.32 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.6H1.21A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.21 5.4l4.11-3.16z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 5.4l4.11 3.16c.94-2.85 3.57-4.96 6.68-4.96z"
                />
              </svg>
              Sign in with Google
            </button>
            
            <p className="text-[10px] text-charcoal-brown/50 italic leading-relaxed">
              Upon clicking, you will be redirected to Google Identity Services. Any unauthorized account will be rejected automatically on callback.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
