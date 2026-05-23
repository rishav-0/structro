import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import type { Metadata } from 'next';
import SiteCta from "@/components/SiteCta";
import { CheckCircle2, Target, ShieldCheck, Factory, Settings, Flame, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Us | Structro Infra Tech',
  description: 'Learn about Structro Infra Tech, pioneers of structural engineering and high-precision construction in Assam.',
  keywords: ['About Structro', 'Company History', 'Steel Engineering Guwahati', 'Assam Construction', 'Core Values'],
}

export default function AboutPage() {
  
  const stats = [
    { label: "DISTRICTS COVERED", value: "32+" },
    { label: "VERIFIED PROJECTS", value: "300+" },
    { label: "TONNAGE FABRICATED", value: "100K+" },
    { label: "STATES COVERED", value: "7+" },
  ];

  const capabilities = [
    {
      title: "Precision Cutting",
      description: "High-definition CNC Plasma cutting for millimetric accuracy.",
      icon: <Settings className="w-6 h-6 text-accent" />
    },
    {
      title: "Auto Welding",
      description: "Submerged Arc Welding (SAW) for deep-penetration structural joints.",
      icon: <Flame className="w-6 h-6 text-accent" />
    },
    {
      title: "Surface Prep",
      description: "Integrated shot-blasting unit for superior paint adhesion.",
      icon: <Factory className="w-6 h-6 text-accent" />
    },
    {
      title: "Load Testing",
      description: "In-house hydraulic rigs for component-level stress verification.",
      icon: <Activity className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <div className="">
      <PageHero
        eyebrow="OUR LEGACY"
        title={<>Solid as<br />The Northeast.</>}
        description="With our extensive engineering heritage, Structro Infra Tech's journey began with pioneering the integration of advanced structural engineering with regional construction expertise in Assam."
      />

      {/* Genesis Section */}
      <Container className="py-24">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
            GENESIS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            HISTORY OF US.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600 leading-relaxed text-lg">
          <p>
            Before we were a firm, we were a mission. The journey of Structro Infra Tech began as the collective brainchild of four visionaries who identified a fundamental stagnation in regional development: the reliance on outdated methods for critical steel infrastructure.
          </p>
          <p>
            Driven by the goal to upgrade the traditional steel engineering processes in Northeast India, they spent years developing proprietary technologies and stress-testing methodologies that would eventually become the technical bedrock of our company today.
          </p>
        </div>
      </Container>

      {/* Corporate Excellence Section */}
      <div className="bg-gray-50 py-24 border-y border-gray-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Bridging Corporate Excellence with Regional Pride.
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  For too long, major infrastructure in Northeast India was built with a generic approach that ignored the region's unique seismic and geotechnical complexities.
                </p>
                <p>
                  Structro Infra Tech was formed to change that. We bring modern engineering analysis—typically reserved for mega-metros—to the residential, commercial, and industrial projects of Assam. Our mission is to ensure every square foot we build is a square foot that lasts.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-full shrink-0">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">VISION</h3>
                  <p className="text-gray-600">To be the most trusted structural benchmark in Northeast India by 2030.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-full shrink-0">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">QUALITY</h3>
                  <p className="text-gray-600">Every join, every foundation, every material choice is verified across a 12-point rigor list.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Fabrication Facility Section */}
      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              FABRICATION FACILITY
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              THE STRUCTRO FABRICATION HUB.
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-12">
              Our dedicated 55,000 sq. ft. workshop in Guwahati serves as the engineering engine of our operations, allowing us to maintain absolute quality control over every structural component.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {capabilities.map((item, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary text-white p-8 rounded-lg inline-block">
              <div className="text-5xl font-bold text-accent mb-2">500 MT</div>
              <div className="text-sm font-bold uppercase tracking-wider">Monthly Fabrication Capacity</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/images/process/a.jpeg" alt="Welding process" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image src="/images/process/b.jpeg" alt="Steel beams" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image src="/images/process/c.jpeg" alt="Heavy machinery" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/images/process/d.jpeg" alt="Facility interior" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Stats Section */}
      <div className="bg-primary py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </h2>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Leadership Section */}
      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              THE VISIONARY
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              LEADERSHIP.
            </h2>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
              <Image src="/images/process/e.jpeg" alt="S. K. Baruah" fill className="object-cover grayscale" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Nipu Baishya</h3>
            <p className="text-accent font-medium uppercase tracking-wider text-sm mt-1">Managing Director</p>
          </div>
          <div className="lg:col-span-2 lg:pt-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              A LEGACY OF TECHNICAL RIGOR AND REGIONAL COMMITMENT.
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg mb-12">
              <p>
                S. K. Baruah brings extensive specialized technical expertise to the structural landscape of Northeast India. As the driving energy behind Structro Infra Tech, he has transitioned the organization from a four-person visionary mission to an industry benchmark for seismic-resilient construction today.
              </p>
              <p>
                His leadership is defined by an uncompromising "Engineering-First" philosophy, where every joint, weld, and foundation is treated as a critical link in regional safety. Under his tenure, the firm has delivered over 300+ projects, consistently bridging the gap between sophisticated corporate-grade engineering and the unique geotechnical complexities of the Brahmaputra valley.
              </p>
            </div>
            <div className="flex gap-12 border-t border-gray-200 pt-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">FOCUS</p>
                <p className="font-bold text-gray-900">SEISMIC RETROFITTING & PEB</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">EXPERTISE</p>
                <p className="font-bold text-gray-900">INDUSTRIAL OPERATIONS</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Team Spirit Section */}
      <div className="bg-gray-50 py-24 border-y border-gray-100">
        <Container>
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              TEAM SPIRIT
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Led by Engineers, Built by Experts.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <Image src="/images/process/f.jpeg" alt="Structural Design" fill className="object-cover grayscale group-hover:scale-105 transition-all duration-700" />
              </div>
              <p className="text-accent text-sm font-bold uppercase tracking-wider mb-2">MODELING & ANALYSIS</p>
              <h3 className="text-xl font-bold text-gray-900">STRUCTURAL DESIGN</h3>
            </div>
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <Image src="/hero/frame-1.png" alt="Field Operations" fill className="object-cover grayscale group-hover:scale-105 transition-all duration-700" />
              </div>
              <p className="text-accent text-sm font-bold uppercase tracking-wider mb-2">SITE MANAGEMENT</p>
              <h3 className="text-xl font-bold text-gray-900">FIELD OPERATIONS</h3>
            </div>
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <Image src="/images/exp.png" alt="Quality Assurance" fill className="object-cover grayscale group-hover:scale-105 transition-all duration-700" />
              </div>
              <p className="text-accent text-sm font-bold uppercase tracking-wider mb-2">MATERIAL ENGINEERING</p>
              <h3 className="text-xl font-bold text-gray-900">QUALITY ASSURANCE</h3>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <Container className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              HELP CENTER
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              INQUISITIVE ENGINEERING.
            </h2>
            <p className="text-gray-600 text-lg">
              Answering the technical and logistical questions that fuel our heavy-duty infrastructure projects.
            </p>
          </div>
          
          <div className="space-y-4">
            <details className="group bg-white border border-gray-200 rounded-lg open:border-primary/30 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 cursor-pointer list-none hover:bg-gray-50">
                <span className="text-lg">01. WHAT MAKES BUILDING IN ASSAM STRUCTURALLY DIFFERENT?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-primary"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                Assam falls in Seismic Zone V, requiring specialized ductility analysis. We also factor in extremely high soil moisture levels and annual flood patterns when designing foundations.
              </div>
            </details>
            
            <details className="group bg-white border border-gray-200 rounded-lg open:border-primary/30 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 cursor-pointer list-none hover:bg-gray-50">
                <span className="text-lg">02. DO YOU PROVIDE CONSULTANCY FOR EXTERNAL CIVIL CONTRACTORS?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-primary"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                Yes. While we are turnkey contractors, we offer pure structural consulting, vetting, and seismic retrofitting kits for other construction firms.
              </div>
            </details>
            
            <details className="group bg-white border border-gray-200 rounded-lg open:border-primary/30 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 cursor-pointer list-none hover:bg-gray-50">
                <span className="text-lg">03. WHAT IS YOUR TYPICAL LEAD TIME FOR PEB INDUSTRIAL SHEDS?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-primary"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                For industrial sheds up to 15,000 sq. ft., we typically deliver a turnkey structure within 120 days from soil stabilization completion.
              </div>
            </details>
            
            <details className="group bg-white border border-gray-200 rounded-lg open:border-primary/30 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 cursor-pointer list-none hover:bg-gray-50">
                <span className="text-lg">04. ARE THE FABRICATION COMPONENTS MANUFACTURED IN-HOUSE?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-primary"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                Every major structural member—purlins, frames, and custom steel plates—is fabricated in our 55,000 sq. ft. Guwahati Facility to ensure millimetrical accuracy.
              </div>
            </details>
          </div>
        </div>
      </Container>

      {/* Map Section */}
      <div className="bg-gray-100 py-16 border-t border-gray-200">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Find Us</h2>
            <p className="text-gray-600 mt-2">Visit both our head office and workshop locations in Assam</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Head Office</h3>
                <p className="text-sm text-gray-600">Christian Basti, Guwahati, Assam</p>
              </div>
              <div className="bg-gray-200 rounded-lg h-64 overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4509.166628943781!2d91.7755516!3d26.1569559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59003ad2c8c3%3A0x45df74d231f0e84c!2sStructro%20Infra%20Tech!5e1!3m2!1sen!2sin!4v1776015415897!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Workshop</h3>
                <p className="text-sm text-gray-600">Rani, Guwahati, Assam</p>
              </div>
              <div className="bg-gray-200 rounded-lg h-64 overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4102.698420047236!2d91.5887681!3d26.0463064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a410007764fb1%3A0x269c33cf41adcb77!2sStructro%20Infra%20Tech%20Rani%20(%20Workshop%20)!5e1!3m2!1sen!2sin!4v1778258046366!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <SiteCta />
    </div>
  )
}

