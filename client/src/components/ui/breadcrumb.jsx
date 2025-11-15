import React from "react";

// Breadcrumb container
export const Breadcrumb = React.forwardRef(({ children, ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props}>
    {children}
  </nav>
));
Breadcrumb.displayName = "Breadcrumb";

// Breadcrumb list
export const BreadcrumbList = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <ol
    ref={ref}
    className={`flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500 sm:gap-2.5 ${className}`}
    {...props}
  >
    {children}
  </ol>
));
BreadcrumbList.displayName = "BreadcrumbList";

// Breadcrumb item
export const BreadcrumbItem = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <li ref={ref} className={`inline-flex items-center gap-1.5 ${className}`} {...props}>
    {children}
  </li>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

// Breadcrumb link
export const BreadcrumbLink = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <a
    ref={ref}
    className={`transition-colors hover:text-gray-900 ${className}`}
    {...props}
  >
    {children}
  </a>
));
BreadcrumbLink.displayName = "BreadcrumbLink";

// Breadcrumb current page
export const BreadcrumbPage = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={`font-normal text-gray-900 ${className}`}
    {...props}
  >
    {children}
  </span>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

// Breadcrumb separator
export const BreadcrumbSeparator = ({ children, className = "", ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={`text-gray-400 ${className}`}
    {...props}
  >
    {children ?? "›"} {/* Default arrow separator */}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Breadcrumb ellipsis
export const BreadcrumbEllipsis = ({ className = "", ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={`flex h-9 w-9 items-center justify-center ${className}`}
    {...props}
  >
    …
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
