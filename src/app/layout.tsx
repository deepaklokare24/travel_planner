import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = 'https://travel-planner-one-virid.vercel.app';

export const metadata: Metadata = {
  title: "AI Travel Planner - Your Perfect Journey Awaits",
  description: "Plan your perfect trip with our AI-powered travel planner. Get personalized itineraries, local insights, and smart recommendations tailored to your preferences.",
  keywords: ["travel planner", "AI travel", "trip planning", "itinerary generator", "vacation planner"],
  authors: [{ name: "Travel Planner Team" }],
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "AI Travel Planner - Your Perfect Journey Awaits",
    description: "Get personalized travel itineraries with local insights and smart recommendations, tailored to your preferences.",
    url: baseUrl,
    siteName: "AI Travel Planner",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "AI Travel Planner Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Travel Planner - Your Perfect Journey Awaits",
    description: "Plan your perfect trip with our AI-powered travel planner. Get personalized itineraries and local insights.",
    images: ['/opengraph-image'],
    creator: "@travelplanner",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/shortcut-icon.png"],
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#ffffff",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 