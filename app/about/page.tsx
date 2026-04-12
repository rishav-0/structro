import { Button } from "@/components/ui/button"
import { ArrowUpRight, Award, Shield, Leaf, Lightbulb, Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Structro Infratech - Steel Engineering Company Guwahati',
  description: 'Learn about Structro Infratech, a leading steel engineering company founded by four professionals in the early 2000s. ISO 9001:2015 certified. Connecting dreams through quality construction since 2000.',
  keywords: ['About Structro', 'Company History', 'Steel Engineering Guwahati', 'ISO 9001:2015', 'Core Values'],
}

export default function AboutPage() {
  
  const stats = [
    { label: "Projects Completed", value: "48+" },
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
      description: "Leading steel engineering company in Assam and Northeast India with 48+ successful projects."
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
                in Assam and across Northeast India, having successfully delivered 48+ projects that 
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

      {/* Timeline Section */}
      <div className="bg-gray-50 py-24">
        <Container>
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Milestones That Define Us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary/20 -translate-x-4" />
                )}
                <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full mb-4">
                    {item.year}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Core Values Section */}
      <Container className="py-24">
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
      <div className="bg-primary py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Experience That Matters
              </h2>
              <div className="space-y-6">
                {[
                  "Founded by 4 experienced professionals",
                  "Connecting dreams through quality construction since 2000",
                  "Zero compromise on safety and risk management",
                  "ISO 9001:2015 certified company",
                  "Strong presence across Northeast India"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-gray-200">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <a href="/contact">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-3 rounded-sm">
                    Request a Technical Consultation
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                  alt="Engineers discussing blueprints"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-24">
        <div className="bg-gray-900 rounded-lg p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Project?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let our experienced team help you turn your vision into reality. 
            Contact us for a technical consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-3 rounded-sm w-full sm:w-auto">
                Get a Quote
              </Button>
            </a>
            <a href="/projects">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-3 rounded-sm w-full sm:w-auto">
                View Our Projects
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
