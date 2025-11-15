import React, { useState } from "react";
import { X } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export function Sheet({ children, side = "right", isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sheet Panel */}
      <div
        className={cn(
          "fixed z-50 bg-white shadow-lg w-3/4 h-full p-6 transition-transform",
          side === "right" &&
            (isOpen ? "translate-x-0" : "translate-x-full"),
          side === "left" && (isOpen ? "translate-x-0" : "-translate-x-full"),
          side === "top" && (isOpen ? "translate-y-0" : "-translate-y-full"),
          side === "bottom" && (isOpen ? "translate-y-0" : "translate-y-full")
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {children}
      </div>
    </>
  );
}

// Sheet Header
export const SheetHeader = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}>
    {children}
  </div>
);

// Sheet Footer
export const SheetFooter = ({ children, className }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>
    {children}
  </div>
);

// Sheet Title
export const SheetTitle = ({ children, className }) => (
  <h2 className={cn("text-lg font-semibold text-gray-900", className)}>
    {children}
  </h2>
);

// Sheet Description
export const SheetDescription = ({ children, className }) => (
  <p className={cn("text-sm text-gray-500", className)}>{children}</p>
);
