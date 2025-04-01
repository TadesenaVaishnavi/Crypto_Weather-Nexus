import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // Import Navbar
import Notifications from "../components/Notifications"; // Import Notifications
import LiveCrypto from "../components/LiveCrypto"; // Import LiveCrypto component

// Set fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the page
export const metadata: Metadata = {
  title: "CryptoWeather Nexus",
  description: "Crypto and Weather Dashboard",
};

// RootLayout Component
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
        {/* Navbar Component */}
        <Navbar />

        {/* Notifications for price/weather alerts */}
        <Notifications />

        {/* Live Crypto Prices Component */}


        {/* Main content of the page */}
        {children}
      </body>
    </html>
  );
}
