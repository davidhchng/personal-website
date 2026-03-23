import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MouseTrail from "@/components/MouseTrail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "David Chang",
  description: "Personal website — explore via the car.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        <MouseTrail />
        {children}
      </body>
    </html>
  );
}
