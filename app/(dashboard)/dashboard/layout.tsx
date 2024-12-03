import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/providers/ThemeProvider";
import { dbConnect } from "@/service/mongo";
import { AppSidebar } from "./_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        {/* <AppSidebar /> */}
        {/* <div>{children}</div> */}
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-full">
            <SidebarTrigger />
            <div className="p-5">{children}</div>
          </main>
        </SidebarProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
