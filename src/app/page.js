"use client";
import dynamic from 'next/dynamic'
const SensorChart = dynamic(() => import("@/components/SensorChart"), {loading: () => <CenteredSpinner/>, ssr: false})
import { useSidebar } from '@/context/SidebarContext';
import CenteredSpinner from "@/components/CenteredSpinner";

export default function Home() {
  const {isSidebarOpen} = useSidebar();

  return (
    <div className={`p-4 ml-16 ${isSidebarOpen ? 'sm:ml-64' : ''} grid gap-4`}>
      <div className="grid gap-4 lg:grid-cols-2">
        <SensorChart className="" sensorId={1} />
        <SensorChart className="" sensorId={2} chartColor="#D4526E" />
      </div>
    </div>
  );
}
