import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { SidebarProvider } from "@/app/context/SidebarContext";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "SKYFLD Dashboard",
  description: "View, and add sensor data dashboard",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript/>
      </head>
      <body className={inter.className}>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
