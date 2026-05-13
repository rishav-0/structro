"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ShieldCheck, Trophy, HardHat, Globe, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Container } from './ui/container';
import { Button } from './ui/button';
import Link from 'next/link';

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 35%'],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });

  const features = [
    {
      icon: <Trophy className="w-6 h-6 text-accent" />,
      title: "24+ Years Excellence",
      desc: "Founded by 4 industry veterans, connecting dreams since 2000.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      title: "ISO 9001:2015",
      desc: "Certified quality management with zero compromise on safety.",
    },
    {
      icon: <Globe className="w-6 h-6 text-accent" />,
      title: "Northeast Presence",
      desc: "A dominant force in engineering across the entire region.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-24">
      {/* Structural Pattern Overlay (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <Container>
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="absolute bottom-12 left-[58.333333%] top-12 hidden w-px -translate-x-1/2 bg-gray-200 lg:block" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-12 left-[58.333333%] top-12 hidden w-px -translate-x-1/2 origin-top bg-primary lg:block"
            style={{ scaleY: lineProgress }}
          />
          <div className="absolute left-[58.333333%] top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow-md lg:block" />
          
          {/* Left: Content & Bento Cards */}
          <div className="lg:col-span-7 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Engineering <span className="text-accent">Beyond</span> Limits.
              </h2>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white border border-gray-100 rounded-md hover:border-primary/30 hover:shadow-xl transition-all group"
                >
                  <div className="mb-6 p-3 bg-gray-50 w-fit rounded-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}

              {/* Special CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="p-8 bg-accent rounded-md flex flex-col justify-between shadow-lg"
              >
                <div className="text-white">
                  <HardHat className="w-10 h-10 mb-6 opacity-90" />
                  <p className="font-bold text-2xl leading-tight mb-4">Ready to start your infrastructure journey?</p>
                </div>
                <Link href="/contact" className="mt-6">
                   <Button variant="white" size="lg" className="w-full">
                     GET CONSULTATION <ArrowUpRight className="ml-2 w-4 h-4" />
                   </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right: The Visual Stack */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-md overflow-hidden border-8 border-white shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                alt="Construction"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-primary text-white shadow-xl rounded-md">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-black">24+</div>
                  <div className="text-xs uppercase tracking-[0.2em] font-bold leading-tight">
                    Years of heavy <br /> engineering legacy
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative "Structure" lines */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-accent/20" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-accent/20" />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;