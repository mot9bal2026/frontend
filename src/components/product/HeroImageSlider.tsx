"use client";

import { useState, useEffect } from "react";

const images = [
  { src: "/before-after-new.png", alt: "نتيجة قبل وبعد استخدام قهوة إشراقة للهالات" },
  { src: "/before-after-wrinkles.png", alt: "نتيجة قبل وبعد استخدام قهوة إشراقة للتجاعيد" }
];

export function HeroImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden md:rounded-2xl md:shadow-xl w-full bg-[#E8D5C0]">
      <div className="relative w-full">
        {/* We render the first image normally (relative) so the container gets the correct height based on the image's aspect ratio */}
        <img
          src={images[0].src}
          alt={images[0].alt}
          className={`w-full h-auto block transition-opacity duration-1000 ${
            currentIndex === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* The second image is absolute, overlapping the first one exactly */}
        <img
          src={images[1].src}
          alt={images[1].alt}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentIndex === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </div>

      {/* BEFORE / AFTER labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="bg-white/90 text-[#5A4A3E] text-sm font-black px-4 py-1 rounded-full shadow border border-white/50">قبل</span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="bg-brand-apothecary text-white text-sm font-black px-4 py-1 rounded-full shadow border border-brand-apothecary">بعد</span>
      </div>

      {/* Bottom ribbon */}
      <div className="absolute bottom-0 inset-x-0 bg-[#1A0F0A]/85 px-4 py-2.5 z-10">
        <p className="text-white text-xs font-bold text-center">✨ فرق واضح بعد 30 يوم — مضمون أو فلوسك ترجع</p>
      </div>

      {/* Slider Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-11 inset-x-0 flex justify-center gap-2 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

