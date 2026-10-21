import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aqlan Naqib | Computer Science Student & Software Developer",
  description:
    "Modern portfolio of Aqlan Naqib — Computer Science student at Sheffield Hallam University building web, AI, and data-driven software solutions.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

// Runs before first paint: visitors who already watched the intro this session
// never see it flash before React hydrates.
const introSeenScript = `try{if(sessionStorage.getItem("an-intro-seen")==="1")document.documentElement.setAttribute("data-intro-skip","")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introSeenScript }} />
        <noscript>
          <style>{`.intro{display:none!important}.reveal{opacity:1!important;transform:none!important}body{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
