"use client";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

export default function StructuralAdvantage() {
  const advantages = [
    {
      number: "01",
      title: "Speed of Execution",
      description: "Our modular structural approach and pre-engineered building systems reduce project timelines by up to 25% compared to conventional methods."
    },
    {
      number: "02",
      title: "Seismic Safety",
      description: "Operating in Seismic Zone V demands uncompromising structural integrity. Our designs undergo rigorous analysis to ensure maximum resilience."
    },
    null, // for the empty slot 03
    {
      number: "04",
      title: "Local Insight",
      description: "Decades of experience navigating Assam's unique soil conditions, monsoon challenges, and logistical constraints."
    }
  ];

  return (
    <div className="bg-[#001e40] py-24 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="relative">
            {/* Background Number */}
            <div className="absolute -top-10 -left-10 text-[200px] font-bold text-white/5 leading-none select-none pointer-events-none">
              STRUCTRO
            </div>
            
            <div className="relative z-10 pt-10">
              <p className="text-[#ea8000] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Structural Advantage
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Why leaders build with us.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Our approach isn&apos;t just about construction; it&apos;s about providing a strategic advantage. We engineer solutions that are built faster, last longer, and perform better under pressure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {advantages.map((adv, idx) => {
              if (!adv) return <div key={idx} className="hidden sm:block"></div>;
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="text-4xl font-bold text-[#ea8000] mb-4 font-serif">{adv.number}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{adv.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{adv.description}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </Container>
    </div>
  );
}
