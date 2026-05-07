"use client";

import { useState, useEffect } from "react";
import { projectsData } from "@/lib/data";
import { getCollectionData } from "@/lib/data-merge";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Building, Calendar, Scale } from "lucide-react";
import Link from "next/link";

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

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { id } = await params;
      const projectId = id.includes("-") ? id : parseInt(id);
      
      let found: Project | null = null;
      const categories = ["ongoing", "completed", "homeProjects"] as const;
      
      for (const category of categories) {
        const f = projectsData[category].find((p) => p.id === projectId);
        if (f) {
          found = f as Project;
          break;
        }
      }

      if (!found) {
        try {
          const dbProjects = await getCollectionData("projects") as any[];
          found = dbProjects.find(p => String(p.id) === id) || null;
        } catch (e) {
          console.error("Error fetching from DB:", e);
        }
      }

      setProject(found);
      setLoading(false);
    }
    fetchProject();
  }, [params]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!project) return notFound();

  const p: any = project;

  return (
    <div className="bg-white ">
   
      <article className="py-6">
        <Container>
          {/* Header Section */}
          <div className="max-w-4xl mb-12">
            {p.category && (
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">
                {p.category}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              {p.title || p.alt}
            </h1>
          </div>

            <div className="flex gap-4">
              {/* Main Project Image - Simple Containment */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 mb-16 shadow-sm">
            <Image 
              src={p.src} 
              alt={p.alt || 'Project Image'} 
              fill 
              priority
              className="object-cover"
            />
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left: Metadata Sidebar */}
            <div className="space-y-10">
              <section>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Specifications</h2>
                <div className="space-y-6">
                  {p.location && (
                    <DetailItem icon={<MapPin className="w-5 h-5"/>} label="Location" value={p.location} />
                  )}
                  {p.client && (
                    <DetailItem icon={<Building className="w-5 h-5"/>} label="Client" value={p.client} />
                  )}
                  {p.period && (
                    <DetailItem icon={<Calendar className="w-5 h-5"/>} label="Period" value={p.period} />
                  )}
                  {p.quantity && (
                    <DetailItem icon={<Scale className="w-5 h-5"/>} label="Scale" value={p.quantity} />
                  )}
                </div>
              </section>
            </div>

            {/* Right: Project Scope/Description */}
            <div className="">
              <section>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Project Scope</h2>
                <div className="prose prose-slate prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {p.scope || "Details for this project's scope are currently being finalized."}
                  </p>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100">
                  <Link href="/contact">
                    <Button variant="red" size="lg" className="rounded-full px-10">
                      Enquire about this project
                    </Button>
                  </Link>
                </div>
              </section>
            </div>

          </div>
            </div>
          
        </Container>
      </article>
    </div>
  );
}

// Reusable Sub-component for clarity
function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-primary mt-1">{icon}</div>
      <div>
        <dt className="text-xs font-semibold text-gray-500 uppercase">{label}</dt>
        <dd className="text-gray-900 font-medium text-base mt-0.5">{value}</dd>
      </div>
    </div>
  );
}