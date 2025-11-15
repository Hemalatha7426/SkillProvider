import React, { useState } from "react";

// Utility function to merge classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

export function AlertDialog({ children }) {
  return <div>{children}</div>;
}

export function AlertDialogTrigger({ children, onClick }) {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-600 text-white rounded">
      {children}
    </button>
  );
}

export function AlertDialogContent({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="flex flex-col space-y-2 text-center sm:text-left">{children}</div>;
}

export function AlertDialogFooter({ children }) {
  return <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function AlertDialogAction({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-gray-300 rounded mt-2 sm:mt-0 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
