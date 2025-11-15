import React from "react";

// AspectRatio component using Tailwind
export function AspectRatio({ ratio = "16/9", className, children }) {
  // Convert ratio string "16/9" to Tailwind-friendly class
  const [w, h] = ratio.split("/").map(Number);
  const aspectClass = `aspect-[${w}/${h}]`;

  return <div className={`${aspectClass} ${className}`}>{children}</div>;
}
