import React, { useState } from "react";

// Helper to combine classes
const cn = (...classes) => classes.filter(Boolean).join("");

// Simple button styles (replacing buttonVariants)
const buttonStyle = "inline-flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-800 h-8 w-8 hover:bg-gray-100";

// Calendar component
const Calendar = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("p-3 bg-white rounded-md shadow-md", className)}>
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className={buttonStyle}>
          {/* Left arrow SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-medium">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </span>
        <button onClick={nextMonth} className={buttonStyle}>
          {/* Right arrow SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1 font-semibold">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            className={cn(
              "p-2 rounded-md hover:bg-blue-100",
              day.toDateString() === selectedDate.toDateString() ? "bg-blue-600 text-white" : "text-gray-800"
            )}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export { Calendar };
