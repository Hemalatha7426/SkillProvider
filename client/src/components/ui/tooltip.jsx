// Tooltip.jsx
import React, { useState, useRef } from "react";

// Simple className merge
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Tooltip component
export const Tooltip = ({ children, content, side = "top", className }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), 100); // delay for smoothness
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  // Position classes
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {open && (
        <div
          className={cn(
            "absolute z-50 rounded-md border bg-white px-3 py-1.5 text-sm text-black shadow-md transition-all duration-150",
            sideClasses[side],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
