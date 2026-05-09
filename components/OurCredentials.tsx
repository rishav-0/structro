"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./ui/container";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const clients = [
  {
    category: "Central Govt.",
    name: "Indian Railways",
    description: "Ministry of Railways",
    highlight: false,
  },
  {
    category: "Inland Waterways",
    name: "IWAI",
    description: "Inland Waterways Authority",
    highlight: false,
  },
  {
    category: "Aviation",
    name: "AAI",
    description: "Airports Authority of India",
    highlight: false,
  },
  {
    category: "Infrastructure",
    name: "NHIDCL",
    description: "National Highways & Infra",
    highlight: true,
  },
  {
    category: "Strategic Infra",
    name: "BRO",
    description: "Border Roads Organization",
    highlight: false,
  },
  {
    category: "Defense",
    name: "MES",
    description: "Military Engineer Services",
    highlight: false,
  },
  {
    category: "Public Works",
    name: "State Govt.",
    description: "Government of Assam & Others",
    highlight: false,
  },
  {
    category: "Industrial & Commercial",
    name: "Private Parties",
    description: "Major Corporate Clients",
    highlight: false,
  },
];

const OurCredentials = () => {
  return (
    <section className="bg-gray-50 py-24 overflow-hidden border-y border-gray-200">
      <Container>
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          {/* Left: Title */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4"
            >
              Our Trust
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] uppercase tracking-tight"
            >
              Our
              <br />
              Credentials.
            </motion.h2>
          </motion.div>

          {/* Right: Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600 text-base leading-relaxed self-end max-w-lg"
          >
            We are proud to be a verified partner for some of India&rsquo;s most
            critical infrastructure departments. Our operational capability and
            structural rigor have made us a preferred choice for high-stakes
            government and private projects.
          </motion.p>
        </div>

        {/* Client Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative flex flex-col justify-between p-8 min-h-[220px] rounded-md bg-white border border-gray-200 group cursor-pointer hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Arrow reveal on hover */}
              <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-accent">
                {client.category}
              </p>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tight mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {client.name}
                </h3>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] leading-relaxed text-gray-400">
                  {client.description}
                </p>
              </div>

              {/* Accent underline — grows on hover */}
              <div className="mt-6 h-[3px] w-8 bg-accent/40 transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default OurCredentials;
