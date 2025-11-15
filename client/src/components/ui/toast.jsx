import React, { forwardRef } from "react";
import { X } from "lucide-react";

// Simple className merge function
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const ToastProvider = ({ children }) => <>{children}</>;

export const ToastViewport = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));

export const Toast = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const base = "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all";
  const variants = {
    default: "border-gray-300 bg-white text-black",
    destructive: "border-red-500 bg-red-600 text-white",
  };
  return (
    <div ref={ref} className={cn(base, variants[variant], className)} {...props} />
  );
});

export const ToastTitle = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));

export const ToastDescription = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));

export const ToastClose = forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-gray-500 hover:text-black focus:outline-none",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));

export const ToastAction = forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-8 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )}
    {...props}
  />
));
