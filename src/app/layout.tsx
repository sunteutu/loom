import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
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
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
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
              <div className="flex min-h-screen">
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
