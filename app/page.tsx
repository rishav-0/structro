import Hero from "@/components/hero"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Award, ShieldCheck, Leaf, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function Page() {

  const stats = [
    { label: "Projects Completed", value: "48+" },
    { label: "Years Experience", value: "25+" },
    { label: "Team Members", value: "400+" },
    { label: "Client Satisfaction", value: "95%" },
  ];

  const marqueeItems = [
    "Bridge Engineering", "PEB Buildings", "Steel Structures", "Water Staging",
    "Industrial Sheds", "Infrastructure", "Railway Bridges"
  ];

  const services = [
    {
      title: "Bridge Engineering",
      description: "Open Web, Railway, Highway, Foot Over, Composite, Arch, Baily, and Cable-Stayed Bridges",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      alt: "Bridge Construction Guwahati Assam"
    },
    {
      title: "PEB Buildings",
      description: "Pre-Engineered Buildings with modern technology and efficient construction",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2070&auto=format&fit=crop",
      alt: "PEB Building Construction Assam"
    },
    {
      title: "Steel Structures",
      description: "Industrial warehousing and custom steel structure solutions",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
      alt: "Steel Structure Warehouse Guwahati"
    }
  ];

  const projects = [
    { id: 1, src: "/images/gallery/image.png", alt: "Railway Bridge Construction Guwahati", className: "md:col-span-2" },
    { id: 2, src: "/images/gallery/image copy.png", alt: "Industrial Steel Structure Assam", className: "md:col-span-2" },
    { id: 3, src: "/images/gallery/image copy 2.png", alt: "PEB Building Project Guwahati", className: "md:col-span-2", isVideo: true },
    { id: 4, src: "/images/gallery/image copy 3.png", alt: "Highway Bridge Construction Assam", className: "md:col-span-2" },
    { id: 5, src: "/images/gallery/image copy 4.png", alt: "Steel Warehouse Construction", className: "md:col-span-2" },
    { id: 6, src: "/images/gallery/image copy 5.png", alt: "Infrastructure Project Northeast India", className: "md:col-span-2" },
  ];

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

      <Hero />
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
      <Container className="py-20">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Our Services
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Comprehensive Steel<br/>Engineering Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.image}
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
                <p className="text-gray-600 text-sm">{service.description}</p>
                <Link href="/services" className="inline-flex items-center text-primary font-semibold text-sm mt-3 hover:underline">
                  Learn More <ArrowUpRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button className="bg-primary text-white hover:bg-primary/90 font-semibold px-8 py-3 rounded-sm">
              View All Services
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>

      {/* Why Choose Us */}
      <div className="bg-primary py-20">
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
                <Button className="bg-accent text-gray-900 hover:bg-yellow-400 font-semibold px-8 py-3 rounded-sm">
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
      </div>

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
          <div key={project.id} className={`${project.className} aspect-[4/3] overflow-hidden rounded-lg group relative`}>
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
          </div>
        ))}
      </Container>

      <div className="text-center mb-16">
        <Link href="/projects">
          <Button className="bg-primary text-white hover:bg-primary/90 font-semibold px-8 py-3 rounded-sm">
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
            className="bg-gray-50 p-8 rounded-sm flex flex-col items-start transition-all duration-300 hover:shadow-lg hover:border-primary/20 border border-transparent"
          >
            <div className="bg-primary p-3 rounded-sm mb-6 flex items-center justify-center">
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
      <Container className="relative h-[400px] rounded-lg overflow-hidden mb-20 group">
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
              <Button className="bg-accent text-gray-900 hover:bg-yellow-400 font-semibold px-8 py-3 rounded-sm">
                Request Technical Consultation
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-sm">
                View Our Projects
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
