import React, { useState, forwardRef } from "react";

// Utility for className concatenation
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Navigation Menu Root
const NavigationMenu = forwardRef(({ className, children, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
  </nav>
));
NavigationMenu.displayName = "NavigationMenu";

// Navigation Menu List
const NavigationMenuList = forwardRef(({ className, children, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  >
    {children}
  </ul>
));
NavigationMenuList.displayName = "NavigationMenuList";

// Navigation Menu Item
const NavigationMenuItem = forwardRef(({ className, children, ...props }, ref) => (
  <li ref={ref} className={className} {...props}>
    {children}
  </li>
));
NavigationMenuItem.displayName = "NavigationMenuItem";

// Navigation Menu Trigger
const NavigationMenuTrigger = forwardRef(({ className, children, menuItems }, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        ref={ref}
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:bg-gray-200",
          open && "bg-gray-200",
          className
        )}
        onClick={() => setOpen(!open)}
      >
        {children}
        <span
          className={cn(
            "ml-1 h-3 w-3 inline-block transform transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )}
        >
          ▼
        </span>
      </button>

      {open && menuItems && (
        <div className="absolute top-full left-0 mt-1 w-48 rounded-md border bg-white shadow-md z-50">
          {menuItems.map((item, index) =>
            item.type === "separator" ? (
              <div key={index} className="my-1 h-px bg-gray-200" />
            ) : (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// Navigation Menu Content
const NavigationMenuContent = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-full left-0 mt-1 w-full overflow-hidden rounded-md border bg-white shadow-lg z-50",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
NavigationMenuContent.displayName = "NavigationMenuContent";

// Navigation Menu Link
const NavigationMenuLink = forwardRef(({ className, children, href, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    className={cn("block px-3 py-2 text-sm hover:bg-gray-100", className)}
    {...props}
  >
    {children}
  </a>
));
NavigationMenuLink.displayName = "NavigationMenuLink";

// Navigation Menu Indicator (small triangle)
const NavigationMenuIndicator = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute top-full left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-gray-300 z-50", className)}
    {...props}
  />
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

// Navigation Menu Viewport (for animation or dynamic width)
const NavigationMenuViewport = forwardRef(({ className, children, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center w-full", className)}>
    <div
      ref={ref}
      className={cn(
        "origin-top-center relative mt-1.5 h-auto w-full overflow-hidden rounded-md border bg-white shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  </div>
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
