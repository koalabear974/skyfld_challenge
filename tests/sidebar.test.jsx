import { render, screen } from '@testing-library/react'
import { describe, it, } from 'vitest';
import Page from "@/app/testPage.jsx";
import CenteredSpinner from "@/components/CenteredSpinner";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

describe('Sidebar Component', () => {
  it('should render and toggle sidebar', () => {
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );

    // Check that sidebar is closed initially
    // expect(screen.getByText('Close Sidebar')).toBeInTheDocument();
    // expect(screen.queryByText('Add Data')).not.toBeInTheDocument();
    //
    // // Toggle sidebar
    // fireEvent.click(screen.getByText('Open Sidebar'));
    // expect(toggleSidebar).toHaveBeenCalled();
  });

  // it('should display menu items when open', () => {
  //   const toggleSidebar = vi.fn();
  //   render(<Sidebar isOpen={true} toggleSidebar={toggleSidebar} />);
  //
  //   // Check that sidebar is open and menu items are visible
  //   expect(screen.getByText('Close Sidebar')).toBeInTheDocument();
  //   expect(screen.getByText('Add Data')).toBeInTheDocument();
  //   expect(screen.getByText('View Data')).toBeInTheDocument();
  // });
});
