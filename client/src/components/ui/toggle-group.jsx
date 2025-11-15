// ToggleGroup.jsx
import React, { createContext, useContext } from "react";

// Simple className merge function
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Define context to share size and variant
const ToggleGroupContext = createContext({
  size: "default",
  variant: "default",
});

export const ToggleGroup = ({ className, variant = "default", size = "default", children, ...props }) => {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <div
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
};

// ToggleGroupItem component
export const ToggleGroupItem = ({ className, children, variant, size, active, onClick, ...props }) => {
  const context = useContext(ToggleGroupContext);

  // Determine final variant/size
  const appliedVariant = variant || context.variant;
  const appliedSize = size || context.size;

  // Tailwind styles based on variant and size
  const baseClasses = "rounded-md border transition-colors focus:outline-none cursor-pointer";
  const variantClasses = appliedVariant === "default"
    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
    : appliedVariant === "destructive"
    ? "bg-red-500 text-white hover:bg-red-600"
    : "";

  const sizeClasses = appliedSize === "sm"
    ? "px-2 py-1 text-sm"
    : appliedSize === "lg"
    ? "px-4 py-2 text-lg"
    : "px-3 py-2 text-base";

  const activeClasses = active ? "ring-2 ring-blue-500" : "";

  return (
    <button
      className={cn(baseClasses, variantClasses, sizeClasses, activeClasses, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
