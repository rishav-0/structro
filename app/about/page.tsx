import { PageHero } from "@/components/page-hero";
import { Award, Shield, Leaf, Lightbulb, Calendar } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { Metadata } from 'next';
import WhyChooseUs from "@/components/WhyChooseUs";
import SiteCta from "@/components/SiteCta";


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

  return (
    <div className="">
      <PageHero
        eyebrow="About Us"
        title={<>Building Infrastructure<br />Since 2000</>}
        description="Structro Infratech is a steel engineering company serving Northeast India through bridge construction, PEB buildings, and industrial infrastructure delivery."
      />

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
            <p className="text-gray-600 mt-2">Visit both our head office and workshop locations in Assam</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Head Office</h3>
                <p className="text-sm text-gray-600">Christian Basti, Guwahati, Assam</p>
              </div>
              <div className="bg-gray-200 rounded-lg h-100 overflow-hidden">
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
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Workshop</h3>
                <p className="text-sm text-gray-600">Rani, Guwahati, Assam</p>
              </div>
              <div className="bg-gray-200 rounded-lg h-100 overflow-hidden">
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
