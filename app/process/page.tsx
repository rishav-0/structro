import { Metadata } from 'next';
import ProcessClient from './process-client';


export const metadata: Metadata = {
  title: 'Our Process | Structro Infratech',
  description: 'Discover Structro Infratech\'s disciplined engineering workflow, from initial site analysis to final handoff. Our 5-phase construction process ensures precision and quality.',
};

export default function ProcessPage() {
  return <ProcessClient />;
}
