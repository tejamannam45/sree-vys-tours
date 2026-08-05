import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { BUSINESS } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BUSINESS.name} | Car Travels in Vijayawada`,
  description: `${BUSINESS.tagline}. Local trips, outstation routes, airport transfers, and corporate travel in Vijayawada. ${BUSINESS.values}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
