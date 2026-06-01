"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Award, ShieldCheck, Leaf, HardHat, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import dynamic from "next/dynamic";
import HeroTwo from "@/components/HeroTwo";
import { motion, Variants } from "framer-motion";
import CountUp from "react-countup";

const BlogSection = dynamic(() => import("@/components/BlogSection"), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), { ssr: true });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: true });
const FoundationalPhilosophy = dynamic(() => import("@/components/FoundationalPhilosophy"), { ssr: true });
const StructuralAdvantage = dynamic(() => import("@/components/StructuralAdvantage"), { ssr: true });
const FaqSection = dynamic(() => import("@/components/FaqSection"), { ssr: true });
const OurCredentials = dynamic(() => import("@/components/OurCredentials"), { ssr: true });
const SiteCta = dynamic(() => import("@/components/SiteCta"), { ssr: true });

type HomeService = {
  id: string;
  title: string;
  description: string;
  homeDescription?: string;
  image: string;
  alt: string;
};

type HomeProduct = {
  id: string;
  title: string;
  specs: string;
  image: string;
};

type HomeProject = {
  id: string | number;
  src: string;
  alt: string;
  isVideo?: boolean;
  className?: string;
};

type HomeLaunch = {
  id: string;
  image: string;
  title: string;
  type: string;
  description: string;
  region: string;
};

