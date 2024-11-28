import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/providers/ThemeProvider";
import { dbConnect } from "@/service/mongo";
import { Toaster } from "@/components/ui/sonner";

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
        <div className="dark:bg-gray-800">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
