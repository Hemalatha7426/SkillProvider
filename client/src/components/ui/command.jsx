import React, { useState } from "react";
import { Search } from "lucide-react";

// Command Container
export const CommandDialog = ({ open, setOpen, children, className }) => {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4`}
      onClick={() => setOpen(false)}
    >
      <div
        className={`bg-white dark:bg-gray-900 rounded-md shadow-lg w-full max-w-md overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Command Input
export const CommandInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center border-b px-3">
      <Search className="mr-2 h-4 w-4 opacity-50" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
    </div>
  );
};

// Command List
export const CommandList = ({ children }) => {
  return <div className="max-h-60 overflow-y-auto">{children}</div>;
};

// Command Item
export const CommandItem = ({ children, onSelect }) => {
  return (
    <div
      className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"
      onClick={onSelect}
    >
      {children}
    </div>
  );
};

// Command Empty
export const CommandEmpty = ({ children }) => {
  return (
    <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
      {children}
    </div>
  );
};
