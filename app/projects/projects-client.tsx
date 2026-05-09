"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { projectsData } from "@/lib/data";
import { getCollectionData } from "@/lib/data-merge";

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
}

export function ProjectsClient() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">("completed");
  const [projects, setProjects] = useState(projectsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function mergeData() {
      try {
        const dbProjects = await getCollectionData("projects") as any[];
        if (dbProjects.length > 0) {
          // DB items win over hardcoded items with the same ID (string comparison).
          const dbOngoing = dbProjects.filter((p: any) => p.type === "ongoing");
          const dbCompleted = dbProjects.filter((p: any) => p.type === "completed");

          const dbOngoingIds = new Set(dbOngoing.map((p: any) => String(p.id)));
          const dbCompletedIds = new Set(dbCompleted.map((p: any) => String(p.id)));

          // Keep hardcoded entries not overridden by the DB, then append all DB entries
          const allOngoing = [
            ...projectsData.ongoing.filter((p) => !dbOngoingIds.has(String(p.id))),
            ...dbOngoing,
          ];
          const allCompleted = [
            ...projectsData.completed.filter((p) => !dbCompletedIds.has(String(p.id))),
            ...dbCompleted,
          ];

          setProjects({ ongoing: allOngoing, completed: allCompleted, homeProjects: projectsData.homeProjects });
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    mergeData();
  }, []);

  return (
    <div className="">
      <PageHero
        eyebrow="Our Projects"
        title={<>Building the Future<br />Across Northeast India</>}
        description="Explore our portfolio of successful projects spanning bridge engineering, PEB buildings, and industrial infrastructure."
      />

      {/* Projects Stats */}
      <div className="bg-white py-12 border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Total Projects", value: "500+" },
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
            <Button
              onClick={() => setActiveTab("ongoing")}
              variant={activeTab === "ongoing" ? "saffron" : "outline"}
              size="lg"
              className="px-8"
            >
              Ongoing Projects
            </Button>
            <Button
              onClick={() => setActiveTab("completed")}
              variant={activeTab === "completed" ? "saffron" : "outline"}
              size="lg"
              className="px-8"
            >
              Completed Projects
            </Button>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
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
                <div className="bg-primary p-6 rounded-lg text-center shadow-inner">
                  <h3 className="text-3xl font-bold text-primary-foreground mb-2">Regional</h3>
                  <p className="text-primary-foreground/70 text-sm font-medium">Projects across Assam</p>
                </div>
                <div className="bg-accent p-6 rounded-lg text-center shadow-inner">
                  <h3 className="text-3xl font-bold text-accent-foreground mb-2">National</h3>
                  <p className="text-accent-foreground/70 text-sm font-medium">Pan-India Presence</p>
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
