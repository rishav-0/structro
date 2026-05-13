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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SiteCta from "@/components/SiteCta";

/* ---------------- DATA ---------------- */

const processSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We analyze your vision, constraints, and site conditions to eliminate uncertainty early.",
    icon: Search,
    tags: ["Survey", "Budget", "Alignment"],
    img: "/images/process/a.jpeg",
  },
  {
    num: "02",
    title: "Engineering & Design",
    desc: "Advanced CAD + structural simulations tailored for seismic conditions.",
    icon: DraftingCompass,
    tags: ["Blueprints", "3D Models", "Seismic"],
    img: "/images/process/b.jpeg",
  },
  {
    num: "03",
    title: "Approval & Procurement",
    desc: "Permits, compliance, and sourcing high-grade materials.",
    icon: ClipboardCheck,
    tags: ["Permits", "Sourcing", "QA"],
    img: "/images/process/c.jpeg",
  },
  {
    num: "04",
    title: "Construction",
    desc: "Execution with strict monitoring, safety, and quality control.",
    icon: Construction,
    tags: ["Fabrication", "Safety", "Execution"],
    img: "/images/process/d.jpeg",
  },
  {
    num: "05",
    title: "Final Handoff",
    desc: "Audit, certification, and delivery of a ready-to-use structure.",
    icon: Key,
    tags: ["Audit", "Certification", "Delivery"],
    img: "/images/process/e.jpeg",
  },
];

const deepTechData = [
  {
    title: "Elastic Resilience",
    desc: "Structures absorb seismic stress without failure.",
    icon: Zap,
  },
  {
    title: "Tensile Integrity",
    desc: "High-strength welded joints exceed load requirements.",
    icon: Scale,
  },
  {
    title: "Corrosion Resistance",
    desc: "Multi-stage coating for humid environments.",
    icon: ShieldCheck,
  },
  {
    title: "Precision Geometry",
    desc: "Laser-aligned fabrication with FEA validation.",
    icon: GitMerge,
  },
];

const regulatoryData = [
  {
    title: "Safety Standards",
    desc: "Zero-incident policy with full PPE enforcement.",
    icon: ShieldCheck,
  },
  {
    title: "Building Laws",
    desc: "Strict compliance with zoning & FAR rules.",
    icon: Scale,
  },
  {
    title: "IS Codes",
    desc: "Aligned with national engineering standards.",
    icon: Zap,
  },
  {
    title: "Project Audits",
    desc: "Transparent audits for stakeholders.",
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
      <section className="py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">

            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Deep Engineering
              </h2>
              <p className="text-gray-500">
                We engineer materials and structures for long-term durability in extreme environments.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {deepTechData.map((item, i) => (
                <div key={i} className="p-6 bg-white/70 backdrop-blur rounded-sm border hover:shadow-xl transition">
                  <item.icon className="w-6 h-6 text-primary mb-4" />

                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>

      {/* ---------------- REGULATORY ---------------- */}
      <section className="border-y border-gray-200 bg-gray-50 py-28 text-gray-900">
        <Container>

          <h2 className="mb-16 text-5xl font-bold">
            Compliance & Safety
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regulatoryData.map((item, i) => (
              <div key={i} className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
                <item.icon className="mb-4 text-primary" />

                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
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