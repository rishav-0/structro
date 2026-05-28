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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
    category: "Industrial",
    icon: Factory,
    name: "Private Parties",
    description: "Major Corporate Clients",
    highlight: false,
  },
];

const OurCredentials = () => {
  return (
    <section className="bg-white py-24 relative overflow-hidden border-y border-gray-200">
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4"
            >
              Our Trust
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Our Expertise Departments
            </motion.h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 text-base leading-relaxed md:max-w-md"
          >
            We are a verified partner for India&rsquo;s most demanding departments. Our structural rigor makes us the preferred choice for high-stakes engineering projects.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
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
      className="group relative bg-white border border-gray-200 rounded-md p-7 hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden flex flex-col justify-between h-[240px]"
    >
      {/* Decorative corner background */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[100px] z-0 group-hover:bg-primary/5 transition-colors duration-500" />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="w-14 h-14 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 text-primary shadow-sm">
          <Icon className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <span className="text-gray-200 font-bold text-2xl group-hover:text-primary/20 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-auto relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-hover:text-primary/70 transition-colors">
          {client.category}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
          {client.name}
        </h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-1">
          {client.description}
        </p>
      </div>

      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out" />
      
      {/* Subtle hover icon */}
      <ArrowUpRight className="absolute bottom-7 right-7 w-5 h-5 text-primary opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
    </motion.div>
  );
}

export default OurCredentials;
