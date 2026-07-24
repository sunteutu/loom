import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Oswald,
  Pixelify_Sans,
  Silkscreen,
  Space_Grotesk,
  Unbounded,
  VT323,
} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { DevIndicatorDock } from "@/components/DevIndicatorDock";
import { ScratchCanvas } from "@/components/ScratchCanvas";
import { Sidebar } from "@/components/Sidebar";
import { ThemeDecorations } from "@/components/ThemeDecorations";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSync } from "@/components/ThemeSync";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Theme display fonts: each custom theme in globals.css picks up the variable
// it needs; they are self-hosted subsets, loaded once for the whole app.
const vhsFont = VT323({
  variable: "--font-vhs",
  subsets: ["latin"],
  weight: "400",
});

const stitchFont = Pixelify_Sans({
  variable: "--font-stitch",
  subsets: ["latin"],
});

const flapFont = Oswald({
  variable: "--font-flap",
  subsets: ["latin"],
});

// fontul pixel Y2K al ferestrei „loom.exe" din hero (Retro Nostalgia)
const pixelFont = Silkscreen({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Tribunul 3000: titluri de gazetă holografică + textul curent al temei;
// latin-ext ca diacriticele românești să nu cadă pe fallback
const tribunFont = Unbounded({
  variable: "--font-tribun",
  subsets: ["latin-ext"],
  weight: ["400", "600", "800", "900"],
});

const tribunSans = Space_Grotesk({
  variable: "--font-tribun-sans",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Loom",
  description:
    "Gold-standard market & UX research indicators and study builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${vhsFont.variable} ${stitchFont.variable} ${flapFont.variable} ${pixelFont.variable} ${tribunFont.variable} ${tribunSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <ClerkProvider>
            <ConvexClientProvider>
              <ThemeSync />
              <DevIndicatorDock />
              <ScratchCanvas />
              <ThemeDecorations />
              <div className="relative z-[1] flex min-h-screen flex-col md:flex-row">
                <Sidebar />
                <div
                  id="main-content"
                  tabIndex={-1}
                  className="flex min-w-0 flex-1 flex-col"
                >
                  {children}
                </div>
              </div>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
