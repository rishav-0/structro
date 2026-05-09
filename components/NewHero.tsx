import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Factory, Building2 } from 'lucide-react';
import Link from 'next/link';

const STRUCTRO_LETTERS = ['S', 'T', 'R', 'U', 'C', 'T', 'R', 'O'];

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

const CinematicModernHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src={assetPath('/hero.mp4')}
        poster={assetPath('/images/hero-poster.webp')}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Subtle top and bottom overlays */}
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/50 to-transparent" />

      {/* Main layout */}
      <div className="relative z-10 h-full flex items-center justify-between px-8 md:px-16 lg:px-20 max-w-screen-2xl mx-auto w-full">

        {/* ── LEFT SIDE ── */}
        <div className="flex flex-col justify-center max-w-xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span className="text-zinc-300 text-xs font-semibold tracking-[0.3em] uppercase">
              ISO 9001:2015 Certified
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] uppercase mb-6"
          >
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-zinc-400">
              Legacy.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-zinc-300 font-light max-w-md leading-relaxed mb-10"
          >
            Precision{' '}
            <strong className="font-semibold text-white">Bridge Engineering</strong> and{' '}
            <strong className="font-semibold text-white">PEB Manufacturing</strong> for Northeast
            India&apos;s most demanding infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-sm transition-colors"
            >
              Our Projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full font-medium text-sm transition-colors"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Trusted by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-14 flex items-center gap-5"
          >
            <span className="text-zinc-500 text-xs tracking-wider uppercase">
              Trusted by 50+ projects
            </span>
            <div className="flex items-center gap-4 opacity-50">
              <Factory className="w-5 h-5 text-zinc-300" />
              <Building2 className="w-5 h-5 text-zinc-300" />
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT SIDE — Stylish STRUCTRO ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col items-center justify-center h-full gap-0 select-none py-16"
        >
          {/* Top label */}
          <div className="flex flex-col items-end mb-3 self-end mr-1">
            <span
              className="text-zinc-400 text-[0.6rem] font-bold tracking-[0.45em] uppercase leading-none"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              ESTD
            </span>
            <span
              className="text-zinc-300 text-xs font-bold tracking-[0.3em]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              2024
            </span>
          </div>

          {/* Stacked letters */}
          <div className="flex flex-col items-center" style={{ gap: '0.02em' }}>
            {STRUCTRO_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"Bebas Neue", "Impact", "Arial Narrow", sans-serif',
                  fontSize: 'clamp(3.5rem, 5.5vw, 6.5rem)',
                  lineHeight: 0.88,
                  letterSpacing: '0.01em',
                  color: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.92)',
                  WebkitTextStroke:
                    i % 2 === 0 ? '1.5px rgba(255,255,255,0.55)' : '0px transparent',
                  display: 'block',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Bottom label */}
          <div className="mt-3 self-start ml-1">
            <span
              className="text-zinc-400 text-[0.6rem] font-bold tracking-[0.35em] uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              INFRATECH CO.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicModernHero;