import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Container } from './ui/container';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

const slides = [
  {
    id: 1,
    title: "Bridge Engineering",
    highlight: "& Infrastructure",
    description:
      "Connecting Northeast India with precision-engineered bridges built for durability and scale.",
    image: assetPath('/images/hero/c.png')
  },
  {
    id: 2,
    title: "Pre-Engineered",
    highlight: "Buildings",
    description:
      "Scalable and cost-efficient PEB solutions for modern industrial and residential needs.",
    image: assetPath('/images/hero/a.png')
  },
  {
    id: 3,
    title: "Industrial Sheds",
    highlight: "& Warehousing",
    description:
      "High-performance infrastructure tailored for heavy industries and logistics.",
    image: assetPath('/images/hero/b.png')
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
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <Image
        src={slides[index].image}
        alt="Structro hero background"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover"
      />

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={assetPath('/images/hero/structro.mp4')}
        poster={assetPath('/frame-1.webp')}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/70" />

      <Container className="relative z-10 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 w-full">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].id}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                  {slides[index].title}
                  <br />
                  <span className="text-red-500">
                    {slides[index].highlight}
                  </span>
                </h1>

                <p className="mt-6 text-lg text-zinc-300 max-w-lg leading-relaxed">
                  {slides[index].description}
                </p>

                {/* CTA */}
                <div className="mt-8 flex gap-4 flex-wrap">
                  <Button asChild size="xl" variant="red">
                    <Link href="/projects">
                      Explore Projects
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="xl"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <Link href="/contact">
                      Get Consultation
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE VISUAL ELEMENT */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].id}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="relative w-[80%] h-[400px] border border-white/10 backdrop-blur-lg bg-white/5 rounded-sm overflow-hidden shadow-2xl"
              >
                <Image
                  src={slides[index].image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>

      {/* PROGRESS INDICATOR */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-red-600"
        />
      </div>

      {/* DOT NAV */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-red-600 scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewHero;