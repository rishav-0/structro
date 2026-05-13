"use client";
import { Container } from "@/components/ui/container";
import { Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FoundationalPhilosophy() {
  return (
    <div className="bg-gray-50 py-24 overflow-hidden relative border-y border-gray-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-2 lg:order-1 h-[400px] sm:h-[500px]">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30, y: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 w-[80%] max-w-[400px] bg-white p-8 shadow-xl rounded-sm border-l-4 border-red-600 z-10"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Avoid Delays</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Time overruns are profit killers. We stick to our schedules rigorously, using advanced modular techniques to beat deadlines.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 right-0 w-[85%] max-w-[420px] bg-[#001e40] p-8 shadow-2xl rounded-sm z-20"
            >
              <div className="w-12 h-12 bg-[#ea8000]/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-[#ea8000]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Guaranteed Execution</h3>
              <p className="text-gray-300 text-sm leading-relaxed">From foundation laying to final superstructure, we handle the complexity so you can focus on your business.</p>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-[#ea8000] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Foundational Philosophy
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#001e40] mb-6 leading-tight">
              Construction shouldn&apos;t be a headache.
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We bring corporate-grade engineering and absolute predictability to heavy infrastructure projects across Assam and Northeast India. No excuses, just results.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-[#ea8000]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Transparent Budgeting</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Fixed-price contracts with zero hidden escalation clauses. You pay what we agreed upon.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-[#ea8000]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Seismic-Resistant Engineering</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Northeast India is Zone V. Our structures are engineered specifically for extreme seismic events.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
