"use client";
import React, { createContext, useContext, useState } from 'react';

// Create context
const SidebarContext = createContext();

// Create provider
export const SidebarProvider = ({children}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <SidebarContext.Provider value={{isSidebarOpen, toggleSidebar}}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);