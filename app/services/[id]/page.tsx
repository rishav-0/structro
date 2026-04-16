/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle, Target, Shield, Users, Lightbulb, TrendingUp, HardHat, Building2, MapPin, Calendar, Briefcase, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { servicesData, companyVision, projectsData } from "@/lib/data";

interface ServicePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Structro Infra Tech`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  // Filter projects related to this service
  const relatedProjects = projectsData.completed.filter(
    (p) => p.serviceId === service.id
  ).slice(0, 6);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 blueprint-overlay opacity-10" />
        </div>

        <Container className="relative z-10">
        
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight uppercase tracking-tighter drop-shadow-lg">
              {service.title}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl font-medium drop-shadow-md">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="saffron" size="xl" className="shadow-xl border-none">
                  Get Technical Advice
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="white-outline" size="xl" className="backdrop-blur-sm transition-all">
                  View Projects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Identity & Vision Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-accent p-2 rounded-sm text-accent-foreground">
                    <Target className="w-5 h-5" />
                 </div>
                 <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] px-2 py-0.5 bg-accent/10 rounded-sm">
                    Our Philosophy
                 </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 uppercase tracking-tight">
                Corporate Identity<br/>& Vision
              </h2>
              <p className="text-xl font-semibold text-primary mb-10 italic border-l-4 border-accent pl-6 leading-relaxed">
                &quot;{companyVision.philosophy}&quot;
              </p>
              <div className="space-y-5">
                {companyVision.principles.map((principle, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl border-8 border-gray-50">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                alt="Construction vision"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white shadow-xl rounded-sm border-b-4 border-accent">
                <p className="text-accent font-bold text-xs uppercase tracking-[0.2em] mb-2 text-center">Our Commitment</p>
                <p className="text-gray-800 text-base font-semibold text-center italic leading-tight">Delivering enduring value in every project through innovation and integrity.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Advantages Section (Conditional) */}
      {(service as any).advantages && (
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <Container>
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Strategic Value</p>
                <h2 className="text-4xl font-bold mb-8 uppercase leading-tight tracking-tight">Key Advantages</h2>
                <div className="w-20 h-1.5 bg-primary mb-8" />
                <p className="text-gray-400 text-lg leading-relaxed">
                  Our systems-based approach ensures efficiency, quality, and cost-effectiveness tailored to industrial demands.
                </p>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {(service as any).advantages.map((adv: any, index: number) => (
                  <div key={index} className="bg-white/5 p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group rounded-sm shadow-sm">
                    <CheckCircle className="w-8 h-8 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-white">{adv.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">{adv.description}</p>
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
              service.catalog.map((item, index) => (
                <div key={index} className="group p-8 border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-300 relative rounded-sm">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center mb-6 font-bold text-primary-foreground rounded-sm text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              ))
            ) : null}
          </div>
        </Container>
      </section>

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
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
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
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl group">
                <Image 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                  alt="Technical Excellence"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                   <div className="w-full h-full border border-white/40 flex flex-col items-center justify-center text-center p-6 bg-gray-900/40 backdrop-blur-[2px]">
                      <p className="text-white text-3xl font-extrabold uppercase tracking-[0.2em] drop-shadow-lg">Structural Accuracy</p>
                      <p className="text-white font-bold mt-4 tracking-widest bg-accent px-4 py-1 text-sm uppercase">Engineered to Perfection</p>
                   </div>
                </div>
              </div>
              <div>
                <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Technical Details</p>
                <h2 className="text-4xl font-bold text-gray-900 mb-12 uppercase tracking-tight">Specifications</h2>
                <div className="space-y-10">
                  {(service as any).specifications.map((spec: any, index: number) => (
                    <div key={index} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 border-2 border-primary text-primary flex items-center justify-center font-bold rounded-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
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

      {/* Related Projects Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[40px] border-white/5 rounded-full pointer-events-none" />
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <p className="text-accent font-bold uppercase tracking-[0.3em] mb-4">Portfolo</p>
              <h2 className="text-4xl md:text-5xl font-bold uppercase">
                Featured Projects
              </h2>
            </div>
            <Link href="/projects">
              <Button variant="red" size="lg" className="px-8">
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProjects.map((project) => (
              <div key={project.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-6 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem]">
                    {project.title}
                  </h3>
                  <div className="space-y-4 text-sm text-gray-400 mb-8 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{project.location}</span>
                    </div>
                    {project.client && (
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-accent" />
                        <span>Client: {project.client}</span>
                      </div>
                    )}
                    {project.period && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>Period: {project.period}</span>
                      </div>
                    )}
                    {project.quantity && (
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span>Scale: {project.quantity}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-primary/50 text-[11px] uppercase tracking-widest text-accent border-l-2 border-accent">
                    {project.scope || "Fabrication & Erection"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

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
