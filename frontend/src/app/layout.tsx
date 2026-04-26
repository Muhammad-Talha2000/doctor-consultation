import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carebridgehealth.com"),
  title: {
    default: "CareBridge Health | Online Doctor Consultation Platform",
    template: "%s | CareBridge Health",
  },
  description:
    "Book secure online doctor consultations with certified specialists. Get video visits, digital prescriptions, and follow-up care from home.",
  keywords: [
    "online doctor consultation",
    "telemedicine",
    "video doctor appointment",
    "digital prescription",
    "virtual healthcare",
    "patient portal",
    "doctor appointment online",
  ],
  authors: [{ name: "CareBridge Health" }],
  creator: "CareBridge Health",
  publisher: "CareBridge Health",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://carebridgehealth.com",
    siteName: "CareBridge Health",
    title: "CareBridge Health | Online Doctor Consultation Platform",
    description:
      "Connect with verified doctors online for video consultations, care plans, and trusted follow-ups.",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "CareBridge Health online healthcare platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareBridge Health | Online Doctor Consultation Platform",
    description:
      "Book secure online consultations with certified doctors and receive quality care from home.",
    images: ["/vercel.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
              {children}
        </Providers>
      </body>
    </html>
  );
}
