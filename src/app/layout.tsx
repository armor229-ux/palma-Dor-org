import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Montserrat, Amiri } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Palma d'Or — The Jewel of Marrakech",
  description:
    "Handcrafted artisanal dates, customized for your most cherished moments. Premium luxury dates from Marrakech for Ramadan, weddings, and exclusive celebrations.",
  keywords: [
    "Palma d'Or",
    "luxury dates",
    "Marrakech",
    "artisanal dates",
    "Ramadan",
    "wedding",
    "premium dates",
    "Moroccan luxury",
  ],
  icons: {
    icon: "/images/brand/emblem.png",
  },
  openGraph: {
    title: "Palma d'Or — The Jewel of Marrakech",
    description:
      "Handcrafted artisanal dates, customized for your most cherished moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} ${montserrat.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
