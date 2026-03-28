import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexusHack 2025 — Build the Impossible",
  description:
    "NexusHack 2025 is a 48-hour global hackathon bringing together 1200+ innovators to solve real-world problems across AI, Climate, Health, Web3, and more. ₹50K in prizes. September 30 – October 1, 2025.",
  keywords: [
    "hackathon",
    "NexusHack",
    "2025",
    "AI",
    "machine learning",
    "climate tech",
    "web3",
    "innovation",
    "coding competition",
  ],
  openGraph: {
    title: "NexusHack 2025 — Build the Impossible",
    description:
      "48-hour global hackathon with ₹50K in prizes. Join 1200+ innovators on Sept 30 – Oct 1, 2025.",
    type: "website",
    url: "https://nexushack.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusHack 2025 — Build the Impossible",
    description:
      "48-hour global hackathon with ₹50K in prizes. Join 1200+ innovators on Sept 30 – Oct 1, 2025.",
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
      className={`${bebasNeue.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body className="bg-nh-bg text-nh-text font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111525",
              border: "1px solid rgba(0, 245, 196, 0.2)",
              color: "#e8eaf2",
            },
          }}
        />
      </body>
    </html>
  );
}
