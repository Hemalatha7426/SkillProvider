import React, { useState, createContext, useContext } from "react";
import { ChevronDown } from "https://cdn.jsdelivr.net/npm/lucide-react@latest/dist/esm/lucide-react.js";

// Utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Simple Accordion context for controlled items
const AccordionContext = createContext();

export function Accordion({ children, type = "single" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    if (type === "single") {
      setOpenIndex(openIndex === index ? null : index);
    } else {
      setOpenIndex((prev) => {
        if (!Array.isArray(prev)) prev = [];
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index];
      });
    }
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggleItem, type }}>
      <div className="border rounded-md">{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, index }) {
  return (
    <div className="border-b last:border-b-0">{React.Children.map(children, (child) => React.cloneElement(child, { index }))}</div>
  );
}

export function AccordionTrigger({ children, index }) {
  const { openIndex, toggleItem } = useContext(AccordionContext);
  const isOpen = Array.isArray(openIndex) ? openIndex.includes(index) : openIndex === index;

  return (
    <button
      onClick={() => toggleItem(index)}
      className={cn(
        "flex w-full justify-between py-4 px-4 font-medium transition-all hover:underline",
        isOpen ? "bg-gray-100" : ""
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen ? "rotate-180" : ""
        )}
      />
    </button>
  );
}

export function AccordionContent({ children, index }) {
  const { openIndex } = useContext(AccordionContext);
  const isOpen = Array.isArray(openIndex) ? openIndex.includes(index) : openIndex === index;

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "max-h-96 py-4" : "max-h-0"
      )}
    >
      <div className="px-4">{children}</div>
    </div>
  );
}
