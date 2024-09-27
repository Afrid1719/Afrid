import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ParticlesAnimation from "@/components/ParticlesAnimation";
import Header from "@/components/Header";
import DesktopNav from "@/components/DesktopNav";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afrid",
  description: "A webapp created by Afrid"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} text-white relative flex flex-col min-h-screen `}
        id="body-wrapper"
      >
        <Header />
        <DesktopNav />
        <main
          id="page-wrapper"
          className="flex flex-col grow w-full md:w-4/5 lg:w-3/4 max-w-7xl mx-auto py-3"
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
        <ParticlesAnimation />
      </body>
    </html>
  );
}
