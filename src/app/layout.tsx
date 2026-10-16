import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Great_Vibes,
  Amiri,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ameenuddin-weds-madeeha.wedding"
  ),
  title: "Noushad Mohammed & Asma Thashreefa — Wedding Invitation",
  description:
    "A wedding invitation for the Mehfil-e-Nikah on 25 November 2026 in Mangalore, Karnataka.",
  openGraph: {
    title: "Noushad Mohammed & Asma Thashreefa — Wedding Invitation",
    description:
      "A wedding invitation for the Mehfil-e-Nikah on 25 November 2026 in Mangalore, Karnataka.",
    images: [
      {
        url: "/images/wedding-artwork.png",
        width: 1200,
        height: 800,
        alt: "Wedding Invitation - Noushad Mohammed & Asma Thashreefa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noushad Mohammed & Asma Thashreefa — Wedding Invitation",
    description:
      "Mehfil-e-Nikah: 25 November 2026 | Mangalore, Karnataka",
    images: ["/images/wedding-artwork.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#243A2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} ${amiri.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8F3E8] text-[#302E27] font-sans antialiased selection:bg-[#B58B35]/20 selection:text-[#243A2D] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
