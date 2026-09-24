import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityContext";
import { AccessibilityToolbox } from "@/components/accessibility/AccessibilityToolbox";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://disccindia.org"),
  title: "DISCC India - DEVA International Society for Child Care, Varanasi",
  description: "Pioneering clinical psychological care and rehabilitation for intellectual disabilities since 1991 in Varanasi. Founded by Dr. C. Tulsi Das, recipient of UP Chief Minister Award.",
  icons: {
    icon: "/images/discc/logo.png",
    apple: "/images/discc/logo.png",
  },
  openGraph: {
    title: "DISCC India - Disability Care & Special Child Rehabilitation",
    description: "Empowering children with intellectual disabilities through holistic education, therapy, and family rehabilitation in Varanasi, Uttar Pradesh.",
    siteName: "DISCC India",
    images: [
      {
        url: "/images/discc/award-ceremony.png",
        width: 1200,
        height: 630,
        alt: "Dr. Tulsi receiving award from UP Chief Minister Yogi Adityanath",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${notoSansDevanagari.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-white`}
      >
        <AccessibilityProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <AccessibilityToolbox />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
