import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/site/Cursor";
import RidgeHorizon from "@/components/site/RidgeHorizon";
import CommandPalette from "@/components/site/CommandPalette";
import Toast from "@/components/site/Toast";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

const TITLE = "David Chang";
const DESCRIPTION =
  "David (Hanmin) Chang — Computer Science and Statistics at UBC. Projects, experience and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: TITLE,
  authors: [{ name: "David (Hanmin) Chang" }],
  openGraph: {
    type: "website",
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/v/coverphoto.jpg", width: 900, height: 1194, alt: "David (Hanmin) Chang" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/v/coverphoto.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F6F8" },
    { media: "(prefers-color-scheme: dark)",  color: "#0D141A" },
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
      <body className={`${serif.variable} antialiased`}>
        <a href="#top" className="skip-link">Skip to content</a>
        <RidgeHorizon />
        {children}
        <div className="grain" aria-hidden />
        <CommandPalette />
        <Toast />
        <Cursor />
      </body>
    </html>
  );
}
