"use client";
import Sidebar from "@/app/components/Sidebar";
import Chart from "@/app/components/Chart";
import { useSidebar } from '@/app/context/SidebarContext';

export default function Home() {
  const {isSidebarOpen} = useSidebar();

  return (
    <main className="min-h-screen flex flex-col gap-2 dark:bg-gray-900">
      <Sidebar/>
      <div className={`p-4 ml-16 ${isSidebarOpen ? 'sm:ml-64' : ''}`}>
        <Chart/>
      </div>
    </main>
  );
}
