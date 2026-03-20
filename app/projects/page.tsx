import type { Metadata } from 'next';
import { ProjectsClient } from "./projects-client";

export const metadata: Metadata = {
  title: 'Projects | Structro Infratech - Completed & Ongoing Projects Guwahati Assam',
  description: 'View Structro Infratech\'s portfolio of completed and ongoing projects across Assam and Northeast India. Railway bridges, PEB buildings, industrial sheds, and water staging infrastructure.',
  keywords: ['Projects Gallery', 'Completed Projects', 'Ongoing Projects', 'Bridge Construction Guwahati', 'Steel PEB Shed Assam', 'Infrastructure Projects Northeast India'],
}

export default function ProjectsPage() {
  return <ProjectsClient />;
}
