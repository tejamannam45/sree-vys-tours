import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { BUSINESS } from "@/lib/site";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import Script from "next/script";
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
  metadataBase: new URL(BUSINESS.websiteUrl),
  title: {
    default: `${BUSINESS.name} | Best Car Travels & Taxi Service in Vijayawada`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: `${BUSINESS.tagline}. Safe, reliable, and comfortable car rentals and taxi services in Vijayawada. Book local trips, outstation cabs (Hyderabad, Tirupati, Vizag), and airport transfers. 24x7 service.`,
  keywords: [
    "car travels in vijayawada",
    "taxi service in vijayawada",
    "car rentals vijayawada",
    "outstation cabs vijayawada",
    "airport taxi vijayawada",
    "sree vys tours and travels",
    "vijayawada travels",
    "vijayawada to hyderabad cab",
    "vijayawada to tirupati taxi",
    "luxury car rentals vijayawada",
    "wedding car rental vijayawada",
    "vijayawada travel agency",
    "one way cabs vijayawada",
    "safe travels for women vijayawada",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BUSINESS.name} | Best Car Travels & Taxi Service in Vijayawada`,
    description: `Safe, reliable, and comfortable car rentals & taxi services in Vijayawada. Best rates for local trips, outstation travel (Hyderabad, Tirupati, Vizag), and airport transfers. 24x7 service.`,
    url: BUSINESS.websiteUrl,
    siteName: BUSINESS.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-car.jpg",
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} - Car Travels in Vijayawada`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | Best Car Travels in Vijayawada`,
    description: `Safe, reliable & premium car rentals in Vijayawada. Outstation trips, airport taxi, wedding and corporate travel packages with experienced drivers.`,
    images: ["/images/hero-car.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}

