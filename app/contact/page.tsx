import type { Metadata } from 'next';
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: 'Contact Us | Structro Infratech — Steel Fabrication & Erection Quote Guwahati',
  description: 'Contact Structro Infratech for structural steel fabrication, metal works, PEB building, industrial shed, and bridge construction projects in Guwahati, Assam and Northeast India. Call +91-9101515491.',
  keywords: ['Contact Structro', 'Steel Fabrication Quote Guwahati', 'PEB building Assam quote', 'Metal works Guwahati', 'Welding services Assam', 'Turnkey Engineering Projects Guwahati', 'Bridge Construction Guwahati', 'PEB Buildings Assam'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Structro Infratech — Steel Fabrication & Erection Quote Guwahati',
    description: 'Get a technical quote for structural steel fabrication, PEB buildings, and bridge construction in Northeast India. Call +91-9101515491.',
    url: '/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Structro Infratech — Steel Fabrication & Erection Quote Guwahati',
    description: 'Get a technical quote for structural steel fabrication, PEB buildings, and bridge construction in Northeast India. Call +91-9101515491.',
  },
}

export default function ContactPage() {
  return <ContactClient />;
}
