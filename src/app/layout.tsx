import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/site/Cursor";
import CommandPalette from "@/components/site/CommandPalette";
import Toast from "@/components/site/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "David Chang",
  description: "David (Hanmin) Chang — Computer Science and Statistics at UBC. Projects, experience and contact.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)",  color: "#0C0E0C" },
  ],
};

// Runs before paint so the saved / system theme never flashes
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${serif.variable} antialiased`}>
        {children}
        <div className="grain" aria-hidden />
        <CommandPalette />
        <Toast />
        <Cursor />
      </body>
    </html>
  );
}
