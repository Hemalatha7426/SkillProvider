import React, { forwardRef } from "react";

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const ScrollArea = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-auto rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ScrollArea.displayName = "ScrollArea";

const ScrollBar = forwardRef(({ className, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      orientation === "vertical"
        ? "h-full w-2.5 bg-gray-200 rounded"
        : "w-full h-2.5 bg-gray-200 rounded",
      className
    )}
    {...props}
  />
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
