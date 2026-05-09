"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Anchor,
  Factory,
  Landmark,
  Plane,
  Route,
  Shield,
  Train,
  Wrench,
  type LucideIcon,
} from "lucide-react";
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
      icon: Train,
    name: "Indian Railways",
    description: "Ministry of Railways",
    highlight: false,
  },
  {
    category: "Inland Waterways",
      icon: Anchor,
    name: "IWAI",
    description: "Inland Waterways Authority",
    highlight: false,
  },
  {
    category: "Aviation",
      icon: Plane,
    name: "AAI",
    description: "Airports Authority of India",
    highlight: false,
  },
  {
    category: "Infrastructure",
      icon: Route,
    name: "NHIDCL",
    description: "National Highways & Infra",
    highlight: true,
  },
  {
    category: "Strategic Infra",
      icon: Shield,
    name: "BRO",
    description: "Border Roads Organization",
    highlight: false,
  },
  {
    category: "Defense",
      icon: Wrench,
    name: "MES",
    description: "Military Engineer Services",
    highlight: false,
  },
  {
    category: "Public Works",
      icon: Landmark,
    name: "State Govt.",
    description: "Government of Assam & Others",
    highlight: false,
  },
  {
    category: "Industrial & Commercial",
      icon: Factory,
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
            <CredentialCard key={index} client={client} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

type Credential = (typeof clients)[number];

function CredentialCard({ client, index }: { client: Credential; index: number }) {
  const Icon = client.icon as LucideIcon;

  return (
    <motion.div
      variants={fadeUp}
      className={`group relative flex min-h-[240px] cursor-pointer flex-col justify-between overflow-hidden rounded-md border bg-white p-8 transition-all duration-300 ${client.highlight
        ? "border-primary/30 shadow-lg shadow-primary/10"
        : "border-gray-200 hover:border-primary/30 hover:shadow-xl"
        }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 -translate-y-1 translate-x-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            {client.category}
          </p>
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-300 ${client.highlight
              ? "border-primary/25 bg-primary text-white"
              : "border-primary/12 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"
              }`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.8} />
          </div>
        </div>

        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-200 transition-colors duration-300 group-hover:text-primary/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="mb-3 text-2xl font-black uppercase leading-tight tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-primary md:text-3xl">
          {client.name}
        </h3>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] leading-relaxed text-gray-400">
          {client.description}
        </p>
      </div>

      <div className="mt-6 h-[3px] w-8 bg-accent/40 transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
    </motion.div>
  );
}

export default OurCredentials;
