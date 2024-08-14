import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afrid",
  description: "A webapp created by Afrid"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} text-white`} id="body-wrapper">
          <MobileNav
            pageWrapperId="page-wrapper"
            outerContainerId="body-wrapper"
            className="block md:hidden"
          />
          <Header />
          <DesktopNav />
          <main id="page-wrapper">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{ duration: 3000 }}
          />
        </body>
      </AuthProvider>
    </html>
  );
}
