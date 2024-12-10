// File: layout.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: the root file for the project dictating layout details and base layout of page

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavBar } from "@/components/navbar/NavBar";

//fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//page name
export const metadata: Metadata = {
  title: "CloseKnit",
  description: "get inspired!",
};

//root layout including the navbar
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
        <div className="flex h-screen overflow-hidden">
          <div className="flex flex-col flex-grow">
            <NavBar />
            <main className="flex-grow overflow-auto p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
