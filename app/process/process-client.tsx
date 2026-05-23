"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ClipboardCheck,
  Search,
  Construction,
  Key,
  ShieldCheck,
  Zap,
  Scale,
  GitMerge,
  DraftingCompass,
  Factory,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SiteCta from "@/components/SiteCta";

/* ---------------- DATA ---------------- */

const processSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We analyze your vision, constraints, and site conditions to eliminate uncertainty early. Our engineering team conducts comprehensive geotechnical assessments and feasibility studies to ensure your structural requirements are perfectly aligned with optimal budgeting strategies from day one.",
    icon: Search,
    tags: ["Survey", "Budget", "Alignment"],
    img: "/images/process/a.jpeg",
  },
  {
    num: "02",
    title: "Engineering & Design",
    desc: "Advanced CAD + structural simulations tailored for seismic conditions. We utilize highly detailed 3D modeling and Finite Element Analysis (FEA) to validate load paths, wind resistance, and structural integrity before a single piece of steel is cut, guaranteeing precision.",
    icon: DraftingCompass,
    tags: ["Blueprints", "3D Models", "Seismic"],
    img: "/images/process/b.jpeg",
  },
  {
    num: "03",
    title: "Approval & Procurement",
    desc: "Permits, compliance, and sourcing high-grade materials. Our procurement specialists navigate regional regulations and strictly vet all raw materials, securing high-tensile steel and ensuring every component meets rigorous IS and international quality standards.",
    icon: ClipboardCheck,
    tags: ["Permits", "Sourcing", "QA"],
    img: "/images/process/c.jpeg",
  },
  {
    num: "04",
    title: "Manufacturing",
    desc: "Precision fabrication with strict monitoring and quality control. At our state-of-the-art facility, we leverage automated CNC plasma cutting and Submerged Arc Welding (SAW) to manufacture structural components with millimetric accuracy and zero defects.",
    icon: Factory,
    tags: ["Fabrication", "Quality", "Precision"],
    img: "/images/process/d.jpeg",
  },
  {
    num: "05",
    title: "Installation",
    desc: "Safe and efficient on-site assembly and erection of structures. Our certified installation crews execute the build using heavy lifting equipment, strictly adhering to our zero-incident safety protocols and precise timelines to bring the engineered blueprints to life.",
    icon: Construction,
    tags: ["Assembly", "Safety", "Erection"],
    img: "/images/process/e.jpeg",
  },
  {
    num: "06",
    title: "Final Handoff",
    desc: "Audit, certification, and delivery of a ready-to-use structure. The project undergoes a final multi-point quality inspection by our senior engineers, ensuring absolute compliance with safety parameters before we hand over the keys to a durable, legacy-grade facility.",
    icon: Key,
    tags: ["Audit", "Certification", "Delivery"],
    img: "/images/process/f.jpeg",
  },
];

const deepTechData = [
  {
    title: "ELASTIC RESILIENCE",
    desc: "Every steel member is rated for specific Young's Modulus values, ensuring the structure can absorb and dissipate seismic energy without catastrophic failure.",
    icon: Zap,
    tag: "SEISMIC TECH"
  },
  {
    title: "TENSILE INTEGRITY",
    desc: "We utilize Submerged Arc Welding (SAW) to achieve deep-penetration joints that exceed standard load-bearing requirements by 40%.",
    icon: Scale,
    tag: "LOAD RATING"
  },
  {
    title: "ATMOSPHERIC SHIELDING",
    desc: "Our three-stage surface preparation involves high-velocity shot-blasting and epoxy coating to fight the high humidity and corrosion of Northeast India.",
    icon: ShieldCheck,
    tag: "CORROSION RES."
  },
  {
    title: "PRECISION GEOMETRY",
    desc: "Millimetric tolerance checks using 3D laser scanners ensure that every beam aligns perfectly with the FEA (Finite Element Analysis) models.",
    icon: GitMerge,
    tag: "FEA VERIFICATION"
  },
];

const regulatoryData = [
  {
    title: "SAFETY STANDARDS",
    desc: "Strict 'Zero-Incident' policy enforced with full PPE compliance, frequent drills, and OSHA-aligned site management.",
    icon: ShieldCheck,
  },
  {
    title: "BUILDING LAWS",
    desc: "Full verification of land usage, municipal setbacks, and Floor Area Ratio (FAR) as per local town planning authorities.",
    icon: Scale,
  },
  {
    title: "IS GUIDELINES",
    desc: "Engineering at parity with IS 800:2007 (Steel) and IS 456:2000 (RCC) to maintain national infrastructure benchmarks.",
    icon: Zap,
  },
  {
    title: "PROJECT AUDITS",
    desc: "Biannual internal auditing and transparency reports provided to stakeholders for high-value industrial assets.",
    icon: ClipboardCheck,
  },
];

