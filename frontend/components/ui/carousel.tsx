"use client";
import { FaArrowCircleRight } from "react-icons/fa";
import { useEffect, useId, useRef, useState } from "react";

interface SlideData {
  name: string;
  role: string;
  feedback: string;
  rating: number;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => frameRef.current && cancelAnimationFrame(frameRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = slideRef.current?.getBoundingClientRect();
    if (!r) return;
    xRef.current = e.clientX - (r.left + r.width / 2);
    yRef.current = e.clientY - (r.top + r.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="w-[70vmin] h-[70vmin] mx-[4vmin] rounded-xl border bg-neutral-800 text-white shadow-lg p-6 transition-all duration-500 ease-in-out flex flex-col justify-between"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(6deg)"
              : "scale(1) rotateX(0deg)",
          transformOrigin: "bottom",
        }}
      >
        <p className="text-sm text-white-700 leading-relaxed mb-4">
          “{slide.feedback}”
        </p>
        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-orange-600">
            {slide.name}
          </h3>
          <p className="text-sm text-white-500">{slide.role}</p>
          <p className="text-yellow-400 mt-1 text-sm">
            {"★".repeat(Math.floor(slide.rating)) +
              (slide.rating % 1 ? "½" : "")}
          </p>
        </div>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => (
  <button
    className={`w-10 h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-full mx-2 hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
      type === "previous" ? "rotate-180" : ""
    }`}
    title={title}
    onClick={handleClick}
  >
    <FaArrowCircleRight className="text-neutral-600 dark:text-neutral-200" />
  </button>
);

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const handlePreviousClick = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNextClick = () =>
    setCurrent((prev) => (prev + 1) % slides.length);
  const handleSlideClick = (index: number) =>
    index !== current && setCurrent(index);
  const id = useId();

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Previous"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Next"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
