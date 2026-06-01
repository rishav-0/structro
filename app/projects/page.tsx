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

export default async function ProjectsPage() {
  const dbProjects = await getPublicCollectionData("projects").catch((error) => {
    console.error("Error fetching projects:", error);
    return [];
  }) as any[];
  
  const dbServices = await getPublicCollectionData("services").catch((error) => {
    console.error("Error fetching services:", error);
    return [];
  }) as any[];
  
  // We make them uppercase to match the design and our filtering logic
  const fetchedCategories = dbServices.map((s: any) => s.title?.toUpperCase()).filter(Boolean);
  
  const mapProject = (p: any) => ({
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
    type: p.type || "completed",
  });

  const dbOngoing = dbProjects.filter((project: any) => project.type === "ongoing").map(mapProject);
  const dbCompleted = dbProjects.filter((project: any) => project.type === "completed").map(mapProject);
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <ProjectsClient 
        initialProjects={{ ongoing: dbOngoing, completed: dbCompleted, homeProjects: [] }} 
        availableCategories={fetchedCategories}
      />
    </Suspense>
  );
}
