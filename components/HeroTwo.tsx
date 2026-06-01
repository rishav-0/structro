"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SLIDES = [
  {
    tag: "Pioneering | Northeast India",
    titlePrefix: "Structural",
    titleHighlight: "Solutions.",
    description: "Northeast India's leading firm for high-precision engineering, turnkey construction, and seismic-resilient infrastructure.",
  },
  {
    tag: "High-Precision Manufacturing | Rani Facility",
    titlePrefix: "Heavy Steel",
    titleHighlight: "Engineering.",
    description: "Custom fabrication of railway bridges, PEB structures, and heavy industrial sheds with state-of-the-art machinery.",
  },
  {
    tag: "Turnkey Project Execution | End-to-End",
    titlePrefix: "Visionary",
    titleHighlight: "Infrastructure.",
    description: "Delivering massive, durable public and private works on schedule with zero quality compromises across challenging terrains.",
  },
];

export default function HeroTwo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [isMounted, setIsMounted] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, handleNext]);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full bg-[#001e40] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isMounted && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/hero/frame-1.png"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          >
            <source src="/hero/WA_1778356649487.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001e40] via-[#001e40]/80 to-transparent" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,30,64,0.8)]" />
      </div>

      <div className="container relative z-10 px-4 md:px-12 mx-auto">
        <div className="max-w-4xl relative">
          <div className="min-h-[360px] md:min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-0.5 w-12 bg-[#ea8000]" />
                  <span className="text-[#ea8000] font-bold tracking-widest uppercase text-sm md:text-base">
                    {SLIDES[currentSlide].tag}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight uppercase">
                  {SLIDES[currentSlide].titlePrefix}
                  <br />
                  <span className="text-[#ea8000]">
                    {SLIDES[currentSlide].titleHighlight}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 font-medium leading-relaxed">
                  {SLIDES[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#ea8000] hover:bg-[#cc7000] text-white px-8 py-6 text-lg font-bold rounded-none shadow-xl transition-all cursor-pointer">
                CONSULT NOW
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#001e40] px-8 py-6 text-lg font-bold rounded-none bg-transparent transition-all cursor-pointer">
                OUR WORK
              </Button>
            </Link>
          </div>

          {/* Slide Navigation Progress Bars */}
          <div className="flex items-center gap-3 mt-12">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className="group relative h-1.5 w-16 bg-white/20 transition-all hover:bg-white/40 focus:outline-none cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <motion.div
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute top-0 left-0 h-full bg-[#ea8000]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sleek Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20">
        <button
          onClick={handlePrev}
          className="group p-3 rounded-full border border-white/15 bg-[#001e40]/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-[#001e40]/80 hover:border-white/30 transition-all cursor-pointer focus:outline-none hidden md:flex"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20">
        <button
          onClick={handleNext}
          className="group p-3 rounded-full border border-white/15 bg-[#001e40]/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-[#001e40]/80 hover:border-white/30 transition-all cursor-pointer focus:outline-none hidden md:flex"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
