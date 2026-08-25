import type { Metadata } from "next";
import { Marcellus, Tiro_Devanagari_Hindi, Mukta, Inter } from "next/font/google";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "./globals.css";

// Google Fonts Config
const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  variable: "--font-tiro-devanagari",
  subsets: ["devanagari"],
  weight: "400",
});

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["devanagari", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ram Hanuman Chalisa",
    default: "Shree Hanuman Chalisa — Audio, Meaning, PDF & Recitation Guide",
  },
  description: "Step into our digital mandir. Read the authentic Hanuman Chalisa in Devanagari, English, and Gujarati, with line-by-line Hindi/English meanings, synced audio, PDF, and path vidhi.",
  keywords: ["hanuman chalisa", "shree hanuman chalisa", "hanuman chalisa lyrics", "hanuman chalisa meaning", "hanuman chalisa pdf", "hanuman chalisa audio"],
  metadataBase: new URL("https://ramhanumanchalisa.com"),
  alternates: {
    canonical: "https://ramhanumanchalisa.com",
    languages: {
      "hi": "https://ramhanumanchalisa.com",
      "en": "https://ramhanumanchalisa.com/hanuman-chalisa/en",
      "te": "https://ramhanumanchalisa.com/hanuman-chalisa/te",
      "bn": "https://ramhanumanchalisa.com/hanuman-chalisa/bn",
      "kn": "https://ramhanumanchalisa.com/hanuman-chalisa/kn",
      "x-default": "https://ramhanumanchalisa.com",
    },
  },
  openGraph: {
    title: "Shree Hanuman Chalisa — Audio, Meaning, PDF & Recitation Guide",
    description: "Read, listen, and understand the Hanuman Chalisa. Complete verse translations, word meanings, and audio sync inside a digital temple environment.",
    url: "https://ramhanumanchalisa.com",
    siteName: "Ram Hanuman Chalisa",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Hanuman Chalisa — Audio, Meaning, PDF & Recitation Guide",
    description: "Step into our digital mandir. Learn recitation rules, listen to synced audio, and download custom WhatsApp statuses.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${tiroDevanagari.variable} ${mukta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-stone-ivory text-charcoal-brown selection:bg-marigold selection:text-maroon-deep">
        
        {/* Top Header / Mandir Entrance */}
        <header className="no-print w-full bg-maroon-deep border-b-4 border-brass-gold text-stone-ivory sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              {/* Logo / Title */}
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl sm:text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-300">🔔</span>
                <div>
                  <h1 className="font-serif-display text-lg sm:text-xl font-bold tracking-wider text-marigold uppercase leading-none">
                    Ram Hanuman Chalisa
                  </h1>
                  <p className="text-[10px] sm:text-xs text-brass-gold tracking-widest leading-none mt-1">
                    श्री राम जय राम जय जय राम
                  </p>
                </div>
              </Link>
              
              {/* Desktop Pillars Nav (Courtyard Walkways) */}
              <nav className="hidden lg:flex space-x-5 text-xs font-semibold tracking-wide">
                <Link href="/" className="hover:text-marigold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-marigold">
                  Hanuman Chalisa
                </Link>
                <Link href="/hanuman-chalisa-meaning" className="hover:text-marigold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-marigold">
                  Meaning
                </Link>
                <Link href="/hanuman-chalisa-audio-mp3" className="hover:text-marigold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-marigold">
                  Synced Audio
                </Link>
                <Link href="/sankat-mochan-hanumanashtak" className="hover:text-marigold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-marigold">
                  Hanumanashtak
                </Link>
                <Link href="/hanuman-aarti" className="hover:text-marigold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-marigold">
                  Aarti
                </Link>
                <Link href="/hanuman-chalisa-benefits" className="hover:text-marigold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-marigold">
                  Benefits
                </Link>
                <Link href="/hanuman-chalisa-pdf" className="hover:text-marigold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-marigold">
                  PDF Print
                </Link>
              </nav>

              {/* Extra Right Button & Language Switcher */}
              <div className="flex items-center gap-3">
                <LanguageSwitcher />

                <Link
                  href="/shri-hanuman-chalisa-path-vidhi"
                  className="hidden md:inline-block bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-3 py-1.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300"
                >
                  How to Recite
                </Link>
              </div>

            </div>
          </div>
        </header>

        {/* Main Content (Courtyard / Sanctum) */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 md:pb-12">
          {children}
        </main>

        {/* Footer (Mandir Foundation) */}
        <footer className="no-print bg-charcoal-brown text-stone-ivory border-t-8 border-maroon-deep py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Branding Column */}
              <div className="md:col-span-2">
                <h3 className="font-serif-display text-xl text-marigold uppercase tracking-wider mb-3">
                  Ram Hanuman Chalisa
                </h3>
                <p className="text-sm text-stone-ivory/80 max-w-sm leading-relaxed">
                  A digital sanctum created to offer devotees a pure, immersive, and educational space to read, hear, and digest the glorious verses composed by Goswami Tulsidas. Reviewed by traditional scholars to ensure absolute accuracy of translation and context.
                </p>
                <p className="mt-4 text-xs text-brass-gold">
                  © {new Date().getFullYear()} RamHanumanChalisa.com. All Rights Reserved.
                </p>
              </div>

              {/* Quick Links Column */}
              <div>
                <h4 className="font-serif-display text-sm uppercase tracking-widest text-marigold mb-4">
                  Pillars
                </h4>
                <ul className="space-y-2 text-sm text-stone-ivory/80">
                  <li><Link href="/" className="hover:text-marigold transition-colors">Hanuman Chalisa Text</Link></li>
                  <li><Link href="/hanuman-chalisa-meaning" className="hover:text-marigold transition-colors">Bilingual Meanings</Link></li>
                  <li><Link href="/hanuman-chalisa-audio-mp3" className="hover:text-marigold transition-colors">Audio Synced Player</Link></li>
                  <li><Link href="/shri-hanuman-chalisa-path-vidhi" className="hover:text-marigold transition-colors">Recitation Rules</Link></li>
                  <li><Link href="/hanuman-chalisa-pdf" className="hover:text-marigold transition-colors">PDF & Image Downloads</Link></li>
                </ul>
              </div>

              {/* Supporting Texts & Admin */}
              <div>
                <h4 className="font-serif-display text-sm uppercase tracking-widest text-marigold mb-4">
                  Devotional Texts
                </h4>
                <ul className="space-y-2 text-sm text-stone-ivory/80">
                  <li><Link href="/bajrang-baan" className="hover:text-marigold transition-colors">Bajrang Baan</Link></li>
                  <li><Link href="/sankat-mochan-hanumanashtak" className="hover:text-marigold transition-colors">Hanumanashtak</Link></li>
                  <li><Link href="/hanuman-aarti" className="hover:text-marigold transition-colors">Hanuman Aarti</Link></li>
                  <li><Link href="/ram-hanuman-chalisa" className="hover:text-marigold transition-colors">Shree Ram & Hanuman</Link></li>
                  <li><Link href="/blog" className="hover:text-marigold transition-colors">Bhakti Blog</Link></li>
                </ul>
              </div>

            </div>

            <hr className="my-8 border-stone-ivory/20" />

            {/* Compliance & Verification footer links */}
            <div className="flex flex-wrap justify-between items-center gap-4 text-xs text-stone-ivory/60">
              <div className="flex gap-4">
                <Link href="/about" className="hover:text-marigold">About Us</Link>
                <Link href="/contact" className="hover:text-marigold">Contact</Link>
                <Link href="/privacy-policy" className="hover:text-marigold">Privacy Policy</Link>
                <Link href="/disclaimer" className="hover:text-marigold">Disclaimer</Link>
                <Link href="/faq" className="hover:text-marigold">FAQ</Link>
                <Link href="/admin" className="hover:text-marigold font-bold text-brass-gold">Admin Portal</Link>
              </div>
              <p className="max-w-md text-right text-[10px] md:text-xs">
                Disclaimer: The materials provided are for devotional, cultural, and educational purposes. AdSense slots are integrated layout-stable.
              </p>
            </div>

          </div>
        </footer>

        {/* Sticky Bottom Nav (Mobile Pillar Shortcuts) */}
        <nav className="no-print md:hidden fixed bottom-0 left-0 right-0 bg-maroon-deep border-t-2 border-brass-gold text-stone-ivory z-40 flex justify-around items-center h-16 shadow-2xl">
          <Link href="/" className="flex flex-col items-center justify-center w-full h-full hover:text-marigold transition-colors text-xs gap-0.5">
            <span className="text-lg">🕉️</span>
            <span>Text</span>
          </Link>
          <Link href="/hanuman-chalisa-meaning" className="flex flex-col items-center justify-center w-full h-full hover:text-marigold transition-colors text-xs gap-0.5">
            <span className="text-lg">📖</span>
            <span>Meaning</span>
          </Link>
          <Link href="/hanuman-chalisa-audio-mp3" className="flex flex-col items-center justify-center w-full h-full hover:text-marigold transition-colors text-xs gap-0.5">
            <span className="text-lg">🎵</span>
            <span>Audio</span>
          </Link>
          <Link href="/hanuman-chalisa-pdf" className="flex flex-col items-center justify-center w-full h-full hover:text-marigold transition-colors text-xs gap-0.5">
            <span className="text-lg">📄</span>
            <span>PDF</span>
          </Link>
          <Link href="/hanuman-chalisa-benefits" className="flex flex-col items-center justify-center w-full h-full hover:text-marigold transition-colors text-xs gap-0.5">
            <span className="text-lg">✨</span>
            <span>Benefits</span>
          </Link>
        </nav>

      </body>
    </html>
  );
}
