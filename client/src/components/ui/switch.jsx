import React, { useState } from "react";

// Utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

function Switch({ className, checked: checkedProp, onChange, ...props }) {
  const [checked, setChecked] = useState(checkedProp || false);

  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors",
        checked ? "bg-blue-500" : "bg-gray-300",
        "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

export { Switch };
