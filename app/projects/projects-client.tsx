"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export function ProjectsClient() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">("completed");

  const projects = {
    ongoing: [
      {
        id: 1,
        title: "Railway Bridge Construction",
        location: "Guwahati, Assam",
        category: "Bridge Engineering",
        src: "/images/gallery/image.png",
        alt: "Railway Bridge Construction Guwahati",
        isVideo: false
      },
      {
        id: 2,
        title: "Industrial PEB Warehouse",
        location: "Assam",
        category: "PEB Buildings",
        src: "/images/gallery/image copy 2.png",
        alt: "PEB Warehouse Construction Assam",
        isVideo: true
      },
      {
        id: 3,
        title: "Highway Overpass",
        location: "Northeast India",
        category: "Bridge Engineering",
        src: "/images/gallery/image copy 3.png",
        alt: "Highway Bridge Construction Northeast India",
        isVideo: false
      }
    ],
    completed: [
      {
        id: 4,
        title: "Steel Structure Warehouse",
        location: "Guwahati, Assam",
        category: "Steel Structures",
        src: "/images/gallery/image copy 4.png",
        alt: "Steel Warehouse Guwahati Assam",
        isVideo: false
      },
      {
        id: 5,
        title: "Composite Bridge",
        location: "Assam",
        category: "Bridge Engineering",
        src: "/images/gallery/image copy 5.png",
        alt: "Composite Bridge Construction Assam",
        isVideo: false
      },
      {
        id: 6,
        title: "Foot Over Bridge",
        location: "Guwahati",
        category: "Bridge Engineering",
        src: "/images/gallery/image.png",
        alt: "Foot Over Bridge Guwahati",
        isVideo: false
      },
      {
        id: 7,
        title: "Industrial Shed",
        location: "Assam",
        category: "Steel Structures",
        src: "/images/gallery/image copy.png",
        alt: "Industrial Steel Shed Assam",
        isVideo: false
      },
      {
        id: 8,
        title: "Water Staging Facility",
        location: "Northeast India",
        category: "Water Staging",
        src: "/images/gallery/image copy 3.png",
        alt: "Water Staging Infrastructure Northeast India",
        isVideo: false
      },
      {
        id: 9,
        title: "PEB Manufacturing Unit",
        location: "Guwahati, Assam",
        category: "PEB Buildings",
        src: "/images/gallery/image copy 4.png",
        alt: "PEB Building Guwahati",
        isVideo: false
      }
    ]
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[350px]">
        <div className="absolute inset-0 bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Construction project"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        <Container className="relative h-full flex flex-col justify-center">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Our Projects
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Building the Future<br/>Across Northeast India
          </h1>
          <p className="text-gray-200 text-lg mt-6 max-w-2xl">
            Explore our portfolio of successful projects spanning bridge engineering, 
            PEB buildings, and industrial infrastructure.
          </p>
        </Container>
      </div>

      {/* Projects Stats */}
      <div className="bg-white py-12 border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Total Projects", value: "48+" },
              { label: "Completed", value: "45" },
              { label: "Ongoing", value: "3" },
              { label: "Regions", value: "Assam" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-1">
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

      {/* Tab Navigation */}
      <div className="bg-gray-50 py-8 sticky top-16 z-40 border-b border-gray-200">
        <Container>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-8 py-3 font-semibold rounded-sm transition-all ${
                activeTab === "ongoing"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
              }`}
            >
              Ongoing Projects
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-8 py-3 font-semibold rounded-sm transition-all ${
                activeTab === "completed"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
              }`}
            >
              Completed Projects
            </button>
          </div>
        </Container>
      </div>

      {/* Projects Grid */}
      <Container className="py-16" id={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects[activeTab].map((project) => (
            <div 
              key={project.id}
              className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-sm">
                    {project.category}
                  </span>
                </div>
                
                {/* Video Indicator */}
                {project.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 p-4 rounded-full backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play className="text-white fill-white" size={32} />
                    </div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <a href="/contact">
                    <Button className="bg-accent text-gray-900 hover:bg-yellow-400 font-semibold w-full">
                      View Details
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {projects[activeTab].length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No {activeTab} projects at the moment.</p>
          </div>
        )}
      </Container>

      {/* Regional Projects Info */}
      <div className="bg-gray-50 py-16">
        <Container>
          <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Serving All of Northeast India
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Structro Infratech has successfully delivered projects across Assam and the entire 
                  Northeast India region. Our expertise in handling diverse geographical and 
                  climatic conditions makes us the preferred choice for infrastructure development 
                  in the region.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Guwahati", "Assam", "Meghalaya", "Nagaland", "Manipur", "Tripura", "Mizoram", "Arunachal Pradesh"].map((region) => (
                    <span key={region} className="bg-primary/10 text-primary px-3 py-1 text-sm font-medium rounded-sm">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary p-6 rounded-lg text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">Regional</h3>
                  <p className="text-gray-200 text-sm">Projects across Assam</p>
                </div>
                <div className="bg-accent p-6 rounded-lg text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">National</h3>
                  <p className="text-gray-700 text-sm">Pan-India Presence</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-16">
        <div className="bg-primary rounded-lg p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can bring your vision to life. Our team is ready to provide 
            expert consultation for your next infrastructure project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button className="bg-accent text-gray-900 hover:bg-yellow-400 font-semibold px-8 py-3 rounded-sm">
                Request Technical Consultation
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-sm">
                Explore Our Services
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
