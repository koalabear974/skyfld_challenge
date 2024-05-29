"use client";
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import("@/app/components/Sidebar"), {loading: () => <CenteredSpinner/>, ssr: false})
const SensorChart = dynamic(() => import("@/app/components/SensorChart"), {loading: () => <CenteredSpinner/>, ssr: false})
import { useSidebar } from '@/app/context/SidebarContext';
import CenteredSpinner from "@/app/components/CenteredSpinner";

export default function Home() {
  const {isSidebarOpen} = useSidebar();

  return (
    <main className="min-h-screen h-full w-full flex flex-col gap-2 dark:bg-gray-900">
      <Sidebar/>
      <div className={`p-4 ml-16 ${isSidebarOpen ? 'sm:ml-64' : ''} grid gap-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <SensorChart className="" sensorId={1} />
          {/*<SensorChart className="" sensorId={2} />*/}
        </div>
      </div>
    </main>
  );
}
