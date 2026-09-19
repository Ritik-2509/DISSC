import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DISCC India - DEVA International Society for Child Care, Varanasi",
  description: "Humanitarian NGO founded in 1991 by Dr. C. Tulsi Das in Varanasi, India. Dedicated to clinical psychology, intellectual disability rehabilitation, and inclusive child welfare.",
  icons: {
    icon: "/images/discc/logo.png",
  },
};

import { AccessibilityProvider } from "@/components/accessibility/AccessibilityContext";
import { AccessibilityToolbox } from "@/components/accessibility/AccessibilityToolbox";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-white`}
      >
        <AccessibilityProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AccessibilityToolbox />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
