"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Play, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

interface Project {
  id: string | number;
  title: string;
  location: string;
  category?: string;
  serviceId?: string;
  src: string;
  alt: string;
  isVideo?: boolean;
  client?: string;
  scope?: string;
  quantity?: string;
  period?: string;
  type?: "ongoing" | "completed";
}

const clientsList = [
  { name: "NORTHEAST FRONTIER RAILWAY", acronym: "NF" },
  { name: "EAST CENTRAL RAILWAY", acronym: "EC" },
  { name: "INDIAN RAILWAYS", acronym: "IR" },
  { name: "RDSO", acronym: "RD" },
  { name: "NHAI", acronym: "NH" },
  { name: "ASSAM POLICE HOUSING", acronym: "AP" },
  { name: "CPWD", acronym: "CP" },
  { name: "INDIAN OIL", acronym: "IO" },
  { name: "L&T CONSTRUCTION", acronym: "LT" },
  { name: "NRL", acronym: "NR" },
  { name: "THYSSENKRUPP", acronym: "TK" },
  { name: "BRO", acronym: "BR" },
  { name: "KEC INTERNATIONAL", acronym: "KE" },
  { name: "PWD ASSAM", acronym: "PW" },
  { name: "TATA BLUESCOPE STEEL", acronym: "TA" },
  { name: "OIL INDIA LIMITED", acronym: "OI" },
  { name: "ABCI INFRASTRUCTURE", acronym: "AB" },
  { name: "POWER GRID CORPORATION", acronym: "PG" },
  { name: "AIDC", acronym: "AI" },
  { name: "ASSAM GAS COMPANY", acronym: "AG" },
  { name: "BCPL", acronym: "BC" },
  { name: "ONGC", acronym: "ON" },
  { name: "GAIL", acronym: "GA" },
  { name: "BRIDGE & ROOF CO.", acronym: "BR" }
];

