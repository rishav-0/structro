import { Metadata } from 'next';
import ProcessClient from './process-client';


export const metadata: Metadata = {
  title: 'Steel Erection & Fabrication Process | Structro Infratech Guwahati',
  description: 'Discover our step-by-step structural steel fabrication, erection, and engineering workflow. Our disciplined process ensures quality and safety from design to final execution.',
  keywords: ['Steel Erection Process', 'Steel Fabrication steps', 'Structural Erection Guwahati', 'PEB Construction process', 'Bridge Engineering workflow', 'Industrial Construction Process'],
  alternates: { canonical: '/process' },
  openGraph: {
    title: 'Steel Erection & Fabrication Process | Structro Infratech Guwahati',
    description: 'Disciplined structural steel fabrication and erection process from design to final handoff.',
    url: '/process',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steel Erection & Fabrication Process | Structro Infratech Guwahati',
    description: 'Disciplined structural steel fabrication and erection process from design to final handoff.',
  },
};

export default function ProcessPage() {
  return <ProcessClient />;
}
