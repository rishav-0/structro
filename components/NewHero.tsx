import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Container } from './ui/container';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "BRIDGE ENGINEERING & INFRASTRUCTURE",
    description: "Connecting dreams across Northeast India with robust, precision-engineered bridges built to last.",
    image: "/images/hero/c.png"
  },
  {
    id: 2,
    title: "PRE-ENGINEERED BUILDING SOLUTIONS",
    description: "Pioneering PEB technology for durable, scalable, and cost-effective industrial and residential structures.",
    image: "/images/hero/a.png"
  },
  {
    id: 3,
    title: "INDUSTRIAL SHEDS & WAREHOUSING",
    description: "High-performance heavy engineering solutions for industrial giants, featuring state-of-the-art construction.",
    image: "/images/hero/b.png"
  }
];

const NewHero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[80vh] h-[90vh] md:h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Images - Using a darker overlay for better legibility */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            fill
            priority
            className="object-cover opacity-50" // Reduced opacity for professional feel
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <Container className="relative z-10 h-full flex items-center  md:pt-0">
        {/* Changed from grid-cols-2 to flex-col/lg:grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          
          {/* Left Side: Headline */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter uppercase">
                  {slides[index].title}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Description & CTA */}
          <div className="flex flex-col items-start lg:items-end lg:text-right mt-4 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-xl lg:max-w-md"
              >
                <p className="text-lg md:text-xl text-zinc-300 mb-8 leading-relaxed font-light">
                  {slides[index].description}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-start lg:justify-end">
                  <Link href="/projects" className="w-full sm:w-auto">
                    <Button variant="red" size="xl" className="w-full">
                      EXPLORE PROJECTS <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="white-outline" size="xl" className="w-full">
                      GET CONSULTATION
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>

      {/* Navigation Indicators - Responsive placement */}
      <div className="absolute bottom-6 md:bottom-12 left-0 w-full z-20">
        <Container>
          <div className="flex items-center gap-1 ">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="group flex flex-col items-start gap-2 focus:outline-none"
              >
                <div className={`h-1 transition-all duration-500 rounded-full ${i === index ? "w-12 md:w-20 bg-red-600" : "w-6 md:w-10 bg-white/20 group-hover:bg-white/40"}`} />
                <span className={`hidden md:block text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${i === index ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                  Section 0{i + 1}
                </span>
              </button>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default NewHero;