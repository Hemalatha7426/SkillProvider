import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils"; // Or replace with your own helper

// --- HoverCard root ---
const HoverCard = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

// --- HoverCardTrigger ---
const HoverCardTrigger = ({ children }) => {
  return <>{children}</>; // Just a wrapper, hover handled by parent
};

// --- HoverCardContent ---
const HoverCardContent = forwardRef(
  ({ children, className, align = "center", sideOffset = 4, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    // Align classes
    let alignClass = "";
    switch (align) {
      case "start":
        alignClass = "left-0";
        break;
      case "end":
        alignClass = "right-0";
        break;
      default:
        alignClass = "left-1/2 -translate-x-1/2";
    }

    return (
      <div
        ref={ref}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative inline-block"
      >
        {props.trigger}
        {visible && (
          <div
            className={cn(
              "absolute z-50 w-64 rounded-md border bg-white p-4 text-gray-800 shadow-md transition-all duration-200",
              alignClass,
              className
            )}
            style={{
              marginTop: sideOffset,
            }}
            {...props}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
