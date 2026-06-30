import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import type { Metadata } from 'next';
import SiteCta from "@/components/SiteCta";
import { CheckCircle2, Target, ShieldCheck, Factory, Settings, Flame, Activity } from "lucide-react";
import { StatsCounter } from "@/components/StatsCounter";

export const metadata: Metadata = {
  title: 'About Us | Structro Infra Tech',
  description: 'Learn about Structro Infra Tech — founded in 2000, Northeast India\'s premier steel engineering firm with 55,000 sq.ft in-house fabrication and 200+ completed projects.',
  keywords: ['About Structro', 'Steel Engineering Guwahati', 'Assam Construction Company', 'Northeast India Infrastructure', 'ISO Certified Steel Contractor'],
}

export default function AboutPage() {
  
  const stats = [
    { label: "PROJECTS", end: 200, suffix: "+" },
    { label: "TONNAGE EXECUTED", end: 100, suffix: "K+" },
    { label: "STATES COVERED", end: 7, suffix: "+" },
  ];

  const capabilities = [
    {
      title: "Precision Cutting",
      description: "High-accuracy and Plasma cutting systems engineered for precise structural fabrication and dimensional consistency.",
      icon: <Settings className="w-6 h-6 text-accent" />
    },
    {
      title: "Advanced Welding",
      description: "Certified welding procedures and quality-controlled fabrication methods designed for high-strength structural performance.",
      icon: <Flame className="w-6 h-6 text-accent" />
    },
    {
      title: "Surface Preparation",
      description: "Industrial-grade finishing and surface treatment processes that improve corrosion resistance and long-term durability.",
      icon: <Factory className="w-6 h-6 text-accent" />
    },
    {
      title: "Load Testing & Inspection",
      description: "Comprehensive inspection and testing protocols conducted to ensure structural integrity, fabrication accuracy, and project compliance.",
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
        <div className="max-w-5xl mx-auto space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>
            Before Structro became an infrastructure company, it began as a response to a growing challenge in Northeast India — the need for modern, dependable, and engineering-driven structural solutions capable of withstanding the region’s demanding terrain and seismic conditions.
          </p>
          <p>
            Founded by a Team of Engineering Professionals with deep experience in structural execution and fabrication, Structro was built on a simple principle: infrastructure should not only be constructed quickly, but engineered to perform safely for decades. What started as a focused fabrication and structural works initiative has evolved into a multidisciplinary engineering and infrastructure company delivering high-performance solutions across industrial, commercial, and public-sector projects.
          </p>
          <p>
            Today, Structro combines advanced fabrication capabilities, modern engineering practices, and disciplined project execution to deliver infrastructure that meets the highest standards of strength, precision, and reliability.
          </p>
        </div>
      </Container>

      {/* Corporate Excellence Section */}
      <div className="bg-gray-50 py-24 border-y border-gray-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight uppercase">
                Bridging Corporate Excellence with Regional Pride.
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  For decades, critical infrastructure across Northeast India faced unique engineering challenges — difficult terrain, high rainfall, seismic activity, and logistical complexity. Structro was established to bridge the gap between national-level engineering standards and region-specific execution expertise.
                </p>
                <p>
                  We bring a corporate-grade approach to infrastructure development while remaining deeply connected to the realities of the region we serve. Our team understands the technical, environmental, and operational demands of building in Northeast India, enabling us to execute projects with greater precision, efficiency, and long-term durability.
                </p>
                <p>
                  At Structro, every structure represents more than construction — it reflects our commitment to engineering integrity, safety, and regional progress.
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
                  <p className="text-gray-600">Engineering structures that stand stronger today and create value for generations tomorrow.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-full shrink-0">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">QUALITY</h3>
                  <p className="text-gray-600">Quality at Structro is embedded into every phase of execution — from engineering design and material selection to fabrication, welding, inspection, and final installation. Our processes follow strict quality-control standards to ensure every structural component achieves maximum durability, dimensional accuracy, and long-term performance reliability.</p>
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
            <div className="text-gray-600 leading-relaxed text-lg mb-12 space-y-4">
              <p>Our advanced fabrication facility in Guwahati serves as the operational backbone of Structro’s infrastructure capabilities. Designed for precision manufacturing and large-scale structural production, the facility enables us to maintain complete control over fabrication quality, project timelines, and execution efficiency.</p>
              <p>Equipped with modern machinery, certified welding systems, and skilled fabrication teams, the Structro Fabrication Hub supports the production of structural steel systems for industrial buildings, bridge components, infrastructure projects, and customized engineering applications.</p>
            </div>
            
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
              <div className="text-5xl font-bold text-accent mb-2">200-500 MT</div>
              <div className="text-sm font-bold uppercase tracking-wider mb-4">Monthly Fabrication Capacity</div>
              <div className="text-sm text-primary-foreground/80 max-w-sm">Structro maintains a scalable production ecosystem capable of supporting fast-track infrastructure projects, industrial developments, and heavy structural fabrication requirements across Northeast India.</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/about/a.png" alt="Welding process" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image src="/about/b.png" alt="Steel beams" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image src="/about/c.png" alt="Heavy machinery" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/about/d.png" alt="Facility interior" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Stats Section */}
      <div className="bg-primary py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 divide-x divide-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
                  <StatsCounter end={stat.end} suffix={stat.suffix} />
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
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Managing Director
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            LEADERSHIP PROFILE.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Left Profile Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden p-6">
              <div className="rounded-xl overflow-hidden mb-6 bg-gray-50 border border-gray-100">
                <Image 
                  src="/about/nipu.png" 
                  alt="Nipu Baishya, Managing Director" 
                  width={800} 
                  height={1000} 
                  className="w-full h-auto object-cover aspect-[4/5] hover:scale-102 transition-transform duration-500" 
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Nipu Baishya</h3>
              <p className="text-accent font-semibold uppercase tracking-wider text-sm mt-1">Managing Director</p>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 italic leading-relaxed text-sm relative pl-6">
                  <span className="absolute left-0 top-0 text-2xl text-accent font-serif leading-none">&ldquo;</span>
                  Driving engineering excellence across Northeast India through innovation, precision, and uncompromising quality.
                  <span className="text-2xl text-accent font-serif leading-none">&rdquo;</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Profile Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Legacy Section */}
            <div>
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">THE VISIONARY LEADERSHIP</h3>
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                A Legacy of Technical Excellence
              </h4>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  As the Managing Director of Structro Infra Tech, Nipu Baishya has led the company from a small engineering venture into a trusted EPC and structural steel organization serving industrial, commercial, and infrastructure sectors across Northeast India. His vision is built on technical rigor, disciplined execution, and long-term client relationships.
                </p>
                <p>
                  With expertise in Pre-Engineered Buildings (PEB), heavy structural steel, industrial fabrication, bridge structures, and turnkey EPC execution, he has established an engineering-first culture where every drawing, weld, connection, and foundation is treated as a critical component of project success.
                </p>
              </div>
            </div>

            {/* Leadership Philosophy */}
            <div className="bg-gray-50 rounded-2xl border border-gray-150 p-8">
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">Core Principles</h3>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Leadership Philosophy</h4>
              <ul className="space-y-4">
                {[
                  "Engineering before aesthetics.",
                  "Safety without compromise.",
                  "Quality in every fabrication and installation.",
                  "Transparency with clients and stakeholders.",
                  "Continuous innovation through technology and skilled manpower."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Expertise (Table / Grid) */}
            <div>
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">Domain Knowledge</h3>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Core Expertise</h4>
              
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider w-1/2">Focus Areas</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider w-1/2">Specialization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {[
                      { focus: "Pre-Engineered Buildings (PEB)", spec: "Industrial EPC Projects" },
                      { focus: "Heavy Structural Steel", spec: "Project Management" },
                      { focus: "Steel Bridges & Infrastructure", spec: "Fabrication Excellence" },
                      { focus: "Industrial Sheds & Warehouses", spec: "Quality & Safety Systems" },
                      { focus: "Design Coordination", spec: "Business Strategy & Leadership" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-gray-700 font-medium text-base">{row.focus}</td>
                        <td className="px-6 py-4 text-gray-600 text-base">{row.spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vision Statement */}
            <div className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-xl p-4">
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2">Vision Statement</h3>
              <p className="text-lg font-bold text-gray-900 italic leading-relaxed">
                &ldquo;To engineer and build resilient infrastructure that powers industries, strengthens communities, and creates lasting value through world-class structural steel solutions and EPC excellence.&rdquo;
              </p>
            </div>

            {/* Closing Message */}
            <div className="border-t border-gray-150 pt-8">
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">Our mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To deliver safe, innovative, and high-quality engineering solutions through technical excellence, precision execution, and an unwavering commitment to our clients, people, and communities.
              </p>
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
                <Image src="/about/design.png" alt="Structural Design" fill className="object-cover grayscale group-hover:scale-105 transition-all duration-700" />
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
                Assam falls in Seismic Zone VI, requiring specialized ductility analysis. We also factor in extremely high soil moisture levels and annual flood patterns when designing foundations.
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

            <details className="group bg-white border border-gray-200 rounded-lg open:border-primary/30 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 cursor-pointer list-none hover:bg-gray-50">
                <span className="text-lg">05. HOW DO YOU ENSURE WELDING QUALITY AND INTEGRITY?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-primary"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                We employ AWS-certified welders and perform rigorous non-destructive testing (NDT), including ultrasonic and dye penetrant inspections, on all critical structural joints prior to site dispatch.
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-lg open:border-primary/30 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 cursor-pointer list-none hover:bg-gray-50">
                <span className="text-lg">06. CAN PRE-ENGINEERED BUILDINGS (PEB) BE EXPANDED IN THE FUTURE?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-primary"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                Yes. PEB structures are highly flexible and modular. Our designs incorporate specific framing connections that allow for easy longitudinal extension or side expansion with minimal disruption to your ongoing operations.
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-lg open:border-primary/30 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 cursor-pointer list-none hover:bg-gray-50">
                <span className="text-lg">07. WHAT STUFF/GRADES OF STEEL DO YOU TYPICALLY UTILIZE?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-primary"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                We primarily use high-grade structural steel conforming to IS 2062 (Grades E250/E350) and equivalent international standards (such as ASTM A36 or A572), sourced directly from primary national manufacturers like SAIL, TATA, and JSW.
              </div>
            </details>
          </div>
        </div>
      </Container>

      {/* Map Section */}
      <div className="bg-gray-100 py-16 border-t border-gray-200">
        <Container>
          {/* 8-State Coverage */}
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">SERVICE COVERAGE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Operating Across the Northeast Indian States</h2>
            <p className="text-gray-600 mb-8">From our Guwahati base, we deliver steel engineering solutions across the entire Northeast region.</p>
          
          </div>
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

