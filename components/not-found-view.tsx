"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  ArrowLeft,
  Search,
  Building2,
  PhoneCall,
  HardHat,
  Compass,
  Layers,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFoundView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blogs?category=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickLinks = [
    {
      title: "Bridge Engineering",
      desc: "Railway, highway, and girder steel bridge fabrication & erection across NE India.",
      href: "/services",
      icon: Layers,
      badge: "Services",
    },
    {
      title: "PEB & Industrial Sheds",
      desc: "Pre-engineered buildings, factory construction, and heavy warehouse structures.",
      href: "/services",
      icon: Building2,
      badge: "Solutions",
    },
    {
      title: "Featured Projects",
      desc: "Explore 200+ completed landmark infrastructure and ongoing engineering feats.",
      href: "/projects",
      icon: HardHat,
      badge: "Portfolio",
    },
    {
      title: "Stakeholder Portal",
      desc: "Vendor onboarding, contractor partnerships, and career applications.",
      href: "/stakeholder/contractor",
      icon: Compass,
      badge: "Portals",
    },
  ];

  return (
    <div className="relative min-h-[90vh] bg-[#070C14] text-white flex flex-col justify-center overflow-hidden py-16 md:py-24">
      {/* Background Architectural Grid & Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(234,88,12,0.12),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
      
      {/* Diagonal Steel Truss Hatching Accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          

          {/* Large Hero 404 Graphics */}
          <div className="relative my-2 select-none">
            <div className="text-[100px] sm:text-[140px] md:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent opacity-90 drop-shadow-2xl">
              4<span className="text-primary inline-block transform hover:rotate-12 transition-transform duration-300">0</span>4
            </div>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div className="h-0.5 w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
          </div>

          {/* Heading and Narrative */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4 mt-2">
            Structure Missing or Relocated
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            The engineering blueprint, file, or coordinate you requested does not exist in our system registry. It may have been decommissioned, renamed, or temporarily dismantled.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-xl mx-auto mb-10">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, services, or technical insights..."
                className="w-full pl-12 pr-28 py-3.5 bg-white/5 hover:bg-white/[0.07] focus:bg-black/80 border border-white/15 focus:border-primary rounded-xl text-white text-sm placeholder:text-gray-500 outline-none transition-all shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-primary text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all cursor-pointer shadow-md"
              >
                Search
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
            <Link href="/">
              <Button variant="saffron" size="lg" className="gap-2 shadow-lg shadow-primary/20 cursor-pointer">
                <Home size={18} />
                Return to Homepage
              </Button>
            </Link>

            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all hover:border-white/40 cursor-pointer"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            <Link href="/projects">
              <Button variant="outline" size="lg" className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white gap-2 cursor-pointer">
                <HardHat size={18} />
                Browse Projects
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-primary/40 text-primary bg-primary/5 hover:bg-primary/20 gap-2 cursor-pointer">
                <PhoneCall size={18} />
                Contact Helpdesk
              </Button>
            </Link>
          </div>

          {/* Popular Alternative Destinations */}
          <div className="text-left pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">
                  Quick Navigation
                </p>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  Suggested Structural Sections
                </h3>
              </div>
              <span className="hidden sm:flex items-center gap-1 text-xs text-gray-500 font-mono">
                <ShieldAlert className="w-3.5 h-3.5 text-primary" /> Verified Endpoints
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group relative p-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-primary/50 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                          <IconComponent size={20} />
                        </div>
                        <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-white/5 text-gray-400">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base group-hover:text-primary transition-colors mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                      Explore Section <ArrowRight size={14} className="ml-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>


        </div>
      </Container>
    </div>
  );
}
