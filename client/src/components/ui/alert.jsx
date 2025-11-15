import React from "react";

// Utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join("");

// Alert component with variant support
export function Alert({ variant = "default", className, children }) {
  const baseClasses =
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-900";

  const variantClasses = {
    default: "bg-white text-gray-900 border-gray-200",
    destructive: "bg-red-50 text-red-700 border-red-300",
  };

  return (
    <div
      role="alert"
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </div>
  );
}

// Alert title
export function AlertTitle({ className, children }) {
  return (
    <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)}>
      {children}
    </h5>
  );
}

// Alert description
export function AlertDescription({ className, children }) {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)}>{children}</div>;
}
