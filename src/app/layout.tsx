import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Elite Limo | Premium Luxury Transportation",
  description:
    "Experience luxury beyond compare with Elite Limo. Premium limousine services for airport transfers, weddings, corporate events, proms, wine tours, and VIP occasions. 24/7 availability with professional chauffeurs.",
  keywords: [
    "limousine",
    "luxury transportation",
    "airport transfer",
    "wedding limo",
    "corporate travel",
    "prom limo",
    "wine tour",
    "VIP service",
    "chauffeur",
    "party bus",
    "rental",
  ],
  authors: [{ name: "Elite Limo" }],
  icons: {
    icon: "/images/misc/logo.png",
  },
  openGraph: {
    title: "Elite Limo | Premium Luxury Transportation",
    description:
      "Experience luxury beyond compare. Premium limousine services for every occasion.",
    siteName: "Elite Limo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Limo | Premium Luxury Transportation",
    description:
      "Experience luxury beyond compare. Premium limousine services for every occasion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
