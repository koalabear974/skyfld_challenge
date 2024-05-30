import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, } from 'vitest';
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

describe('Sidebar Component', () => {
  it('should render and toggle sidebar', () => {
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );

    // Check that sidebar is open initially
    expect(screen.getByText('Close Sidebar')).toBeDefined()

    // Toggle sidebar
    fireEvent.click(screen.getByText('Close Sidebar'));
    expect(screen.getByText('Open Sidebar')).toBeDefined()
  });

  it('should render close', () => {
    render(
      <SidebarProvider value={false}>
        <Sidebar />
      </SidebarProvider>
    );

    // Check that sidebar is closed initially
    expect(screen.getByText('Open Sidebar')).toBeDefined()
  });

  it('should display menu items', () => {
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );


    // Check that sidebar is open and menu items are visible
    expect(screen.getByText('Close Sidebar')).toBeDefined();
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Add data')).toBeDefined();
    expect(screen.queryByText('Random link')).toBeNull();
  });
});
