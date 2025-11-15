import React from "react";

// Button variants configuration
const buttonStyles = {
  variant: {
    default: "bg-blue-600 text-white border border-blue-700 hover:bg-blue-700",
    destructive: "bg-red-600 text-white border border-red-700 hover:bg-red-700",
    outline: "bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300",
    ghost: "bg-transparent border border-transparent hover:bg-gray-100",
  },
  size: {
    default: "min-h-9 px-4 py-2 text-sm",
    sm: "min-h-8 px-3 py-1 text-xs",
    lg: "min-h-10 px-8 py-3 text-base",
    icon: "h-9 w-9 p-0 flex items-center justify-center",
  },
};

// Helper to combine class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Button component
const Button = React.forwardRef(
  ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles.variant[variant], buttonStyles.size[size], className, "rounded-md inline-flex items-center justify-center gap-2")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
