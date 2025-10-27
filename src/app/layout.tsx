import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const toyotaFont = localFont({
  src: "../../public/fonts/avenir95-black.ttf",
});

export const metadata: Metadata = {
  title: "SSRFID Newland",
  description: "Módulo de gestão do inventário ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${toyotaFont.className} min-h-svh flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
