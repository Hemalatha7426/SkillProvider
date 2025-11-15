import React, { useState, useRef, forwardRef } from "react";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils"; // optional, or just use template strings

// --- OTP Input Container ---
const InputOTP = forwardRef(({ length = 6, onChange, className, ...props }, ref) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Only digits
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange?.(newValues.join(""));

    // Move focus
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
      {values.map((value, index) => (
        <InputOTPSlot
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          value={value}
          isActive={document.activeElement === inputsRef.current[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
});
InputOTP.displayName = "InputOTP";

// --- Individual OTP Slot ---
const InputOTPSlot = forwardRef(({ value, isActive, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        maxLength={1}
        value={value}
        className={cn(
          "w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          isActive && "ring-2 ring-blue-500"
        )}
        {...props}
      />
      {isActive && !value && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-4 w-px animate-blink bg-gray-700" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

// --- Separator (Optional Dot) ---
const InputOTPSeparator = ({ className, ...props }) => (
  <div className={cn("flex items-center justify-center px-1", className)} {...props}>
    <Dot />
  </div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPSlot, InputOTPSeparator };
