import React, { useState } from "react";

export const Collapsible = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const CollapsibleTrigger = ({ children, open, setOpen, className }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`flex items-center justify-between w-full ${className}`}
    >
      {children}
      <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
        ▼
      </span>
    </button>
  );
};

export const CollapsibleContent = ({ open, children, className }) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        open ? "max-h-96 opacity-100 p-2" : "max-h-0 opacity-0 p-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};
