import { featuredProductsData } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, Ruler, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = featuredProductsData.find((item) => item.id === id);

  if (!product) notFound();

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pb-20">
      {/* 1. Industrial Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden border-b border-white/10">
        <Image 
          src={product.image} 
          alt={product.title} 
          fill 
          className="object-cover opacity-40 scale-105"
          priority
        />
        {/* Engineering Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        
        <Container className="relative z-10 h-full flex flex-col justify-end pb-12">
       
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-8 bg-red-600" />
                <span className="text-red-500 font-bold tracking-[0.3em] text-xs uppercase">Industrial Grade</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none">
                {product.title}
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-xl text-zinc-400 max-w-xl border-l-2 border-zinc-800 pl-6">
                Engineered for resilience. Built with precision-grade materials to meet 
                <span className="text-white"> {product.specs} </span> structural requirements.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Technical Content Section */}
      <Container className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Specs & Overview */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview with "Blueprint" feel */}
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-6 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-red-600" /> 01. Overview
              </h2>
              <p className="text-xl text-zinc-300 leading-relaxed font-light">
                {product.description || `The ${product.title} represents the pinnacle of heavy engineering. Optimized for durability in extreme conditions, this solution integrates modular design with high-tensile structural integrity.`}
              </p>
            </div>

            {/* Features as Technical Cards */}
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-red-600" /> 02. Core Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features?.map((feature, idx) => (
                  <div key={idx} className="group p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-xl hover:bg-zinc-900 hover:border-red-600/50 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-zinc-800 rounded-lg group-hover:text-red-500 transition-colors">
                        <Shield className="w-5 h-5" />
                      </div>
                      <span className="text-zinc-200 font-medium tracking-tight">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar: Action & Data */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              
              {/* Data Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-1 bg-red-600" /> {/* Top accent line */}
                <div className="p-8">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Technical Specifications</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Ruler className="w-4 h-4" />
                        <span className="text-sm">Standard Size</span>
                      </div>
                      <span className="font-bold text-white">{product.specs}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm">Material Grade</span>
                      </div>
                      <span className="font-bold text-white uppercase">Industrial</span>
                    </div>
                  </div>

                  <Link href="/contact" className="block mt-10">
                    <Button variant="red" size="xl" className="w-full h-16 text-lg font-black group">
                      REQUEST A QUOTE
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4">
                <CheckCircle2 className="text-red-600 w-8 h-8" />
                <p className="text-xs text-zinc-400 font-medium leading-snug">
                  All Structro Infratech products are <span className="text-white">ISO 9001:2015</span> certified for quality assurance.
                </p>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}