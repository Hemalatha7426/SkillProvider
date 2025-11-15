import React from "react";

// Avatar wrapper
export function Avatar({ className, children }) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

// Avatar image
export function AvatarImage({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full rounded-full object-cover ${className}`}
    />
  );
}

// Avatar fallback (for initials or placeholder)
export function AvatarFallback({ children, className }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}
