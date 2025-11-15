import React, { useState, useRef, useEffect } from "react";

// ContextMenu wrapper
export const ContextMenu = ({ children }) => {
  return <div className="relative">{children}</div>;
};

// Trigger for opening the menu
export const ContextMenuTrigger = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
};

// Content of the menu
export const ContextMenuContent = ({ open, children, className }) => {
  if (!open) return null;

  return (
    <div
      className={`absolute z-50 mt-1 min-w-[8rem] rounded-md border bg-white dark:bg-gray-900 shadow-md p-1 ${className}`}
    >
      {children}
    </div>
  );
};

// Individual item
export const ContextMenuItem = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {children}
    </div>
  );
};

// Checkbox item
export const ContextMenuCheckboxItem = ({ children, checked, onChange }) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className="flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="mr-2 h-4 w-4"
      />
      {children}
    </div>
  );
};

// Radio item
export const ContextMenuRadioItem = ({ children, selected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="flex items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <span className="mr-2 h-3 w-3 rounded-full border flex items-center justify-center">
        {selected && <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />}
      </span>
      {children}
    </div>
  );
};

// Separator
export const ContextMenuSeparator = () => (
  <div className="-mx-1 my-1 h-px bg-gray-300 dark:bg-gray-700" />
);

// Label
export const ContextMenuLabel = ({ children }) => (
  <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
);
