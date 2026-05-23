import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anonymous-pro"
});

export const metadata: Metadata = {
  title: "Mundial 2026",
  description: "Predicciones y ranking del Mundial 2026"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={anonymousPro.variable}>{children}</body>
    </html>
  );
}
