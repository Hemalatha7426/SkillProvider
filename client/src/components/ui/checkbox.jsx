import React from "react";

export const Checkbox = ({ checked, onChange, className, ...props }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer h-4 w-4 shrink-0 rounded-sm border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      <span
        className="ml-2 text-sm text-gray-700 peer-checked:font-semibold"
      >
        {props.label}
      </span>
      <span
        className="absolute left-0 top-0 flex h-4 w-4 items-center justify-center pointer-events-none text-white peer-checked:block hidden"
      >
        ✔
      </span>
    </label>
  );
};
