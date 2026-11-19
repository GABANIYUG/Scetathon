import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { siteConfig } from "@/config/site";
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
  title: {
    default: "SCETATHON — 24-Hour Inter-College Hackathon | SCET Surat",
    template: "%s | SCETATHON",
  },
  description:
    "Official event platform for SCETATHON — premier 24-hour inter-college hackathon hosted at Sarvajanik College of Engineering & Technology (SCET), Surat, India.",
  keywords: [
    "SCETATHON",
    "SCET Surat",
    "Sarvajanik College of Engineering and Technology",
    "Hackathon",
    "24-Hour Hackathon",
    "Engineering Hackathon",
    "Surat Tech Events",
    "Collegiate Innovation",
  ],
  authors: [{ name: "SCET Organizing Committee" }],
  creator: siteConfig.institution.fullName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://scetathon.scet.ac.in",
    siteName: "SCETATHON",
    title: "SCETATHON — 24-Hour Inter-College Hackathon | SCET Surat",
    description:
      "24 hours of continuous collaborative engineering at Sarvajanik College of Engineering & Technology, Surat.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080B12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
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
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans flex flex-col relative selection:bg-[var(--color-accent-lime)] selection:text-[var(--color-bg-primary)]">
        {/* Persistent Technical Background Grid & Atmosphere */}
        <BackgroundGrid variant="grid" glowLime glowCyan />

        {/* Persistent Shared Global Site Navigation */}
        <Header />

        {/* Route Page Content */}
        <main className="flex-1 relative z-10 flex flex-col">{children}</main>

        {/* Persistent Shared Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
