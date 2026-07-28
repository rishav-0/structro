import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contractor Registration | Partner with Structro Infratech',
  description: 'Register as a construction contractor or subcontractor with Structro Infratech for steel fabrication, bridge construction, and PEB structural engineering projects in Guwahati, Assam, and Northeast India.',
  alternates: { canonical: '/stakeholder/contractor' },
};

export default function ContractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
