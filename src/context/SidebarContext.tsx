import { createContext, useContext, useEffect, useState } from "react";

type SidebarProviderProps = {
  children: React.ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

/**
 * Custom hook to access the sidebar context.
 * @returns The value from the sidebar context.
 * @throws Error if used outside of a SidebarProvider.
 */
export function useSidebar() {
  const value = useContext(SidebarContext);
  if (value === null) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return value;
}

/**
 * SidebarProvider component provides state and functions to control the sidebar
 * @param children - The child components
 */
export function SidebarProvider({ children }: SidebarProviderProps) {
  // State to track whether the large sidebar is open
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  // State to track whether the small sidebar is open
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  // Listen for window resize event and update the small sidebar state accordingly
  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };
    window.addEventListener("resize", handler);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  /**
   * Toggle function to open/close the sidebar based on the screen size
   */
  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((s) => !s);
    } else {
      setIsLargeOpen((s) => !s);
    }
  }

  /**
   * Close function to close the sidebar based on the screen size
   */
  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  /**
   * Check if the screen size is small
   * @returns true if the screen size is less than 1024, false otherwise
   */
  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  // Provide the state and functions to the child components using context
  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
