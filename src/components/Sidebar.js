"use client";
import { Sidebar, useThemeMode } from "flowbite-react";
import {
  HiChartPie,
  HiMenuAlt2,
  HiOutlineMoon, HiOutlinePlusCircle,
  HiOutlineSun
} from "react-icons/hi";
import { useSidebar } from '@/context/SidebarContext';

// Theme taken from https://flowbite-react.com/docs/components/sidebar#theme
const customSidebarTheme = {
  "root": {
    "base": "fixed top-0 left-0 z-40 w-64 min-h-screen h-full transition-all",
  }
};

const DashboardSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const themeMode = useThemeMode();
  const isLightMode = themeMode.computedMode === 'light';

  return (
    <>
      <Sidebar
        theme={customSidebarTheme}
        collapseBehavior="collapse"
        collapsed={!isSidebarOpen}
        aria-label="Dashbaord sidebar"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiMenuAlt2} onClick={() => toggleSidebar()}>
              {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/add-data" icon={HiOutlinePlusCircle}>
              Add data
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              onClick={themeMode.toggleMode}
              icon={isLightMode ? HiOutlineMoon : HiOutlineSun}
            >
              {isLightMode ? 'Dark Mode' : 'Light Mode'}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}

export default DashboardSidebar;