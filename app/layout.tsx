import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SCETATHON — 24-Hour National Hackathon",
  description: "Official event platform for SCETATHON — 24-hour inter-college hackathon at Sarvajanik College of Engineering & Technology, Surat.",
};

export const viewport: Viewport = {
  themeColor: "#080B12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
