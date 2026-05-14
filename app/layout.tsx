import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { getSiteUrl } from "@/lib/site";
import ClientLayout from "./client-layout";
import { Header } from "@/components/ui/header-3";
import Footer from "@/components/Footer";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = getSiteUrl()

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Structro Infratech",
  url: siteUrl.toString(),
  logo: new URL("/images/logo.png", siteUrl).toString(),
  image: new URL("/images/logo.png", siteUrl).toString(),
  email: "structro.infratech@gmail.com",
  telephone: "+91-9678027684",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "1st Floor, Silver Square, Christian Basti, G.S Road",
      addressLocality: "Guwahati",
      addressRegion: "Assam",
      postalCode: "781005",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Guwahati-Accoland-Rani Road, South Rani",
      addressLocality: "Guwahati",
      addressRegion: "Assam",
      postalCode: "781031",
      addressCountry: "IN",
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Assam" },
    { "@type": "AdministrativeArea", name: "Northeast India" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-9678027684",
      email: "structro.infratech@gmail.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Structro Infratech | Steel Engineering Company Guwahati | Bridge Construction Assam',
  description: 'Structro Infratech is a leading steel engineering company in Guwahati, Assam. Specializing in bridge engineering, PEB buildings, and steel structures. ISO 9001:2015 certified. Since 2000.',
  keywords: [
    'Steel Engineering Company Guwahati',
    'Bridge Construction Assam',
    'PEB Manufacturers Guwahati',
    'Structro Infra Tech',
    'Pre-Engineered Buildings',
    'Industrial Sheds Assam',
    'Bridge Engineering',
    'Steel Structure Company',
    'Infrastructure Guwahati'
  ],
  authors: [{ name: 'Structro Infratech' }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: 'Structro Infratech | Steel Engineering Company Guwahati',
    description: 'Leading steel engineering company in Northeast India. Specializing in bridge construction, PEB buildings, and industrial infrastructure. ISO 9001:2015 certified.',
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'en_US',
    siteName: 'Structro Infratech',
    url: siteUrl.toString(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ClientLayout header={<Header />} footer={<Footer />}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}