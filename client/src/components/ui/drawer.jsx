import React, { useState, useEffect } from "react";

export const Drawer = ({ open, onOpenChange, children }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => onOpenChange(false)}
      />
      {/* Drawer Content */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-xl bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mt-4 h-2 w-24 rounded-full bg-gray-300 dark:bg-gray-600" />
        {children}
      </div>
    </>
  );
};

export const DrawerTrigger = ({ onClick, children }) => (
  <div onClick={onClick} className="cursor-pointer">
    {children}
  </div>
);

export const DrawerClose = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
  >
    ✕
  </button>
);

export const DrawerHeader = ({ children, className }) => (
  <div className={`grid gap-1.5 p-4 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

export const DrawerFooter = ({ children, className }) => (
  <div className={`mt-auto flex flex-col gap-2 p-4 ${className}`}>
    {children}
  </div>
);

export const DrawerTitle = ({ children, className }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h2>
);

export const DrawerDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);
