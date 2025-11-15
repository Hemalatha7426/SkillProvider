import React, { useState, forwardRef } from "react";

// Utility function for classNames
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Menubar container
const Menubar = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-white p-1",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Menubar.displayName = "Menubar";

// Menubar Trigger (top-level menu button)
const MenubarTrigger = forwardRef(({ className, children, ...props }, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        ref={ref}
        className={cn(
          "flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-gray-200",
          open && "bg-gray-200",
          className
        )}
        onClick={() => setOpen(!open)}
        {...props}
      >
        {children}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 min-w-[12rem] rounded-md border bg-white shadow-md z-50">
          {props.menuItems}
        </div>
      )}
    </div>
  );
});
MenubarTrigger.displayName = "MenubarTrigger";

// Menubar item
const MenubarItem = forwardRef(({ className, children, onClick, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
));
MenubarItem.displayName = "MenubarItem";

// Menubar separator
const MenubarSeparator = () => <div className="my-1 h-px bg-gray-200" />;

// Menubar label
const MenubarLabel = ({ children, className }) => (
  <div className={cn("px-3 py-1.5 text-xs font-semibold text-gray-500", className)}>
    {children}
  </div>
);

// Menubar submenu (nested menu)
const MenubarSub = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex w-full justify-between px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        {label} <span className="ml-2">▶</span>
      </button>
      {open && (
        <div className="absolute top-0 left-full mt-0 min-w-[12rem] rounded-md border bg-white shadow-md z-50">
          {items.map((item, i) =>
            item.type === "separator" ? (
              <MenubarSeparator key={i} />
            ) : (
              <MenubarItem key={i} onClick={item.onClick}>
                {item.label}
              </MenubarItem>
            )
          )}
        </div>
      )}
    </div>
  );
};

// Menubar shortcut (right aligned)
const MenubarShortcut = ({ children }) => (
  <span className="ml-auto text-xs tracking-widest text-gray-400">{children}</span>
);

export {
  Menubar,
  MenubarTrigger,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarSub,
  MenubarShortcut,
};
