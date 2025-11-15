import React, { useState, useRef, useEffect } from "react";

export const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

export const DropdownMenuTrigger = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
  >
    {children}
  </button>
);

export const DropdownMenuContent = ({ open, children }) => (
  <div
    className={`absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-900 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-transform duration-200 ${
      open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
    }`}
  >
    {children}
  </div>
);

export const DropdownMenuItem = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer select-none relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
  >
    {children}
  </div>
);

export const DropdownMenuCheckboxItem = ({ children, checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className="flex items-center gap-2 cursor-pointer select-none relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={() => {}}
      className="w-4 h-4"
    />
    {children}
  </div>
);

export const DropdownMenuRadioItem = ({ children, selected, onSelect }) => (
  <div
    onClick={onSelect}
    className="flex items-center gap-2 cursor-pointer select-none relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
  >
    <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center">
      {selected && <div className="w-2 h-2 bg-gray-700 rounded-full"></div>}
    </div>
    {children}
  </div>
);

export const DropdownMenuLabel = ({ children }) => (
  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
    {children}
  </div>
);

export const DropdownMenuSeparator = () => (
  <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
);
