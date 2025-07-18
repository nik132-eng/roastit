import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RoastIt",
  description: "Roast my photo. Roast my drawing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Header />
          <div className="pt-20 flex-1">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
