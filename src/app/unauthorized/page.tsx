import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";

export default function UnauthorizedPage() {
  return (
    <div className="max-w-md mx-auto text-center space-y-6 py-12">
      <span className="text-5xl block select-none">🛑</span>
      <h2 className="font-serif-display text-2xl font-bold text-maroon-deep uppercase">
        Access Denied (403)
      </h2>
      <p className="text-sm text-charcoal-brown/85 leading-relaxed">
        Your account is not authorized to access the Admin Panel. Only the primary administrator email (<code>ashishkushwaha88643@gmail.com</code>) is allowed access.
      </p>
      
      <CarvedDivider icon="🕉️" />

      <div className="pt-2">
        <Link
          href="/"
          className="bg-maroon-deep hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-6 py-2 rounded text-xs font-bold uppercase border border-brass-gold shadow"
        >
          Return to Mandir Homepage
        </Link>
      </div>
    </div>
  );
}
