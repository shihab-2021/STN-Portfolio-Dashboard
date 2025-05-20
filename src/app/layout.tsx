import type { Metadata } from "next";
import { Sansita, Oleo_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const sansita = Sansita({
  variable: "--font-sansita", // Link this to a CSS variable
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const oleo_script = Oleo_Script({
  variable: "--font-oleo_script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shihab",
  description: "Portfolio Website dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansita.variable} ${oleo_script.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
