import type { Metadata } from 'next';
import { ProjectsClient } from "./projects-client";
import { getPublicCollectionData } from '@/lib/public-db-server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Projects | Structro Infratech - Completed & Ongoing Projects Guwahati Assam',
  description: 'View Structro Infratech\'s portfolio of completed and ongoing projects across Assam and Northeast India. Railway bridges, PEB buildings, and industrial sheds.',
  keywords: ['Projects Gallery', 'Completed Projects', 'Ongoing Projects', 'Bridge Construction Guwahati', 'Steel PEB Shed Assam', 'Infrastructure Projects Northeast India'],
}

export default async function ProjectsPage() {
  const dbProjects = await getPublicCollectionData("projects").catch((error) => {
    console.error("Error fetching projects:", error);
    return [];
  }) as any[];
  
  const dbOngoing = dbProjects.filter((project: any) => project.type === "ongoing");
  const dbCompleted = dbProjects.filter((project: any) => project.type === "completed");
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <ProjectsClient initialProjects={{ ongoing: dbOngoing, completed: dbCompleted, homeProjects: [] }} />
    </Suspense>
  );
}
