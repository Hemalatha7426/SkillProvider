import React, { forwardRef } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Select = forwardRef(({ className, children, ...props }, ref) => (
  <div className={cn("relative w-full", className)}>
    <select
      ref={ref}
      className={cn(
        "appearance-none w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <ChevronDown className="h-4 w-4 text-gray-400" />
    </div>
  </div>
));
Select.displayName = "Select";

// Individual Option
const SelectItem = forwardRef(({ className, children, value, disabled }, ref) => (
  <option
    ref={ref}
    className={cn(
      "text-sm px-2 py-1 disabled:text-gray-400",
      className
    )}
    value={value}
    disabled={disabled}
  >
    {children}
  </option>
));
SelectItem.displayName = "SelectItem";

// Optional Label
const SelectLabel = ({ children, className }) => (
  <label className={cn("block text-sm font-semibold mb-1", className)}>
    {children}
  </label>
);

// Optional Separator (simple horizontal line)
const SelectSeparator = ({ className }) => (
  <hr className={cn("my-1 border-gray-200", className)} />
);

export { Select, SelectItem, SelectLabel, SelectSeparator };
