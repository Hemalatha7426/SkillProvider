import React, { forwardRef } from "react";

// Utility function for class concatenation
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Root Pagination Container
const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// Pagination List
const PaginationContent = forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
));
PaginationContent.displayName = "PaginationContent";

// Pagination Item
const PaginationItem = forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// Pagination Link
const PaginationLink = ({ isActive, className, children, ...props }) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
      isActive && "bg-blue-500 text-white border-blue-500",
      className
    )}
    {...props}
  >
    {children}
  </a>
);
PaginationLink.displayName = "PaginationLink";

// Previous Button
const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink className={cn("gap-1 px-2", className)} {...props} aria-label="Go to previous page">
    <span className="rotate-180 inline-block">&#10148;</span> {/* Left arrow */}
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// Next Button
const PaginationNext = ({ className, ...props }) => (
  <PaginationLink className={cn("gap-1 px-2", className)} {...props} aria-label="Go to next page">
    <span>Next</span>
    <span className="inline-block">&#10148;</span> {/* Right arrow */}
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

// Ellipsis
const PaginationEllipsis = ({ className, ...props }) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center text-gray-500", className)}
    {...props}
  >
    &#8230;
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
