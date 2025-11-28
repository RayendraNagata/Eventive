import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
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
  title: "Eventive - Discover, Book & Manage Events",
  description: "Eventive - Modern event discovery, ticketing, and QR-based check-in platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="relative min-h-screen">
            {/* Subtle gradient background */}
            <div className="fixed inset-0 -z-10 bg-subtle-gradient" />

            {/* Navbar */}
            <Navbar />

            {/* Main content with top padding for fixed navbar */}
            <main className="pt-16">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
