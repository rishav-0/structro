import { Metadata } from 'next';
import ProcessClient from './process-client';


export const metadata: Metadata = {
  title: 'Our Process | Structro Infratech — Engineering Workflow',
  description: 'Discover Structro Infratech\'s disciplined engineering workflow, from initial site analysis to final handoff. Our 5-phase construction process ensures precision and quality.',
  keywords: ['Construction Process', 'Engineering Workflow', 'Steel Structure Process', 'PEB Construction Steps', 'Bridge Engineering Process'],
  alternates: { canonical: '/process' },
  openGraph: {
    title: 'Our Process | Structro Infratech',
    description: 'Disciplined 5-phase engineering workflow — from site analysis to final handoff.',
    url: '/process',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Process | Structro Infratech',
    description: '5-phase construction process ensuring precision and quality for every project.',
  },
};

export default function ProcessPage() {
  return <ProcessClient />;
}