const ProcessClient = () => {
  const timelineRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 35%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });

  return (
    <div className="bg-white text-[#0a192f]">

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-linear-to-b from-white to-[#f4f5f7] pt-40 pb-24">
        <div className="absolute -top-25 -right-25 h-100 w-100 rounded-full bg-primary/10 blur-[120px]" />

        <Container>
          <div className="max-w-3xl">
            <motion.h4 className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Workflow
            </motion.h4>

            <motion.h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
              Engineered <br />
              <span className="text-primary">Precision</span>
            </motion.h1>

            <p className="mt-6 text-lg text-gray-500 max-w-xl">
              A disciplined execution model ensuring structural integrity,
              efficiency, and reliability at every stage.
            </p>

            <div className="mt-8">
              <Link href="/contact">
                <Button size="xl">
                  Start a Project <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- PROCESS TIMELINE ---------------- */}
      <section ref={timelineRef} className="py-28 bg-[#f4f5f7]">
        <Container>
          <div className="relative">

            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200 md:left-1/2" />
            <motion.div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-4 w-0.5 origin-top bg-primary md:left-1/2"
              style={{ scaleY: lineProgress }}
            />

            <div className="space-y-24">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="relative grid md:grid-cols-2 gap-12 items-center"
                >
                  {/* dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2" />

                  {/* text */}
                  <div className={`pl-12 ${i % 2 === 0 ? "md:pr-16" : "md:order-2 md:pl-16"}`}>
                    <span className="text-sm text-primary font-bold">
                      {step.num}
                    </span>

                    <h3 className="text-2xl font-bold mt-2">
                      {step.title}
                    </h3>

                    <p className="text-gray-500 mt-4">
                      {step.desc}
                    </p>

                    <div className="flex gap-2 mt-4 flex-wrap">
                      {step.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-white border rounded-sm text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* image */}
                  <div className={`relative h-65 overflow-hidden rounded-sm shadow-xl ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                    <Image src={step.img} alt="" fill className="object-cover hover:scale-105 transition duration-700" />
                  </div>


                </motion.div>
              ))}
            </div>

          </div>
        </Container>
      </section>

      {/* ---------------- DEEP TECH ---------------- */}
      <section className="py-28 bg-white border-y border-gray-100">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-4 sticky top-32">
              <p className="text-[#ea8000] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Deep Tech
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#001e40] leading-tight">
                THE MECHANICS<br />OF MATERIALS.
              </h2>
              <p className="text-gray-500 mb-10 leading-relaxed">
                We move beyond blueprints into molecular integrity. Our selection and processing of materials determine the lifespan of your asset in the variable climate of Assam.
              </p>
              
              <div className="inline-flex items-center gap-3 bg-gray-50 px-5 py-3 border-l-4 border-[#ea8000]">
                <GitMerge className="w-5 h-5 text-[#ea8000]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#001e40]">Physics-Driven Construction</span>
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              {deepTechData.map((item, i) => (
                <div key={i} className="bg-white p-10 hover:bg-gray-50 transition duration-300 group">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm group-hover:bg-[#ea8000]/10 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-[#ea8000]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#ea8000] uppercase tracking-widest">{item.tag}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-[#001e40]">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>

      {/* ---------------- REGULATORY ---------------- */}
      <section className="bg-[#00142e] py-28 text-white relative overflow-hidden">
        <Container className="relative z-10">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-8">
            <div>
              <p className="text-[#ea8000] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Regulatory Rigor
              </p>
              <h2 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                LEGAL & <br />
                SAFETY <br />
                COMPLIANCE.
              </h2>
            </div>
            
            <div className="lg:max-w-md">
              <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-[#ea8000] pl-6">
                We operate at 100% adherence to national building codes and regional municipal laws, ensuring Zero-Liability for our clients.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regulatoryData.map((item, i) => (
              <div key={i} className="border border-white/10 bg-[#001a3b] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 hover:bg-[#001e40] group cursor-pointer">
                <item.icon className="mb-8 text-[#ea8000] w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" strokeWidth={1.5} />

                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </Container>
      </section>

      <SiteCta
        eyebrow="Ready To Build Something Great?"
        title="Turn the right process into confident project execution."
        description="From concept review to execution planning, Structro helps structure technical decisions that hold up on site and over time."
        primaryLabel="Request Technical Consultation"
        secondaryLabel="View Projects"
      />

    </div>
  );
};

export default ProcessClient;