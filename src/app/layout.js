import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import dynamic from "next/dynamic";
import CenteredSpinner from "@/components/CenteredSpinner";
const Sidebar = dynamic(() => import("@/components/Sidebar"), {loading: () => <CenteredSpinner/>, ssr: false})

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
        <main className="min-h-screen h-full w-full flex flex-col gap-2 dark:bg-gray-900">
          <Sidebar />
          {children}
        </main>
      </SidebarProvider>
      </body>
    </html>
);
}