// Framer motion variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export function HomeClient({ 
  initialServices, 
  initialProducts, 
  initialProjects, 
  initialLaunches 
}: { 
  initialServices: HomeService[], 
  initialProducts: HomeProduct[], 
  initialProjects: HomeProject[], 
  initialLaunches: HomeLaunch[] 
}) {
  const [services] = useState<HomeService[]>(initialServices);
  const [products] = useState<HomeProduct[]>(initialProducts);
  const [projects] = useState<HomeProject[]>(initialProjects);
  const [launches] = useState<HomeLaunch[]>(initialLaunches);

  const stats = [
    { label: "DISTRICTS COVERED", end: 32, suffix: "+" },
    { label: "VERIFIED PROJECTS", end: 500, suffix: "+" },
    { label: "TONNAGE FABRICATED", end: 100, suffix: "K+" },
    { label: "STATES COVERED", end: 7, suffix: "+", since: "Across Northeast India" },
  ];

  const values = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards. No hidden costs, no broken promises—just honest communication.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Quality",
      description: "Zero compromise on quality. Every project undergoes rigorous checks for durability and safety.",
      icon: <Award size={24} />,
    },
    {
      title: "Sustainability",
      description: "Building for the future with eco-conscious materials and efficient construction methods.",
      icon: <Leaf size={24} />,
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge technology and modern engineering techniques for future-ready solutions.",
      icon: <ArrowUpRight size={24} />,
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <HeroTwo />

      <div className="w-full bg-white pt-16  relative z-10 ">
        {/* Experience Numbers Section */}
        <Container className="mb-12">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div variants={fadeInUp} key={index} className="flex flex-col items-center">
                <h2 className="text-5xl md:text-6xl font-bold text-primary mb-3">
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h2>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">
                  {stat.label}
                </p>
                {stat.since && (
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    {stat.since}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </Container>

      </div>

      <FoundationalPhilosophy />
      <OurCredentials />
      <StructuralAdvantage />
      <BlogSection />
      <WhyChooseUs />
    

      {/* Services Preview */}
      <Container className="py-20" id="services">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8"
        >
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Services
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Comprehensive Steel<br/>Engineering Solutions
            </h2>
          </div>
          <Link href="/services">
            <Button variant="saffron" size="lg" className="font-bold shadow-md hover:shadow-lg transition-all group">
              Explore Services
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {services.length > 0 && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {services.map((service, index) => (
              <Link href={`/services/${service.id}`} key={index}>
                <motion.div variants={fadeInUp} className="group bg-white rounded-md overflow-hidden border border-gray-200 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between bg-white relative">
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.homeDescription || service.description}</p>
                    <div className="inline-flex items-center text-primary font-bold text-sm tracking-wide uppercase hover:text-gray-900 transition-colors group/link mt-auto">
                      Technical Specs 
                      <ArrowUpRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
        </motion.div>
        )}
      </Container>

      {/* Projects/Gallery Section */}
      <div className="bg-gray-50 py-20 relative overflow-hidden border-y border-gray-200">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="text-center mb-12 relative z-10"
          >
            <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Projects
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              From Concept to Completion
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Explore our portfolio of engineering marvels and infrastructural landmarks across Northeast India.
            </p>
          </motion.div>

          {projects.length > 0 && (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-12 relative z-10"
            >
              {projects.map((project) => (
                <motion.div variants={fadeInUp} key={project.id} className={`${project.className} h-64 md:h-80 overflow-hidden rounded-md group relative block shadow-sm hover:shadow-lg transition-shadow`}>
                <Link href={`/projects/${project.id}`} className="w-full h-full block">
                  <Image 
                    src={project.src} 
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  {project.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 p-3 rounded-full border border-white/20 transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                      View Project <ArrowUpRight className="w-4 h-4 text-primary" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          )}

          <div className="text-center relative z-10">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="font-bold border-gray-300 text-gray-900 hover:bg-gray-100 transition-all duration-300 group">
                View Entire Portfolio
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* Featured Products */}
      <div className="py-20 bg-white relative">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
          >
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Manufacturing
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Rapid-Deploy Steel Solutions</h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center font-bold text-gray-900 hover:text-primary transition-colors group">
              Browse Catalog 
              <span className="ml-2 bg-gray-100 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

          {products.length > 0 && (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div variants={fadeInUp} key={product.id}>
                <Link href={`/products/${product.id}`} className="block w-full h-full group">
                  <div className="h-full rounded-md border border-gray-200 bg-white transition-all duration-300 hover:border-primary/50 hover:shadow-lg overflow-hidden flex flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gray-100">
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-center items-center text-center bg-gray-50 group-hover:bg-white transition-colors">
                      <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {product.title}
                      </h3>
                      <div className="inline-block rounded-sm bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                        {product.specs}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          )}
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full">
                Browse Catalog <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* New Launches */}
      <div className="bg-gray-50 py-20 relative overflow-hidden border-y border-gray-200">
        <Container className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
          >
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Innovations
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Recent Project Milestones</h2>
              <p className="text-gray-500 mt-3 max-w-xl">Explore our latest completed projects from the heavy engineering portfolio.</p>
            </div>
          </motion.div>

          {launches.length > 0 && (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {launches.map((launch) => (
                <motion.div variants={fadeInUp} key={launch.id} className="group overflow-hidden rounded-md bg-white border border-gray-200 hover:border-primary/40 transition-all duration-300 hover:shadow-lg flex flex-col sm:flex-row">
                <div className="aspect-video sm:aspect-square sm:w-2/5 relative overflow-hidden border-r border-gray-100">
                  <Image 
                    src={launch.image} 
                    alt={launch.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                    {launch.type}
                  </div>
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{launch.title}</h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{launch.description}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                      <HardHat className="w-3 h-3 text-primary" /> {launch.region}
                    </span>
                    <Link href={`/new-launches/${launch.id}`} className="text-xs font-bold text-primary flex items-center hover:text-gray-900 transition-colors">
                      VIEW SPECS <ArrowUpRight className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}
        </Container>
      </div>

      {/* Core Values Section */}
      <div className="py-20 bg-white relative">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our DNA
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Core Values That Drive Us
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((item, index) => (
              <motion.div 
                variants={fadeInUp}
                key={index} 
                className="bg-gray-50 p-6 rounded-md flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-primary/20 group"
              >
                <div className="bg-primary/10 text-primary p-3 rounded-md mb-5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>

      
      <TestimonialsSection />

      {/* Stakeholder Portal System */}
      <div className="py-20 bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="bg-white rounded-md p-8 md:p-10 shadow-sm border border-gray-200 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center relative z-10">
              <div className="lg:col-span-1">
                <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
                  Portal
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                  Connect with<br/>Our Ecosystem
                </h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  We simplify our partnerships and hiring through streamlined digital intake. 
                </p>
              </div>
              
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { title: "Contractors", desc: "Project tenders & site management", icon: <HardHat className="w-5 h-5" />, type: "Intake Form", href: "/stakeholder/contractor" },
                  { title: "Vendors", desc: "Supply chain & material procurement", icon: <ShieldCheck className="w-5 h-5" />, type: "Registration", href: "/stakeholder/vendor" },
                  { title: "Careers", desc: "Job opportunities & applications", icon: <ArrowUpRight className="w-5 h-5" />, type: "Apply Now", href: "/careers" }
                ].map((portal, idx) => (
                  <Link key={idx} href={portal.href} className="bg-gray-50 border border-gray-200 p-6 rounded-md hover:border-primary/40 hover:shadow-md transition-all duration-300 group relative block">
                    <div className="bg-white w-12 h-12 flex items-center justify-center rounded-md mb-5 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {portal.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{portal.title}</h4>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">{portal.desc}</p>
                    <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-2">
                      {portal.type.toUpperCase()} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <SiteCta />
      <FaqSection />

      {/* Map Section */}
      <div className="bg-white py-20">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Locations
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Find Us</h2>
            <p className="text-gray-600 mt-3 text-base">Visit our head office and manufacturing facility</p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-md p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Head Office</h3>
                  <p className="text-gray-500 text-sm mt-1">Christian Basti, Guwahati, Assam</p>
                </div>
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="bg-gray-100 rounded-md h-[250px] overflow-hidden">
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
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-md p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Workshop</h3>
                  <p className="text-gray-500 text-sm mt-1">Rani, Guwahati, Assam</p>
                </div>
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center">
                  <HardHat className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="bg-gray-100 rounded-md h-[250px] overflow-hidden">
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
            </motion.div>
          </div>
        </Container>
      </div>
    </div>
  )
}
