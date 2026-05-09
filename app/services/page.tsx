

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero";
import { ArrowUpRight, CheckCircle, Clock, Shield, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getCollectionData } from "@/lib/data-merge";

type ServiceSummary = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceSummary[]>([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const dbServices = await getCollectionData<ServiceSummary>("services");
        setServices(dbServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    loadServices();
  }, []);

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
      <PageHero
        eyebrow="Our Services"
        title={<>Comprehensive<br />Steel Engineering Solutions</>}
        description="From bridge engineering to PEB buildings, we deliver technical execution that fits the demands of projects across Northeast India."
      />

      {/* Benefits Bar */}
      <div className="border-y border-gray-200 bg-gray-50 py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="rounded-sm bg-white p-3 shadow-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
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
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Link href={`/services/${service.id}`}>
                    <Button variant="saffron" size="lg">
                      Full Details
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="outline" size="lg">
                      View Projects
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost" size="lg" className="text-primary font-semibold">
                      Consultation
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative aspect-4/3 overflow-hidden rounded-lg">
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
      {/* <div className="bg-primary py-24">
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
      </div> */}

      {/* CTA Section */}
      <Container className="py-24">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center md:p-16">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Need a Custom Solution?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Our team of experienced engineers is ready to discuss your project requirements
            and provide tailored solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="red" size="lg" className="shadow-md">
                Request Technical Consultation
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+919678027684">
                <Button variant="gold" size="lg">
                  Call: +91 96780 27684
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
