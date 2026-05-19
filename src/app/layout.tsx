import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const typewriter = Special_Elite({
  variable: "--font-typewriter",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PUNNI | Custom Crafted",
  description: "Elite, handcrafted digital product studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={typewriter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

