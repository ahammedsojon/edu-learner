import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
// import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { dbConnect } from "@/service/mongo";
import ThemeProvider from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"], // Specify subsets like 'latin', 'cyrillic', etc.
  weight: ["400", "500", "600", "700"], // Specify font weights
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"], // Specify subsets like 'latin', 'cyrillic', etc.
  weight: ["400", "500", "600", "700"], // Specify font weights
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Edu Learner a Learning Platform.",
  description: "Learn && Explore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  dbConnect();
  return (
    <html lang="en">
      <body className={`${cn(inter.className, poppins.className)} dark  `}>
        <div>
          <div className="min-h-[90vh]">{children}</div>
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
