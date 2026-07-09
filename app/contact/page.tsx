import type { Metadata } from 'next';
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: 'Contact Us | Structro Infratech - Get a Quote for Steel Engineering',
  description: 'Contact Structro Infratech for steel engineering, bridge construction, and PEB building projects in Guwahati, Assam. Request a technical consultation today. Call +91-9101515491.',
  keywords: ['Contact Structro', 'Get Quote', 'Bridge Construction Guwahati', 'PEB Buildings Assam', 'Steel Engineering Contact', 'Steel Engineering Quote Guwahati'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Structro Infratech — Get a Technical Quote',
    description: 'Contact us for bridge construction, PEB buildings, and steel engineering projects. Call +91-9101515491.',
    url: '/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Structro Infratech | Steel Engineering Guwahati',
    description: 'Request a technical consultation for your infrastructure project. Call +91-9101515491.',
  },
}

export default function ContactPage() {
  return <ContactClient />;
}