export function ProjectsClient({ initialProjects, availableCategories = [] }: { initialProjects: { ongoing: Project[]; completed: Project[]; homeProjects: Project[] }, availableCategories?: string[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const tabFromUrl = searchParams.get("tab") as "ongoing" | "completed" | null
  const activeTab = tabFromUrl === "ongoing" ? "ongoing" : "completed"

  const setActiveTab = (tab: "ongoing" | "completed") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", tab)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const [projects] = useState(initialProjects)
  const [selectedCategory, setSelectedCategory] = useState("ALL PROJECTS")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const categories = [
    "ALL PROJECTS",
    ...availableCategories
  ]

  const filteredProjects = useMemo(() => {
    let list = projects[activeTab];
    if (selectedCategory !== "ALL PROJECTS") {
      list = list.filter(p => p.category?.toUpperCase() === selectedCategory);
    }
    return list;
  }, [projects, activeTab, selectedCategory]);

  return (
    <div className="">
      <PageHero
        eyebrow="Our Projects"
        title={<>Building the Future<br />Across Northeast India</>}
        description="Explore our portfolio of successful projects spanning bridge engineering, PEB buildings, and industrial infrastructure."
      />

    
      {/* Filters Container */}
      <div className="md:sticky md:top-16 z-40">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden bg-white py-4 border-b border-gray-200 sticky top-16 z-50">
          <Container>
            <Button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              variant="outline"
              className="w-full flex items-center text-xs justify-center gap-2"
            >
              {showMobileFilters ? <X size={16} /> : <Filter size={16} />}
              {showMobileFilters ? "Close Filters" : "Filter Projects"}
            </Button>
          </Container>
        </div>

        {/* Filters Content */}
        <div className={`${showMobileFilters ? "block" : "hidden"} md:block bg-white shadow-xl md:shadow-none absolute md:static left-0 right-0 z-40 border-b md:border-b-0 border-gray-200`}>
          {/* Tab Navigation */}
          <div className="bg-gray-50 py-6 md:py-8 border-b border-gray-200">
            <Container>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button
                  onClick={() => {
                    setActiveTab("ongoing");
                    if (window.innerWidth < 768) setShowMobileFilters(false);
                  }}
                  variant={activeTab === "ongoing" ? "saffron" : "outline"}
                  size="sm"
                  className="px-8 w-full sm:w-auto text-xs md:text-base"
                >
                  Ongoing Projects
                </Button>
                <Button
                  onClick={() => {
                    setActiveTab("completed");
                    if (window.innerWidth < 768) setShowMobileFilters(false);
                  }}
                  variant={activeTab === "completed" ? "saffron" : "outline"}
                  size="sm"
                  className="px-8 w-full sm:w-auto text-xs md:text-base"
                >
                  Completed Projects
                </Button>
              </div>
            </Container>
          </div>

          {/* Category Filter */}
          <div className="bg-white py-4 border-b border-gray-100">
            <Container>
              <div className="flex flex-wrap justify-center gap-3 md:gap-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      if (window.innerWidth < 768) setShowMobileFilters(false);
                    }}
                    className={`text-xs  font-bold tracking-wider transition-colors duration-300 pb-2 border-b-2 ${
                      selectedCategory === category
                        ? "text-primary border-primary"
                        : "text-gray-400  border-transparent hover:text-gray-900"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <Container className="py-16" id={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden">
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
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm shadow-sm">
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
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="red" className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
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
                <div className="mt-4 sm:hidden">

                <Link href={`/projects/${project.id}`}>
                    <Button variant="red" className="w-full ">
                      View Details
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No {activeTab} projects found in this category.</p>
          </div>
        )}
      </Container>

      
      {/* Clients Section */}
      <div className="bg-gray-50 py-24 border-t border-gray-200 overflow-hidden relative">
        <Container>
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-4 inline-block relative">
              OUR ESTEEMED CLIENTS
              <span className="absolute -bottom-4 left-0 w-full h-1 bg-accent"></span>
            </h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em] mt-8">
              TRUSTED BY INDUSTRY LEADERS & GOVERNMENT DEPARTMENTS
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {clientsList.map((client, i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 aspect-[4/3]"
              >
                <span className="text-accent text-xs font-bold mb-3">{client.acronym}</span>
                <h3 className="text-[10px] md:text-xs font-bold text-gray-800 tracking-wider uppercase leading-snug">
                  {client.name}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Regional Projects Info */}
      <div className="bg-gray-50 py-16">
        <Container>
          <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Serving All of Northeast India
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Structro Infratech has successfully delivered projects across Assam and the entire 
                  Northeast India region. Our expertise in handling diverse geographical and 
                  climatic conditions makes us the preferred choice for infrastructure development 
                  in the region.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {["Guwahati", "Assam", "Meghalaya", "Nagaland", "Manipur", "Tripura", "Mizoram", "Arunachal Pradesh"].map((region) => (
                    <span key={region} className="bg-primary/10 text-primary px-3 py-1 text-sm font-medium rounded-sm">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="bg-primary p-6 rounded-lg text-center shadow-inner">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">Regional</h3>
                  <p className="text-primary-foreground/70 text-xs md:text-sm font-medium">Projects across Assam</p>
                </div>
                <div className="bg-accent p-6 rounded-lg text-center shadow-inner">
                  <h3 className="text-2xl md:text-3xl font-bold text-accent-foreground mb-2">National</h3>
                  <p className="text-accent-foreground/70 text-xs md:text-sm font-medium">Pan-India Presence</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>


      {/* CTA Section */}
      <Container className="py-16">
        <div className="bg-primary rounded-lg p-12 md:p-16 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto font-medium">
            Let&apos;s discuss how we can bring your vision to life. Our team is ready to provide 
            expert consultation for your next infrastructure project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="red" size="lg" className="shadow-md">
                Request Technical Consultation
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="primary-outline" size="lg">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
