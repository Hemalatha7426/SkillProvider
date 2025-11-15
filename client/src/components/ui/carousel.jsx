import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Carousel = ({ children, className }) => {
  const containerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollPrev(container.scrollLeft > 0);
    setCanScrollNext(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  };

  const scrollPrev = () => {
    containerRef.current.scrollBy({ left: -containerRef.current.offsetWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    containerRef.current.scrollBy({ left: containerRef.current.offsetWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow disabled:opacity-50 z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth space-x-4"
      >
        {children}
      </div>

      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow disabled:opacity-50 z-10"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </button>
    </div>
  );
};

const CarouselItem = ({ children, className }) => (
  <div className={`min-w-[250px] flex-shrink-0 ${className}`}>{children}</div>
);

export { Carousel, CarouselItem };
