import React, { useState } from "react";

export const ChartContainer = ({ children, className }) => {
  return (
    <div
      className={`flex aspect-video justify-center items-center bg-white rounded-lg shadow ${className}`}
    >
      {children}
    </div>
  );
};

// Simple bar chart item
export const BarChart = ({ data, color = "bg-blue-500", height = 48 }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-2 h-48 w-full p-2">
      {data.map((d, idx) => {
        const barHeight = (d.value / maxValue) * height;
        return (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-6 ${color} rounded-t`}
              style={{ height: `${barHeight}px` }}
              title={`${d.label}: ${d.value}`}
            />
            <span className="text-xs mt-1">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// Simple tooltip
export const ChartTooltip = ({ label, value, className }) => {
  return (
    <div
      className={`absolute bg-white border border-gray-300 shadow p-2 text-xs rounded ${className}`}
    >
      <div className="font-medium">{label}</div>
      <div>{value}</div>
    </div>
  );
};

// Simple legend
export const ChartLegend = ({ data }) => (
  <div className="flex gap-4 mt-2 justify-center">
    {data.map((d, idx) => (
      <div key={idx} className="flex items-center gap-1">
        <div
          className="w-3 h-3 rounded"
          style={{ backgroundColor: d.color || "blue" }}
        />
        <span className="text-xs">{d.label}</span>
      </div>
    ))}
  </div>
);
