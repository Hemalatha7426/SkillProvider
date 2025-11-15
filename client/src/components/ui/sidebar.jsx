import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { X, PanelLeftIcon } from "lucide-react";

// Utils
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Constants
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// Sidebar Context
const SidebarContext = createContext(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

// Sidebar Provider
export function SidebarProvider({ children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = window.innerWidth < 768;

  const toggleSidebar = useCallback(() => {
    isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
  }, [isMobile]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const value = useMemo(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, isMobile, openMobile, toggleSidebar]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

// Sidebar Component
export function Sidebar({ children, side = "left", collapsible = "offcanvas" }) {
  const { state, openMobile, setOpenMobile, isMobile } = useSidebar();

  if (isMobile) {
    return openMobile ? (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setOpenMobile(false)}
        />
        <div
          className={cn(
            "relative bg-gray-800 text-white w-[var(--sidebar-width)] p-4 flex flex-col transition-transform",
            side === "right" ? "ml-auto" : "mr-auto"
          )}
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
        >
          <button
            className="self-end p-1 hover:bg-gray-700 rounded"
            onClick={() => setOpenMobile(false)}
          >
            <X />
          </button>
          {children}
        </div>
      </div>
    ) : null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 z-10 flex flex-col bg-gray-800 text-white transition-[width] duration-200",
        state === "collapsed" ? "w-12" : "w-[var(--sidebar-width)]"
      )}
      style={{ "--sidebar-width": SIDEBAR_WIDTH }}
    >
      {children}
    </div>
  );
}

// Sidebar Trigger
export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded"
    >
      <PanelLeftIcon />
    </button>
  );
}

// Sidebar Header
export const SidebarHeader = ({ children }) => (
  <div className="p-2 text-sm font-bold">{children}</div>
);

// Sidebar Footer
export const SidebarFooter = ({ children }) => (
  <div className="p-2 mt-auto">{children}</div>
);

// Sidebar Menu & Items
export const SidebarMenu = ({ children }) => <ul className="flex flex-col p-2">{children}</ul>;
export const SidebarMenuItem = ({ children }) => (
  <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">{children}</li>
);

// Sidebar Group
export const SidebarGroup = ({ children, label }) => (
  <div className="mb-2">
    {label && <div className="px-2 text-xs text-gray-400 uppercase">{label}</div>}
    <div className="flex flex-col">{children}</div>
  </div>
);
