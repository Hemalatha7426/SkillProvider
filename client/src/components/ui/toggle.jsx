// Toggle.jsx
import React from "react";

// Simple className merge function
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Toggle variants
const toggleVariants = ({ variant = "default", size = "default", active }) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2";

  const variantClasses = {
    default: "bg-transparent",
    outline: "border border-gray-300 bg-transparent hover:bg-blue-100 hover:text-blue-700",
  };

  const sizeClasses = {
    default: "h-10 px-3 min-w-[2.5rem]",
    sm: "h-9 px-2.5 min-w-[2rem]",
    lg: "h-11 px-5 min-w-[3rem]",
  };

  const activeClasses = active ? "bg-blue-500 text-white" : "";

  return cn(base, variantClasses[variant], sizeClasses[size], activeClasses);
};

// Toggle component
export const Toggle = ({ className, variant, size, active = false, onClick, children, ...props }) => {
  return (
    <button
      className={cn(toggleVariants({ variant, size, active }), className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
