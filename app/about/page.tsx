import { Button } from "@/components/ui/button"
import { ArrowUpRight, Award, Shield, Leaf, Lightbulb, Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Metadata } from 'next';
import WhyChooseUs from "@/components/WhyChooseUs";


export const metadata: Metadata = {
  title: 'About Us | Structro Infratech - Steel Engineering Company Guwahati',
  description: 'Learn about Structro Infratech, a leading steel engineering company founded by four professionals in the early 2000s. ISO 9001:2015 certified. Connecting dreams through quality construction since 2000.',
  keywords: ['About Structro', 'Company History', 'Steel Engineering Guwahati', 'ISO 9001:2015', 'Core Values'],
}

export default function AboutPage() {
  
  const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Years of Experience", value: "25+" },
    { label: "Team Members", value: "400+" },
    { label: "Client Satisfaction", value: "95%" },
  ];

  const values = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our dealings. No hidden costs, no broken promises—just honest communication and transparent contracts.",
      icon: <Shield className="w-6 h-6 text-primary-foreground" />,
      color: "bg-primary"
    },
    {
      title: "Quality",
      description: "Zero compromise on quality. Every project undergoes rigorous quality checks to ensure durability, safety, and excellence in execution.",
      icon: <Award className="w-6 h-6 text-primary-foreground" />,
      color: "bg-primary"
    },
    {
      title: "Sustainability",
      description: "Building for the future with eco-conscious materials, efficient methods, and long-term thinking to reduce environmental impact.",
      icon: <Leaf className="w-6 h-6 text-primary-foreground" />,
      color: "bg-primary"
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge technology and modern engineering techniques to deliver future-ready infrastructure solutions.",
      icon: <Lightbulb className="w-6 h-6 text-primary-foreground" />,
      color: "bg-primary"
    },
  ];

  const timeline = [
    {
      year: "Early 2000s",
      title: "Foundation",
      description: "Founded by four experienced professionals with a vision to transform infrastructure in Northeast India."
    },
    {
      year: "July 6, 2018",
      title: "Official Registration",
      description: "Structro Infratech officially registered as a company, formalizing decades of expertise."
    },
    {
      year: "2019",
      title: "ISO Certification",
      description: "Achieved ISO 9001:2015 certification, demonstrating commitment to international quality standards."
    },
    {
      year: "Present",
      title: "Industry Leader",
      description: "Leading steel engineering company in Assam and Northeast India with 500+ successful projects."
    }
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0 bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Steel structure construction"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        <Container className="relative h-full flex flex-col justify-center">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4 drop-shadow-sm">
            About Us
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl">
            Building Infrastructure<br/>
            <span className="text-accent drop-shadow-sm">Since 2000</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg mt-6 max-w-2xl font-medium">
            Structro Infratech is a leading steel engineering company in Northeast India, 
            specializing in bridge construction, PEB buildings, and industrial infrastructure.
          </p>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </h2>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Company Story Section */}
      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              From Vision to Reality
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Structro Infratech was founded in the early 2000s by four experienced professionals 
                who shared a common vision: to transform the infrastructure landscape of Northeast India 
                with world-class steel engineering solutions.
              </p>
              <p>
                The company was officially registered on <strong>July 6th, 2018</strong>, formalizing 
                decades of collective expertise in bridge construction, pre-engineered buildings, and 
                industrial infrastructure development.
              </p>
              <p>
                Today, we are proud to be one of the most trusted names in the construction industry 
                in Assam and across Northeast India, having successfully delivered 500+ projects that 
                stand as testaments to our commitment to excellence.
              </p>
            </div>
            
            {/* ISO Certification Badge */}
            <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-4">
              <Award className="w-12 h-12 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">ISO 9001:2015 Certified</h3>
                <p className="text-gray-600 text-sm">Quality Management System recognized internationally</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                alt="Construction team at work"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">Since 2000</p>
                  <p className="text-gray-500 text-sm">Connecting dreams through quality construction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

     

      {/* Core Values Section */}
      <Container className="py-24 ">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Core Values
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            The Four Pillars of Our Success
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            These values guide every decision we make and every project we undertake.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-sm border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`${item.color} p-4 rounded-sm mb-6 w-fit`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

{/* Map Section */}
      <div className="bg-gray-100 py-16">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Find Us</h2>
            <p className="text-gray-600 mt-2">Visit our head office in Guwahati, Assam</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="bg-gray-200 rounded-lg h-[400px] overflow-hidden">
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
        </Container>
      </div>

      {/* Standard CTA Section */}
      <section className="py-24 bg-white">
        <Container className="relative h-[400px] rounded-sm overflow-hidden group">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Architecture" 
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight">
              Ready to Build<br/>Your Project?
            </h2>
            <p className="text-gray-200 text-base mb-8 leading-relaxed max-w-md font-medium">
              Let our experienced team help you turn your vision into reality. 
              Contact us for a technical consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="red" size="lg" className="rounded-sm font-bold uppercase tracking-widest text-xs">
                  Get a Quote
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="white-outline" size="lg" className="rounded-sm font-bold uppercase tracking-widest text-xs">
                  View Our Projects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      
    </div>
  )
}
