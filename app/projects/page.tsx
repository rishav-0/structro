import type { Metadata } from 'next';
import { ProjectsClient } from "./projects-client";
import { getPublicCollectionData } from '@/lib/public-db-server';
import { Suspense } from 'react';

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
  
  const dbOngoing = dbProjects.filter((project: any) => project.type === "ongoing");
  const dbCompleted = dbProjects.filter((project: any) => project.type === "completed");
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <ProjectsClient 
        initialProjects={{ ongoing: dbOngoing, completed: dbCompleted, homeProjects: [] }} 
        availableCategories={fetchedCategories}
      />
    </Suspense>
  );
}
