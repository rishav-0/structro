
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero";
import { ArrowUpRight, CheckCircle, Clock, Shield, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getPublicCollectionData } from "@/lib/public-db-server";

// Scale signals per service — tells buyers minimum project scope at a glance
const serviceScaleSignals: Record<string, string> = {
  bridge: "Span range 20m to 500m+ corridors",
  peb: "From 1,000 sq.ft to 1,00,000+ sq.ft",
  steel: "Custom scope — warehouses, factories, hangars",
  design: "Concept to certified drawings",
  "special-metal": "SS & Inconel — industrial & defence applications",
};

export const metadata: Metadata = {
  title: 'Services | Structro Infratech — Bridge, PEB & Steel Contractors Guwahati',
  description: 'Structro Infratech offers bridge engineering, PEB buildings, steel structures, design services and special metal fabrication across Northeast India. ISO 9001:2015 certified.',
  keywords: ['Steel Engineering Services Guwahati', 'Bridge Construction Assam', 'PEB Buildings Northeast India', 'Steel Structures Contractor', 'Design Services Guwahati'],
}

type ServiceSummary = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

export default async function ServicesPage() {
  const services = await getPublicCollectionData<ServiceSummary>("services").catch((error) => {
    console.error("Error fetching services:", error);
    return [];
  });

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
        <div key={service.id} id={service.id} className={`py-16 md:py-24 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
          <Container>
            <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}>

              {/* Image (Ordered first on mobile) */}
              <div className="w-full lg:w-1/2 order-1">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl shadow-lg border border-gray-100">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 order-2 text-center lg:text-left">
                

                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {service.title}
                </h2>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-lg mx-auto lg:mx-0">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3 group">
                      <div className="mt-1 bg-primary/10 p-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href={`/services/${service.id}`} className="w-full sm:w-auto">
                    <Button variant="saffron" size="xl" className="w-full font-bold shadow-md hover:shadow-lg transition-all">
                      TECHNICAL SPECS
                      <ArrowUpRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/projects" className="w-full sm:w-auto">
                    <Button variant="outline" size="xl" className="w-full font-bold border-2">
                      VIEW PROJECTS
                    </Button>
                  </Link>
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
