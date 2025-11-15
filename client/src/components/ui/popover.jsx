import React, { useState, forwardRef } from "react";
import { createPortal } from "react-dom";

// Utility for class concatenation
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Popover Root
const Popover = ({ children, className }) => {
  return <div className={cn("relative inline-block", className)}>{children}</div>;
};

// Popover Trigger
const PopoverTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, { onClick });
};

// Popover Content
const PopoverContent = forwardRef(
  ({ children, className, align = "center", sideOffset = 4, open, setOpen, ...props }, ref) => {
    if (!open) return null;

    const popoverContent = (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 w-72 rounded-md border bg-white p-4 text-gray-900 shadow-md transition-all duration-300",
          "animate-fade-in scale-95 origin-top",
          className
        )}
        style={{
          transformOrigin: "top",
          marginTop: sideOffset,
          left: align === "center" ? "50%" : "0",
          transform: align === "center" ? "translateX(-50%)" : "none",
        }}
        {...props}
      >
        {children}
      </div>
    );

    return createPortal(popoverContent, document.body);
  }
);
PopoverContent.displayName = "PopoverContent";

// Custom hook for toggle
const usePopover = (initialState = false) => {
  const [open, setOpen] = useState(initialState);
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);
  return { open, setOpen, toggle, close };
};

export { Popover, PopoverTrigger, PopoverContent, usePopover };
