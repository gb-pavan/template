import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWithErrorBoundary from '../components/error-boundary/withErrorBoundaryWrapper';
import { MantineProviderWrapper } from '@/context/MantineProviderWrapper';
import Sidebar from "@/components/Sidebar/Sidebar";
import { StoreProvider } from "../context/StoreProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import  SessionProviderWrapper  from "@/context/SessionProviderWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <ThemeProvider >
            <StoreProvider >
              {/* <div className="w-full h-screen flex bg-red-500">
                <div className="w-1/5 bg-blue-500 p-4">
                  <p className="text-white">1/5th width</p>
                </div>

                <div className="w-4/5 bg-green-500 p-4">
                  <p className="text-white">4/5th width</p>
                </div>
                {children}
              </div>
            <LayoutWithErrorBoundary>{children}</LayoutWithErrorBoundary> */}
            {children}
            </StoreProvider>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

