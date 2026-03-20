import type { Metadata } from 'next';
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: 'Contact Us | Structro Infratech - Get a Quote',
  description: 'Contact Structro Infratech for steel engineering, bridge construction, and PEB building projects. Reach us at Guwahati, Assam. Request a technical consultation today.',
  keywords: ['Contact Structro', 'Get Quote', 'Bridge Construction Guwahati', 'PEB Buildings Assam', 'Steel Engineering Contact'],
}

export default function ContactPage() {
  return <ContactClient />;
}
