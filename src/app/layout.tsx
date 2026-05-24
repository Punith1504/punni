import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const typewriter = Special_Elite({
  variable: "--font-typewriter",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://punni.vercel.app"),
  title: "PUNNI Studio | Custom Crafted Digital Products",
  description: "Elite, handcrafted digital product studio specializing in high-performance web applications, AI integration, and premium UI/UX design.",
  keywords: "digital agency, web development, UI/UX design, Next.js, AI integration, custom software",
  authors: [{ name: "PUNNI Studio" }],
  openGraph: {
    title: "PUNNI Studio | Custom Crafted Digital Products",
    description: "Elite, handcrafted digital product studio specializing in high-performance web applications, AI integration, and premium UI/UX design.",
    url: "https://punni.vercel.app",
    siteName: "PUNNI Studio",
    images: [
      {
        url: "/portrait.png",
        width: 800,
        height: 600,
        alt: "PUNNI Studio Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PUNNI Studio | Custom Crafted Digital Products",
    description: "Elite, handcrafted digital product studio specializing in high-performance web applications.",
    images: ["/portrait.png"],
  },
  alternates: {
    canonical: "https://punni.vercel.app",
  },
};

import ChatWidget from "@/components/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={typewriter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}

