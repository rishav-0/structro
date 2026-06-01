"use client";
import { Container } from "@/components/ui/container";
import Image from "next/image";

interface Department {
  name: string;
  fullName: string;
  image: string;
  alt: string;
}

export default function TestimonialsSection() {
  const departments: Department[] = [
    {
      name: "Indian Railways",
      fullName: "Ministry of Railways, Govt. of India",
      image: "/images/partners/railways.png",
      alt: "Indian Railways Official Logo",
    },
    {
      name: "NHIDCL",
      fullName: "National Highways & Infrastructure Development Corporation",
      image: "/images/partners/nhidcl.png",
      alt: "NHIDCL Official Logo",
    },
    {
      name: "AAI",
      fullName: "Airports Authority of India",
      image: "/images/partners/aai.png",
      alt: "Airports Authority of India Official Logo",
    },
    {
      name: "BRO",
      fullName: "Border Roads Organisation",
      image: "/images/partners/bro.png",
      alt: "Border Roads Organisation Official Logo",
    },
    {
      name: "IWAI",
      fullName: "Inland Waterways Authority of India",
      image: "/images/partners/iwai.png",
      alt: "Inland Waterways Authority of India Official Logo",
    }
  ];

  return (
    <div className="py-24 bg-gray-50 border-y border-gray-200/80 relative overflow-hidden">
      {/* Decorative Blueprint/Grid Background Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <Container>
        <div className="text-center mb-16 relative z-10">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4">
            REGISTRATIONS & EMPANELMENTS
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tight">
            TRUSTED BY LEADERS IN INFRASTRUCTURE
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-6" />
          <p className="text-gray-500 mt-4 text-base max-w-2xl mx-auto font-medium">
            Structro Infratech is registered, empanelled, and approved for execution of core structural fabrication and turnkey works with India's premier government and border authorities.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10 max-w-5xl mx-auto items-stretch justify-center">
          {departments.map((dept, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-6 rounded-lg border border-gray-200/60 hover:border-primary/30 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between text-center"
              title={`${dept.name} — ${dept.fullName}`}
            >
              {/* Logo Area */}
              <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                <Image 
                  src={dept.image}
                  alt={dept.alt}
                  width={80}
                  height={80}
                  className="object-contain w-auto h-auto max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                  priority={idx < 3}
                />
              </div>
              
              {/* Small Title */}
              <span className="text-xs font-extrabold text-gray-800 tracking-wider uppercase group-hover:text-primary transition-colors mt-auto">
                {dept.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
