import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ibarraRealNova = localFont({
  src: "./fonts/IbarraRealNova-Regular.ttf",
  variable: "--font-ibarra",
});

const aboreto = localFont({
  src: "./fonts/Aboreto-Regular.ttf",
  variable: "--font-aboreto",
});

export const metadata: Metadata = {
  title: "SustAIn",
  description: "RBC Sustain app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibarraRealNova.variable} ${aboreto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
