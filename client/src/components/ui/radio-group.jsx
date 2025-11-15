import React, { forwardRef, useState, createContext, useContext } from "react";

// Utility for class concatenation
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Context to manage the selected radio
const RadioGroupContext = createContext();

const RadioGroup = forwardRef(({ className, value: valueProp, onChange, children, ...props }, ref) => {
  const [value, setValue] = useState(valueProp || null);

  const handleChange = (val) => {
    setValue(val);
    if (onChange) onChange(val);
  };

  return (
    <RadioGroupContext.Provider value={{ value, onChange: handleChange }}>
      <div ref={ref} className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = forwardRef(({ value, className, ...props }, ref) => {
  const context = useContext(RadioGroupContext);
  const isSelected = context.value === value;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => context.onChange(value)}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-gray-400 text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center",
        isSelected && "bg-blue-500 border-blue-500",
        className
      )}
      {...props}
    >
      {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
    </button>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
