import React, { useState, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const ResizablePanelGroup = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-row",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const ResizablePanel = ({ className, style, children, flexBasis }) => {
  return (
    <div
      className={cn("overflow-auto", className)}
      style={{ flexBasis: flexBasis || "50%", flexGrow: 1, flexShrink: 1, ...style }}
    >
      {children}
    </div>
  );
};

export const ResizableHandle = ({ className }) => {
  const handleRef = useRef();
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const onMouseDown = (e) => {
    setDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = handleRef.current.previousSibling.offsetWidth;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startXRef.current;
    const newWidth = startWidthRef.current + dx;
    handleRef.current.previousSibling.style.flexBasis = `${newWidth}px`;
  };

  const onMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={handleRef}
      onMouseDown={onMouseDown}
      className={cn(
        "relative flex w-1 cursor-col-resize items-center justify-center bg-gray-300 hover:bg-gray-400",
        className
      )}
    >
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-gray-200">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    </div>
  );
};
