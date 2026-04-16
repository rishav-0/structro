"use client"

import Hero from "@/components/hero"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Award, ShieldCheck, Leaf, CheckCircle, HardHat, Home, Factory, Package, Server } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { servicesData, projectsData, newLaunchesData, featuredProductsData } from "@/lib/data";
import NewHero from "@/components/NewHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import FaqSection from "@/components/FaqSection";

export default function Page() {

  const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Years Experience", value: "25+" },
    { label: "Team Members", value: "400+" },
    { label: "Client Satisfaction", value: "95%" },
  ];

  const marqueeItems = [
    "Bridge Engineering", "PEB Buildings", "Steel Structures",
    "Industrial Sheds", "Infrastructure", "Railway Bridges"
  ];

  const services = servicesData.slice(0, 3);

  const featuredProducts = featuredProductsData;

  const projects = projectsData.homeProjects;

  const values = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards. No hidden costs, no broken promises—just honest communication.",
      icon: <ShieldCheck size={20} className="text-white" />,
    },
    {
      title: "Quality",
      description: "Zero compromise on quality. Every project undergoes rigorous checks for durability and safety.",
      icon: <Award size={20} className="text-white" />,
    },
    {
      title: "Sustainability",
      description: "Building for the future with eco-conscious materials and efficient construction methods.",
      icon: <Leaf size={20} className="text-white" />,
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge technology and modern engineering techniques for future-ready solutions.",
      icon: <ArrowUpRight size={20} className="text-white" />,
    },
  ];

  return (
    <div className="">

      {/* <Hero /> */}

      <NewHero />

      <div className="w-full bg-white py-16 border-b border-gray-100">
        {/* Experience Numbers Section */}
        <Container className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <h2 className="text-5xl md:text-6xl font-bold text-primary mb-3">
                  {stat.value}
                </h2>
                <p className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>

        {/* Black Background Marquee Section */}
        <div className="bg-primary py-5 overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center mx-10">
                <span className="w-2 h-2 bg-accent rounded-full mr-4"></span>
                <span className="text-white text-lg md:text-xl font-bold uppercase tracking-wider whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <Container className="py-20" id="services">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Services
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Comprehensive Steel<br/>Engineering Solutions
            </h2>
          </div>
          <Link href="/services">
            <Button variant="saffron" size="lg">
              View All Services
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-md overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.homeImage || service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">{service.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm">{service.homeDescription || service.description}</p>
                <Link href="/services" className="inline-flex items-center text-primary font-semibold text-sm mt-3 hover:underline">
                  Technical Specs <ArrowUpRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* New Launches & Special Projects */}
      <div className="bg-gray-50 py-20 border-y border-gray-200">
        <Container>
          <div className="text-center mb-12">
            <span className="bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
              Project & Authority Engine
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">New Launches</h2>
            <p className="text-gray-500 mt-2">Latest additions to our heavy engineering portfolio</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {newLaunchesData.map((launch) => (
              <div key={launch.id} className="relative group overflow-hidden rounded-md border border-gray-200 bg-white p-2">
                <div className="aspect-video relative overflow-hidden mb-4">
                  <Image 
                    src={launch.image} 
                    alt={launch.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                    {launch.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900">{launch.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{launch.description}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-xs font-bold text-primary uppercase">{launch.region}</span>
                    <Link href={`/new-launches/${launch.id}`} className="text-xs font-bold text-gray-900 flex items-center hover:text-primary">
                      VIEW SPECS <ArrowUpRight className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Featured Products */}
      <div className="py-20 bg-gray-900 border-y border-gray-800">
        <Container>
          <div className="text-center mb-16">
            <span className="text-accent text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block bg-accent/10">
              Premium Solutions
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Our Featured Products</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="block w-full h-full">
                <div className="bg-gray-800 rounded-md overflow-hidden border border-gray-700 hover:border-accent/50 transition-all duration-300 group h-full">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                  </div>
                  <div className="p-6 relative -mt-8 bg-gray-800/90 backdrop-blur-sm rounded-t-xl h-full">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center mb-4 border border-gray-700 shadow-lg">
                      {product.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight mb-2 min-h-[3rem]">
                      {product.title}
                    </h3>
                    <div className="flex items-center text-gray-200 text-sm font-semibold">
                      <span className="bg-black/30 px-2 py-1 rounded-sm w-full backdrop-blur-sm border border-white/10 text-center">
                        {product.specs}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Stakeholder Portal System */}
      <div className="py-20 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <p className="text-secondary text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Stakeholder Portal
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Connect with<br/>Our Ecosystem
              </h2>
              <p className="text-gray-600 mb-8 max-w-md">
                We simplify our partnerships and hiring through streamlined digital intake. 
                Select your category below to be redirected to our secure registration form.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Contractors", desc: "Project tenders & site management", icon: <HardHat className="w-6 h-6" />, type: "Intake Form" },
                { title: "Vendors", desc: "Supply chain & material procurement", icon: <ShieldCheck className="w-6 h-6" />, type: "Registration" },
                { title: "Job Seekers", desc: "Career opportunities & applications", icon: <ArrowUpRight className="w-6 h-6" />, type: "Apply Now" }
              ].map((portal, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 p-8 rounded-md hover:border-primary/30 hover:shadow-xl transition-all group relative">
                  <div className="bg-white w-14 h-14 flex items-center justify-center rounded-md mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {portal.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">{portal.title}</h4>
                  <p className="text-sm text-gray-500 mb-8 leading-relaxed">{portal.desc}</p>
                  <button className="text-xs font-bold text-primary group-hover:translate-x-1 transition-all flex items-center gap-2">
                    {portal.type.toUpperCase()} <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Why Choose Us */}
      {/* <div className="bg-primary py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Experience That Sets Us Apart
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  "Founded by 4 experienced professionals",
                  "Connecting dreams through quality construction since 2000",
                  "Zero compromise on safety and risk management",
                  "ISO 9001:2015 certified company",
                  "Strong presence across Northeast India"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <p className="text-gray-200">{item}</p>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button variant="red" size="lg">
                  Know More About Us
                </Button>
              </Link>
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
            </div>
          </div>
        </Container>
      </div> */}

      <WhyChooseUs />

      {/* Projects/Gallery Section */}
      <div className="text-center mb-10 pt-12">
        <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] block mb-4">
          Our Projects
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          From Concept to Completion
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our portfolio of successful projects across Northeast India
        </p>
      </div>

      {/* Grid Layout */}
      <Container className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-16">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} className={`${project.className} aspect-[4/3] overflow-hidden rounded-md group relative block`}>
            <Image 
              src={project.src} 
              alt={project.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {project.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 p-3 rounded-full">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            )}
          </Link>
        ))}
      </Container>

      <div className="text-center mb-16">
        <Link href="/projects">
          <Button variant="saffron" size="lg">
            View All Projects
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Core Values Section */}
      <div className="text-center mb-10 pt-8">
        <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] block mb-4">
          Our Values
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Core Values That Drive Us
        </h2>
      </div>

      {/* Values Grid */}
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {values.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-50 p-8 rounded-md flex flex-col items-start transition-all duration-300 hover:shadow-lg hover:border-primary/20 border border-transparent"
          >
            <div className="bg-primary p-3 rounded-md mb-6 flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </Container>

      {/* CTA Banner */}
      <Container className="relative h-[400px] rounded-md overflow-hidden mb-20 group">
        <Image 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Architecture" 
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Build<br/>Something Great?
          </h2>
          <p className="text-gray-200 text-base mb-8 leading-relaxed max-w-md">
            From concept to completion, our team of experienced engineers and 
            construction professionals delivers projects on time and built to last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="red" size="lg">
                Request Technical Consultation
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="primary-outline" size="lg">
                View Our Projects
              </Button>
            </Link>
          </div>
        </div>
      </Container>


      <FaqSection />

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
    </div>
  )
}
