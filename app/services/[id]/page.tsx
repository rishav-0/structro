/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, ArrowUpRight, CheckCircle, Target, Wrench, Building2, FlaskConical, Layers } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getPublicCollectionData } from "@/lib/public-db-server";
import Image from "next/image";
import { ImageGallery } from "@/components/image-gallery";

interface GalleryImage {
  url: string;
  alt?: string;
}

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  homeDescription: string;
  features: string[];
  image: string;
  images?: GalleryImage[];
  alt: string;
  navDescription: string;
  catalog: { title: string; description: string; image?: string }[];
}

const getInitials = (title: string) => {
  if (!title) return "";
  return title
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 3);
};

// Per-slug metadata map
const serviceMetaMap: Record<string, { title: string; description: string; keywords: string[] }> = {
  bridge: {
    title: "Bridge Engineering Services | Railway, Highway & FOB Bridges | Structro Infratech Assam",
    description:
      "Structro Infratech designs and builds railway bridges, road over bridges, foot over bridges, arch and suspension bridges across Northeast India. ISO certified. Call +91-9678027684.",
    keywords: [
      "Railway Bridge Construction Assam",
      "Road Over Bridge Guwahati",
      "Foot Over Bridge Northeast India",
      "Bridge Engineering Company Assam",
      "Steel Truss Bridge Fabrication",
      "Open Web Bridge Contractor",
    ],
  },
  peb: {
    title: "PEB Buildings Guwahati | Pre-Engineered Buildings Assam | Structro Infratech",
    description:
      "Structro Infratech builds Pre-Engineered Buildings (PEB) across Assam & Northeast India. Industrial sheds, warehouses, commercial complexes. Up to 80m clear span. ISO certified.",
    keywords: [
      "PEB Buildings Assam",
      "Pre-Engineered Buildings Guwahati",
      "Industrial Shed Contractor Northeast India",
      "PEB Warehouse Assam",
      "Steel Shed Manufacturer Guwahati",
      "PEB Factory Shed Assam",
    ],
  },
  design: {
    title: "Engineering Design Services | Structural Drawings, BOQ & 3D Modeling | Structro Infratech",
    description:
      "Structro Infratech provides structural drawings, 3D modeling, BOQ estimation, site surveys, load testing and IS/IRC certified reports for steel projects across Northeast India.",
    keywords: [
      "Structural Engineering Design Guwahati",
      "BOQ Estimation Assam",
      "Engineering Drawings Northeast India",
      "Structural Analysis Guwahati",
      "3D Modeling Steel Structure",
      "Steel Structure Consultant Assam",
    ],
  },
  steel: {
    title: "Steel Structures & Industrial Sheds Guwahati | Warehouses, Factories & Hangars | Structro",
    description:
      "Structro Infratech builds industrial steel structures across Northeast India — warehouses, factory sheds, aircraft hangars, commercial complexes and custom fabrication. ISO 9001:2015.",
    keywords: [
      "Industrial Shed Construction Guwahati",
      "Steel Warehouse Assam",
      "Factory Shed Contractor Northeast India",
      "Aircraft Hangar Fabrication",
      "Steel Structure Company Guwahati",
      "Conventional Shed Assam",
    ],
  },
  "special-metal": {
    title: "Special Metal Structures | Stainless Steel & Inconel Fabrication Guwahati | Structro",
    description:
      "Structro Infratech specializes in stainless steel and Inconel structural fabrication for pharmaceutical, chemical, food-grade and defence applications across Northeast India.",
    keywords: [
      "Stainless Steel Fabrication Guwahati",
      "Inconel Fabrication Northeast India",
      "Special Metal Structures Assam",
      "SS Fabrication Guwahati",
      "Pharmaceutical Plant Fabrication",
      "Defence Grade Steel Fabrication",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meta = serviceMetaMap[id];
  if (meta) {
    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
    };
  }
  // Fallback for unknown service IDs
  return {
    title: "Services | Structro Infratech — Steel Engineering Company Guwahati",
    description:
      "Explore Structro Infratech's engineering services across Northeast India. ISO 9001:2015 certified.",
  };
}

// Service-specific trust section rendered instead of generic Corporate Identity block
function ServiceTrustSection({ id }: { id: string }) {
  if (id === "bridge") {
    return (
      <section className="py-24 bg-gray-50 border-y border-gray-200 relative overflow-hidden">
        <Container>
          <div className="text-center mb-12">
            <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Capabilities</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
              Bridge Engineering Strengths
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Span Range", value: "20m – 500m+", desc: "Railway, highway, and long-span corridor projects" },
              { label: "Bridge Types", value: "9+", desc: "Railway, arch, truss, suspension, FOB, Bailey & more" },
              { label: "ISO Certified", value: "9001:2015", desc: "Quality-assured fabrication and site execution" },
              { label: "States Covered", value: "8 NE States", desc: "From Assam to Arunachal Pradesh and beyond" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-sm border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <p className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-2">{item.label}</p>
                <p className="text-4xl font-extrabold text-primary mb-3">{item.value}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (id === "peb") {
    return (
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <Container>
          <div className="text-center mb-12">
            <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Why Structro for PEB</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
              Proven PEB Delivery Metrics
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Delivery Timeline", value: "120 Days", desc: "Turnkey for projects up to 15,000 sq.ft" },
              { label: "Workshop Facility", value: "55,000 sq.ft", desc: "In-house fabrication at Rani, Guwahati" },
              { label: "Clear Span", value: "Up to 80m", desc: "Column-free industrial spans available" },
              { label: "Monthly Capacity", value: "500 MT", desc: "Consistent in-house fabrication output" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-sm border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <p className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-2">{item.label}</p>
                <p className="text-4xl font-extrabold text-primary mb-3">{item.value}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (id === "design") {
    return (
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Tools & Software</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 uppercase tracking-tight">
                Design Software We Use
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "STAAD.Pro",
                  "AutoCAD",
                  "Tekla Structures",
                  "ETABS",
                  "MS Excel (BOQ)",
                  "IS 800 / IRC Standards",
                ].map((tool, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white border border-gray-200 rounded-sm px-4 py-3 shadow-sm">
                    <Wrench className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary text-white rounded-sm p-10 shadow-xl">
              <Layers className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Standalone Consulting</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Our design team is available for standalone consulting engagements, independent of construction contracts. We provide BOQ preparation, certified structural reports, and seismic compliance checks for third-party projects.
              </p>
              <Link href="/contact">
                <Button variant="saffron" size="lg">
                  Request Design Consultation
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (id === "special-metal") {
    return (
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <Container>
          <div className="text-center mb-12">
            <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Industries Served</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
              Who We Build For
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our special metal fabrication serves industries where standard steel is insufficient — precision, corrosion resistance, and compliance are non-negotiable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: "Pharmaceutical Plants", icon: <FlaskConical className="w-6 h-6 text-accent" /> },
              { label: "Chemical Processing Units", icon: <FlaskConical className="w-6 h-6 text-accent" /> },
              { label: "Food-Grade Facilities", icon: <Building2 className="w-6 h-6 text-accent" /> },
              { label: "Defence & Aerospace", icon: <Target className="w-6 h-6 text-accent" /> },
              { label: "Oil & Gas", icon: <Layers className="w-6 h-6 text-accent" /> },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-sm p-6 text-center shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="bg-primary/10 w-12 h-12 rounded-sm flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-900 text-sm uppercase tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (id === "steel") {
    return (
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <Container>
          <div className="text-center mb-12">
            <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Structure Types</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
              What We Build
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Heavy Structural Works",
              "Factory Sheds",
              "Industrial Warehouses",
              "Conventional Sheds",
              "Commercial Complexes",
              "Agricultural Structures",
              "Aircraft Hangars",
              "Military / Defence Structures",
              "Custom Steel Fabrication",
            ].map((type, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-sm p-5 flex items-center gap-3 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
                <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm shrink-0 font-bold text-white text-xs">
                  {idx + 1}
                </div>
                <span className="font-semibold text-gray-800 text-sm">{type}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Default: no section for unknown service IDs
  return null;
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let service: Service | null = null;
  
  try {
    const dbServices = await getPublicCollectionData("services") as any[];
    service = dbServices.find((serviceItem) => serviceItem.id === id) as any || null;
  } catch (e) {
    console.error("Error fetching service from DB:", e);
  }

  if (!service) return notFound();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white pt-20 md:pt-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 py-12 md:py-16 lg:grid-cols-2 lg:gap-16">
            <div>
              
              <h1 className="mb-4 text-4xl font-extrabold uppercase leading-tight tracking-tighter text-gray-900 md:text-6xl">
                {service.title}
              </h1>
              <p className="mb-8 max-w-xl text-lg font-medium leading-relaxed text-gray-600">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button variant="saffron" size="xl" className="border-none shadow-xl">
                    Get Technical Advice
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="xl">
                    View Projects
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <ImageGallery
                mainImage={service.image}
                mainAlt={service.alt}
                images={service.images}
                priority
                containerClassName="relative aspect-4/3 overflow-hidden rounded-lg bg-transparent"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Advantages Section (Conditional) */}
      {(service as any).advantages && (
        <section className="relative overflow-hidden border-y border-gray-200 bg-gray-50 py-24 text-gray-900">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <Container>
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Strategic Value</p>
                <h2 className="text-4xl font-bold mb-8 uppercase leading-tight tracking-tight">Key Advantages</h2>
                <div className="w-20 h-1.5 bg-primary mb-8" />
                <p className="text-lg leading-relaxed text-gray-600">
                  Our systems-based approach ensures efficiency, quality, and cost-effectiveness tailored to industrial demands.
                </p>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {(service as any).advantages.map((adv: any, index: number) => (
                  <div key={index} className="group rounded-sm border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                    <CheckCircle className="w-8 h-8 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="mb-3 text-lg font-bold uppercase tracking-wider text-gray-900">{adv.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-600">{adv.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Catalog Section */}
      <section className="py-24 bg-white relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-bold uppercase tracking-[0.3em] mb-4">Specializations</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
              Service Catalog
            </h2>
            <div className="h-1.5 w-24 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.catalog && service.catalog.length > 0 ? (
              service.catalog.map((item, index) => {
                const showImage = item.image;
                return (
                  <div 
                    key={index} 
                    className="group flex flex-col bg-gray-50 hover:bg-white border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-300 relative rounded-lg overflow-hidden h-full"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-gray-200/50">
                      {showImage ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1b2a] via-[#142c44] to-[#0c1b2a] flex flex-col items-center justify-center gap-2 overflow-hidden">
                          {/* Technical grid overlay */}
                          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
                          {/* Subtle circular lines */}
                          <div className="absolute w-24 h-24 border border-white/5 rounded-full flex items-center justify-center">
                            <div className="absolute w-16 h-16 border border-dashed border-white/5 rounded-full" />
                          </div>
                          <Building2 className="w-8 h-8 text-accent/60 relative z-10 transition-transform duration-500 group-hover:scale-110" />
                          <span className="text-white/40 font-mono text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded relative z-10 select-none">
                            {getInitials(item.title)}
                          </span>
                        </div>
                      )}
                    </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-gray-900 mb-2.5 uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium flex-grow">
                      {item.description}
                    </p>
                  </div>
                </div>
              );})
            ) : null}
          </div>
        </Container>
      </section>

      {/* Service-Specific Trust Section (replaces generic Corporate Identity block) */}
      <ServiceTrustSection id={id} />

      {/* Applications Section (Conditional) */}
      {(service as any).applications && (
        <section className="py-24 bg-gray-50 border-y border-gray-200">
          <Container>
            <div className="text-center mb-16">
              <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Industries Served</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Application Areas</h2>
              <div className="h-1 w-24 bg-primary mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(service as any).applications.map((app: any, index: number) => (
                <div key={index} className="bg-white p-8 shadow-sm border-t-4 border-accent rounded-sm hover:-translate-y-1 transition-transform">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">
                    {app.category}
                  </h3>
                  <ul className="space-y-3">
                    {app.items.map((item: string, iIndex: number) => (
                      <li key={iIndex} className="flex items-start gap-3 text-gray-600">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="text-sm font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Structural Specifications (Conditional) */}
      {(service as any).specifications && (
        <section className="py-24 bg-white relative">
          <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="group relative aspect-4/3 overflow-hidden rounded-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                  alt="Technical Excellence"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                   <div className="flex h-full w-full flex-col items-center justify-center border border-white/70 bg-white/55 p-6 text-center backdrop-blur-[2px]">
                     <p className="text-3xl font-extrabold uppercase tracking-[0.2em] text-gray-900 drop-shadow-lg">Structural Accuracy</p>
                     <p className="mt-4 bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-white">Engineered to Perfection</p>
                   </div>
                </div>
              </div>
              <div>
                <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Technical Details</p>
                <h2 className="text-4xl font-bold text-gray-900 mb-12 uppercase tracking-tight">Specifications</h2>
                <div className="space-y-10">
                  {(service as any).specifications.map((spec: any, index: number) => (
                    <div key={index} className="flex gap-6 group">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border-2 border-primary font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide group-hover:text-primary transition-colors">
                          {spec.section}
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-medium text-sm">
                          {spec.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 blueprint-overlay" />
        </div>
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
            READY TO START YOUR NEXT PROJECT?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
            Join hands with Structro Infra Tech for responsible, safe, and high-integrity 
            infrastructure solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact">
              <Button variant="saffron" size="xl" className="shadow-xl transform hover:-translate-y-1 transition-all">
                REQUEST CONSULTATION
              </Button>
            </Link>
            <div className="flex flex-col gap-2">
              <a href="tel:+919678027684">
                <Button variant="white-outline" size="xl" className="w-full">
                  CALL: +91 96780 27684
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
