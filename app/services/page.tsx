

import { Button } from "@/components/ui/button"
import { ArrowUpRight, Waypoints, Building2, HardHat, Waves, CheckCircle, Clock, Shield, Award, PenTool } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { Metadata } from 'next';

import { servicesData } from "@/lib/data";

export const metadata: Metadata = {
  title: 'Services | Structro Infratech - Bridge Engineering, PEB Buildings, Steel Structures',
  description: 'Structro Infratech offers comprehensive steel engineering services including bridge engineering (Open Web, Railway, Highway, Foot Over, Composite, Arch, Baily, Cable-Stayed), PEB buildings, conventional sheds, and water staging infrastructure.',
  keywords: ['Bridge Engineering', 'PEB Buildings', 'Pre-Engineered Buildings', 'Steel Structures', 'Industrial Sheds', 'Water Staging', 'Bridge Construction Guwahati', 'PEB Manufacturers Assam'],
}

export default function ServicesPage() {
  
  const services = servicesData;

  const benefits = [
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: "Timely Delivery",
      description: "We understand the importance of deadlines and commit to delivering projects on schedule."
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Safety First",
      description: "Zero compromise on safety with rigorous protocols and risk management practices."
    },
    {
      icon: <Award className="w-6 h-6 text-accent" />,
      title: "Quality Assurance",
      description: "ISO 9001:2015 certified processes ensure consistent quality across all projects."
    }
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[350px]">
        <div className="absolute inset-0 bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
            alt="Steel construction site"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        <Container className="relative h-full flex flex-col justify-center">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4 drop-shadow-sm">
            Our Services
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            Comprehensive<br/>
            <span className="drop-shadow-sm">Steel Engineering Solutions</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg mt-6 max-w-2xl font-medium">
            From bridge engineering to PEB buildings—delivering excellence in every project 
            across Northeast India.
          </p>
        </Container>
      </div>

      {/* Benefits Bar */}
      <div className="bg-gray-900 py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Services Sections */}
      {services.map((service, index) => (
        <div key={service.id} id={service.id} className={`py-24 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
          <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary p-3 rounded-sm text-primary-foreground">
                    {service.icon}
                  </div>
                  <span className="text-accent text-sm font-bold uppercase tracking-[0.2em]">
                    {service.subtitle}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <a href={`/services/${service.id}`}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-3 rounded-sm">
                      Full Details
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                  <a href="/projects">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-sm">
                      View Projects
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button variant="ghost" className="text-primary font-semibold px-6 py-3 rounded-sm">
                      Consultation
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      ))}

      {/* Process Section */}
      <div className="bg-primary py-24">
        <Container>
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              How We Deliver Excellence
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your requirements" },
              { step: "02", title: "Design", desc: "Expert engineering & planning" },
              { step: "03", title: "Construction", desc: "Quality execution" },
              { step: "04", title: "Delivery", desc: "On-time project handover" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4 shadow-lg">
                  <span className="text-accent-foreground font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-primary-foreground font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-primary-foreground/70 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-24">
        <div className="bg-gray-900 rounded-lg p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our team of experienced engineers is ready to discuss your project requirements 
            and provide tailored solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-3 rounded-sm shadow-md">
                Request Technical Consultation
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+919678027684">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-3 rounded-sm">
                  Call: +91 96780 27684
                </Button>
              </a>
              <a href="tel:+917002245491">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-3 rounded-sm">
                  Call: +91 70022 45491
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
