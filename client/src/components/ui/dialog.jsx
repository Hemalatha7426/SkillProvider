import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <DialogOverlay onClick={() => onOpenChange(false)} />
          <DialogContent>{children}</DialogContent>
        </div>
      )}
    </>
  );
};

export const DialogTrigger = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
};

const DialogOverlay = ({ onClick }) => (
  <div
    onClick={onClick}
    className="fixed inset-0 bg-black/80 animate-fade-in"
  />
);

const DialogContent = ({ children }) => (
  <div className="relative z-50 w-full max-w-lg rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg animate-scale-in">
    {children}
    <DialogClose />
  </div>
);

const DialogClose = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
);

export const DialogHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

export const DialogFooter = ({ children, className }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}>
    {children}
  </div>
);

export const DialogTitle = ({ children, className }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h2>
);

export const DialogDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);
