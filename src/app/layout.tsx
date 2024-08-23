import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import AuthProvider from "@/components/AuthProvider";
import React from "react";
import { Toaster } from "react-hot-toast";
import StickyHeader from "@/components/StickyHeader";

const nunito = Nunito({ subsets: ["latin"] });

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
        <body className={`${nunito.className} text-white`} id="body-wrapper">
          <MobileNav
            pageWrapperId="page-wrapper"
            outerContainerId="body-wrapper"
            className="block md:hidden"
          />
          <StickyHeader />
          <main
            id="page-wrapper"
            className="flex flex-col w-full md:w-4/5 lg:w-3/4 max-w-7xl mx-auto py-3"
          >
            {children}
          </main>
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
