import type { Metadata } from 'next';
import { ProjectsClient } from "./projects-client";
import { getPublicCollectionData } from '@/lib/public-db-server';
import { Suspense } from 'react';

export const revalidate = 3600; // Cache page static response for 1 hour

export const metadata: Metadata = {
  title: 'Project Portfolio | Bridges, PEB & Steel Structures | Structro Infratech Guwahati',
  description: 'View Structro Infratech\'s portfolio of completed and ongoing projects across Assam and Northeast India. Railway bridges, PEB buildings, and industrial sheds.',
  keywords: ['Projects Gallery', 'Completed Projects', 'Ongoing Projects', 'Bridge Construction Guwahati', 'Steel PEB Shed Assam', 'Infrastructure Projects Northeast India'],
}

interface ServiceData {
  id?: string;
  title?: string;
}

interface ProjectData {
  id: string | number;
  title?: string;
  location?: string;
  category?: string;
  serviceId?: string;
  src?: string;
  alt?: string;
  isVideo?: boolean;
  client?: string;
  scope?: string;
  quantity?: string;
  period?: string;
  description?: string;
  visible?: boolean;
  type?: "ongoing" | "completed";
}

export default async function ProjectsPage() {
  const dbProjects = (await getPublicCollectionData("projects").catch((error) => {
    console.error("Error fetching projects:", error);
    return [];
  })) as ProjectData[];
  
  const dbServices = (await getPublicCollectionData("services").catch((error) => {
    console.error("Error fetching services:", error);
    return [];
  })) as ServiceData[];
  
  const fetchedServices = dbServices
    .map((s) => ({
      id: s.id || "",
      title: s.title || ""
    }))
    .filter((s) => s.id && s.title);
  
  const mapProject = (p: ProjectData) => ({
    id: p.id,
    title: p.title || "",
    location: p.location || "",
    category: p.category || "",
    serviceId: p.serviceId || "",
    src: p.src || "",
    alt: p.alt || "",
    isVideo: !!p.isVideo,
    client: p.client || "",
    scope: p.scope || "",
    quantity: p.quantity || "",
    period: p.period || "",
    description: p.description || "",
    visible: p.visible !== false,
    type: p.type || "completed",
  });

  const dbOngoing = dbProjects
    .filter((project) => project.type === "ongoing" && project.visible !== false)
    .map(mapProject);
  const dbCompleted = dbProjects
    .filter((project) => project.type === "completed" && project.visible !== false)
    .map(mapProject);
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <ProjectsClient 
        initialProjects={{ ongoing: dbOngoing, completed: dbCompleted, homeProjects: [] }} 
        availableServices={fetchedServices}
      />
    </Suspense>
  );
}
