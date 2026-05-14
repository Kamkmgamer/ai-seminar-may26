import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeInit } from "@/components/theme-init";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-seminar-may26.vercel.app"),
  title: "AI Seminar",
  description: "A bilingual workshop guide for getting started with AI agents.",
  openGraph: {
    title: "AI Seminar",
    description: "A bilingual workshop guide for getting started with AI agents.",
    siteName: "AI Seminar",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Seminar 2026 - Bilingual Workshop Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Seminar",
    description: "A bilingual workshop guide for getting started with AI agents.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeInit />
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
