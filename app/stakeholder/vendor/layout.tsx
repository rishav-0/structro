import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Registration | Supply to Structro Infratech',
  description: 'Register as a materials or services supplier with Structro Infratech for steel, welding tools, machinery, and safety equipment in Guwahati, Assam, and Northeast India.',
  alternates: { canonical: '/stakeholder/vendor' },
};

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
