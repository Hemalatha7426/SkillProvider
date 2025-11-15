import React, { useState } from "react";

// Utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

function Slider({ className, min = 0, max = 100, step = 1, value: valueProp, onChange, ...props }) {
  const [value, setValue] = useState(valueProp ?? min);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
      />
      <div className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full pointer-events-none" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
    </div>
  );
}

export { Slider };
