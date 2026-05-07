"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  Search,
  Construction,
  Key,
  ShieldCheck,
  Settings2,
  Zap,
  Scale,
  GitMerge,
  DraftingCompass,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ---------------- DATA ---------------- */

const processSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We analyze your vision, constraints, and site conditions to eliminate uncertainty early.",
    icon: Search,
    tags: ["Survey", "Budget", "Alignment"],
    img: "/images/hero/c.png",
  },
  {
    num: "02",
    title: "Engineering & Design",
    desc: "Advanced CAD + structural simulations tailored for seismic conditions.",
    icon: DraftingCompass,
    tags: ["Blueprints", "3D Models", "Seismic"],
    img: "/images/hero/a.png",
  },
  {
    num: "03",
    title: "Approval & Procurement",
    desc: "Permits, compliance, and sourcing high-grade materials.",
    icon: ClipboardCheck,
    tags: ["Permits", "Sourcing", "QA"],
    img: "/images/hero/b.png",
  },
  {
    num: "04",
    title: "Construction",
    desc: "Execution with strict monitoring, safety, and quality control.",
    icon: Construction,
    tags: ["Fabrication", "Safety", "Execution"],
    img: "/images/hero/c.png",
  },
  {
    num: "05",
    title: "Final Handoff",
    desc: "Audit, certification, and delivery of a ready-to-use structure.",
    icon: Key,
    tags: ["Audit", "Certification", "Delivery"],
    img: "/images/hero/a.png",
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
  return (
    <div className="bg-white text-[#0a192f]">

      {/* ---------------- HERO ---------------- */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-white to-[#f4f5f7] relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />

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
      <section className="py-28 bg-[#f4f5f7]">
        <Container>
          <div className="relative">

            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200" />

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
                  <div className={`relative h-[260px] rounded-sm overflow-hidden shadow-xl ${i % 2 !== 0 ? "md:order-1" : ""}`}>
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
      <section className="py-28 bg-gradient-to-br from-[#0a192f] to-black text-white">
        <Container>

          <h2 className="text-5xl font-bold mb-16">
            Compliance & Safety
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regulatoryData.map((item, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur rounded-sm border border-white/10 hover:-translate-y-2 transition">
                <item.icon className="mb-4 text-primary" />

                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* ---------------- STANDARD CTA ---------------- */}
      <section className="py-24 bg-white">
        <Container className="relative h-[400px] rounded-sm overflow-hidden group">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Architecture" 
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110 shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight">
              Ready to Build<br/>Something Great?
            </h2>
            <p className="text-gray-200 text-base mb-8 leading-relaxed max-w-md font-medium">
              From concept to completion, our team of experienced engineers delivers infrastructure that stands the test of time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="red" size="lg" className="rounded-sm font-bold uppercase tracking-widest text-xs">
                  Request Technical Consultation
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
};

export default ProcessClient;