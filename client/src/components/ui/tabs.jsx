import React, { useState } from "react";

// Utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Tabs root component
function Tabs({ defaultValue, children, className, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

// Tabs list (tab headers)
const TabsList = ({ children, className, activeTab, setActiveTab, ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
};

// Individual tab button
const TabsTrigger = ({ value, children, className, activeTab, setActiveTab, ...props }) => {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        isActive
          ? "bg-white text-gray-900 shadow"
          : "text-gray-600 hover:bg-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Tabs content
const TabsContent = ({ value, children, className, activeTab, ...props }) => {
  if (activeTab !== value) return null;

  return (
    <div
      className={cn(
        "mt-2 p-4 bg-white ring-1 ring-gray-200 rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
