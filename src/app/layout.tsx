import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./_components/header";
import Footer from "./_components/footer";
import { env } from "@/env";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Start Cursor | 10x faster for developers",
  description:
    "Start Cursor is a space that helps you code with cursor faster and more efficiently.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: true,
    follow: true,
  },
  // Open Graph metadata
  openGraph: {
    title: "Start Cursor | 10x faster for developers",
    description:
      "Start Cursor is a space that helps you code with cursor faster and more efficiently.",
    url: env.NEXT_PUBLIC_APP_URL,
    siteName: "Start Cursor",
    images: [
      {
        url: `${env.NEXT_PUBLIC_APP_URL}/logo.jpg`,
        width: 1200, // This is the recommended size in pixels
        height: 1200,
        alt: "Start Cursor og-image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Start Cursor | 10x faster for developers",
    description:
      "Start Cursor is a space that helps you code with cursor faster and more efficiently.",
    creator: "@le0zh0u",
    images: [`${env.NEXT_PUBLIC_APP_URL}/logo.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex h-full w-full flex-col">
        <TRPCReactProvider>
          <main className="flex flex-col items-center justify-center">
            <Navbar />
            {children}
            <Footer />
          </main>
        </TRPCReactProvider>
        <Toaster richColors position="top-center" />
        <GoogleAnalytics gaId="G-HT4Y1M2FV7" />
      </body>
    </html>
  );
}
