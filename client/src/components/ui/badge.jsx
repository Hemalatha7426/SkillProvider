import React from "react";

// Badge component
export function Badge({ variant = "default", className = "", children, ...props }) {
  let baseClasses =
    "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-md";

  // Variant classes
  let variantClasses = "";
  switch (variant) {
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-800 border-transparent";
      break;
    case "destructive":
      variantClasses = "bg-red-500 text-white border-transparent";
      break;
    case "outline":
      variantClasses = "border border-gray-400 bg-transparent text-gray-800";
      break;
    default:
      variantClasses = "bg-blue-500 text-white border-transparent";
  }

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}
