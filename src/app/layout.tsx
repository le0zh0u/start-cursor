import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./_components/header";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "Start Cursor | 10x faster for developers",
  description:
    "Start Cursor is a tool that helps you code with cursor faster and more efficiently.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
