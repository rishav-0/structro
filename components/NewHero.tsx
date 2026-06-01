import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const STRUCTRO_LETTERS = ['S', 'T', 'R', 'U', 'C', 'T', 'R', 'O'];

const HERO_SLIDES = [
  {
    badge: "ISO 9001:2015 Certified Quality",
    titlePrefix: "Build Your ",
    titleHighlight: "Legacy.",
    description: (
      <>
        Precision <strong className="font-semibold text-white">Bridge Engineering</strong> and{" "}
        <strong className="font-semibold text-white">PEB Manufacturing</strong> for Northeast
        India&apos;s most demanding infrastructure.
      </>
    ),
    rawText: "Build Your Legacy. Precision Bridge Engineering and PEB Manufacturing for Northeast India's most demanding infrastructure."
  },
  {
    badge: "Pioneering Structural Engineering",
    titlePrefix: "Erecting The ",
    titleHighlight: "Future.",
    description: (
      <>
        Pioneering <strong className="font-semibold text-white">Heavy Steel Structures</strong> and{" "}
        <strong className="font-semibold text-white">Industrial Sheds</strong> designed with flawless technical precision.
      </>
    ),
    rawText: "Engineer The Future. Pioneering Heavy Steel Structures and Industrial Sheds designed with flawless technical precision."
  },
  {
    badge: "Government Approved Class-1A Contractor",
    titlePrefix: "Connecting The ",
    titleHighlight: "Terrain.",
    description: (
      <>
        Constructing massive <strong className="font-semibold text-white">Railway & Highway Bridges</strong> to unite remote terrain across Northeast India.
      </>
    ),
    rawText: "Connect The Nation. Constructing massive Railway & Highway Bridges to unite remote terrain across Northeast India."
  }
];

const MARQUEE_ITEMS = [
  "ISO 9001:2015 Certified",
  "Northeast India's Steel Leader",
  "Precision Bridge Engineering",
  "Advanced PEB Manufacturing",
  "Government Approved Class-1A Contractor",
  "Heavy Industrial Fabrication",
  "Sustainable Infrastructure Solutions",
  "Innovative Steel Skeletons",
  "Assam's Premier Engineering Enterprise"
];

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

const CinematicModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0c0a09]">
      {/* Hidden container for 100% SEO accessibility and crawler indexing of all texts */}
      <div className="sr-only" aria-hidden="true">
        {HERO_SLIDES.map((slide, idx) => (
          <article key={idx}>
            <h2>{slide.titlePrefix}{slide.titleHighlight}</h2>
            <span>{slide.badge}</span>
            <p>{slide.rawText}</p>
          </article>
        ))}
      </div>

      {/* Full cinematic video blend */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-[104%] h-[104%] object-cover scale-[1.03]"
          src={assetPath('/hero/WA_1778356649487.mp4')}
          poster={assetPath('/hero/frame-1.png')}
          autoPlay
          muted
          loop
          playsInline
          style={{
            filter: 'brightness(0.82) saturate(0.72) contrast(1.1) sepia(0.12)',
          }}
        />

        {/* Seamless cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at center,
                transparent 52%,
                rgba(12,10,9,0.18) 72%,
                rgba(12,10,9,0.42) 88%,
                rgba(12,10,9,0.78) 100%
              ),
              linear-gradient(
                to bottom,
                rgba(12,10,9,0.42) 0%,
                transparent 18%,
                transparent 82%,
                rgba(12,10,9,0.42) 100%
              )
            `,
          }}
        />

        {/* Left-side readability gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(12,10,9,0.88) 0%, rgba(12,10,9,0.55) 28%, rgba(12,10,9,0.12) 58%, rgba(12,10,9,0) 78%)',
          }}
        />

        {/* Extra cinematic top haze */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.38) 100%)',
          }}
        />
      </div>

      {/* Outer viewport vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 58%, rgba(12,10,9,0.18) 78%, rgba(12,10,9,0.65) 100%)',
        }}
      />

      {/* Main layout */}
      <div className="relative z-10 h-full flex items-center justify-between px-8 md:px-16 lg:px-20 max-w-screen-2xl mx-auto w-full pb-16 lg:pb-24">
        {/* ── LEFT SIDE ── */}
        <div className="flex flex-col justify-center max-w-xl w-full min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col animate-fadeIn"
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-zinc-300 text-xs font-semibold tracking-[0.3em] uppercase">
                  {HERO_SLIDES[currentSlide].badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7.5xl font-black text-white tracking-tight leading-[0.92] uppercase mb-6">
                {HERO_SLIDES[currentSlide].titlePrefix}
                <br />
                <span className="text-red-500">
                  {HERO_SLIDES[currentSlide].titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-zinc-300 font-light max-w-md leading-relaxed mb-10">
                {HERO_SLIDES[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Link
              href="/projects"
              className="group/btn flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg shadow-red-900/20 hover:scale-[1.03] active:scale-[0.98]"
            >
              Our Projects
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Contact Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 flex items-center gap-6 md:gap-8 text-zinc-400 text-xs md:text-sm font-medium border-t border-white/5 pt-8 w-fit flex-wrap"
          >
            <a
              href="tel:+919678027684"
              className="flex items-center gap-2.5 hover:text-red-500 transition-colors duration-300 group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-950/30 group-hover:border-red-500/30 transition-all duration-300">
                <Phone className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-none mb-1">Call Technical Desk</span>
                <span className="text-zinc-300 font-semibold group-hover:text-white transition-colors duration-300">+91 96780 27684</span>
              </div>
            </a>

            <div className="w-px h-8 bg-zinc-800/60 hidden sm:block" />

            <a
              href="mailto:structro.infratech@gmail.com"
              className="flex items-center gap-2.5 hover:text-red-500 transition-colors duration-300 group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-950/30 group-hover:border-red-500/30 transition-all duration-300">
                <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-none mb-1">Email Inquiries</span>
                <span className="text-zinc-300 font-semibold group-hover:text-white transition-colors duration-300">structro.infratech@gmail.com</span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT SIDE ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="hidden lg:flex flex-col items-center justify-center h-full gap-0 select-none py-16"
        >

          {/* Vertical Overlapping / Pattern STRUCTRO */}
          <div className="flex flex-col items-center animate-pulse-slow" style={{ gap: '0.01em' }}>
            {STRUCTRO_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: i % 2 === 0 ? -12 : 12 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: '"Unbounded", "Syncopate", "Montserrat", sans-serif',
                  fontSize: 'clamp(3.5rem, 5.2vw, 6.2rem)',
                  lineHeight: 0.72,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.92)',
                  WebkitTextStroke:
                    i % 2 === 0 ? '2px rgba(255,255,255,0.6)' : 'none',
                  display: 'block',
                  textShadow: i % 2 !== 0 ? '0 0 25px rgba(255,255,255,0.15)' : 'none',
                  zIndex: i,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Bottom label */}
          <div className="mt-4 self-start ml-4">
            <span
              className="text-zinc-400 text-[0.6rem] font-bold tracking-[0.35em] uppercase"
              style={{
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              INFRATECH
            </span>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Bottom Infinite Marquee Ribbon */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-black/45 backdrop-blur-md border-t border-white/5 py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center mx-12">
              <span className="w-1.5 h-1.5 bg-red-600 rotate-45 mr-4 flex-shrink-0"></span>
              <span className="text-zinc-400 hover:text-white text-xs md:text-sm font-bold uppercase tracking-[0.25em] transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicModernHero;