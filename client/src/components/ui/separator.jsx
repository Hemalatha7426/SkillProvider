import React, { forwardRef } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Separator = forwardRef(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          "bg-gray-300 shrink-0",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
