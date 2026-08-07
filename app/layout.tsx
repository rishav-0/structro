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
  alternateName: "Structro Infra Tech",
  url: siteUrl.toString(),
  logo: new URL("/images/logo.svg", siteUrl).toString(),
  image: new URL("/images/og-banner.jpg", siteUrl).toString(),
  email: ["info@structroinfratech.com", "sales@structroinfratech.com"],
  telephone: "+91-9101515491",
  foundingDate: "2000",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 200 },
  priceRange: "$$$$",
  description: "Guwahati's leading steel engineering firm specializing in bridge construction, PEB buildings, industrial sheds, and heavy steel structures across Northeast India. ISO 9001:2015 certified with 200+ completed projects.",
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.1576365,
    longitude: 91.7756357,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Assam" },
    { "@type": "AdministrativeArea", name: "Northeast India" },
    { "@type": "AdministrativeArea", name: "Meghalaya" },
    { "@type": "AdministrativeArea", name: "Arunachal Pradesh" },
    { "@type": "AdministrativeArea", name: "Nagaland" },
    { "@type": "AdministrativeArea", name: "Manipur" },
    { "@type": "AdministrativeArea", name: "Mizoram" },
    { "@type": "AdministrativeArea", name: "Tripura" },
    { "@type": "AdministrativeArea", name: "Sikkim" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Steel Engineering Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bridge Engineering", description: "Steel Bridge Construction, steel/structural erection, infrastructure projects, heavy steel structures, and civil & structural works across Northeast India." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "PEB Buildings", description: "Pre-Engineered Buildings (PEB), industrial shed fabrication, warehouse construction, factory building construction, roofing & cladding, and steel building contractor services." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Steel Structures", description: "Heavy steel structure, industrial fabrication, MS fabrication, welding services, platform & staircase fabrication, conveyor structure fabrication, industrial construction, and metal works." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Engineering Design Services", description: "Structural engineering, mechanical engineering services, engineering works, turnkey engineering projects, and industrial engineering solutions." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Special Metal Structures", description: "SS fabrication, pipe fabrication, tank fabrication, sheet metal fabrication, custom metal works, welding services, and industrial maintenance." } },
    ],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-9101515491",
      email: "sales@structroinfratech.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "as"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+91-8638987442",
      email: "info@structroinfratech.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "as"],
    },
  ],
  sameAs: [
    "https://www.indiamart.com/structro-infra-tech/",
    "https://jsdl.in/DT-997A7SFQVYJ",
    "https://www.linkedin.com/company/structro-infratech",
    "https://www.facebook.com/structroinfratech",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Structro Infratech",
  url: siteUrl.toString(),
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl.toString()}/blogs?category={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Structro Infratech | Best Steel Engineering & PEB Contractors in Guwahati, Assam',
    template: '%s | Structro Infratech',
  },
  description: 'Looking for top steel fabrication or PEB contractors in Northeast India? Structro Infratech is Guwahati\'s premier firm for industrial sheds, steel structure bridge construction, warehouse & factory building, MS/SS fabrication, and turnkey engineering projects.',
  keywords: [
    'Steel Engineering Company Guwahati',
    'Bridge Construction Assam',
    'PEB Manufacturers Guwahati',
    'Structro Infra Tech',
    'Structro Infratech',
    'Pre-Engineered Buildings',
    'Pre-Engineered Buildings Assam',
    'Industrial Sheds Assam',
    'Bridge Engineering Northeast India',
    'Steel Structure Company Guwahati',
    'Infrastructure Company Guwahati',
    'Steel Fabrication Assam',
    'PEB Buildings Northeast India',
    'Railway Bridge Construction Assam',
    'Warehouse Construction Guwahati',
    'Metal Fabrication Guwahati',
    'Structural Steel Fabrication Assam',
    'Heavy Steel Structure Northeast',
    'MS Fabrication Guwahati',
    'SS Fabrication Northeast India',
    'Welding Services Guwahati',
    'Turnkey Engineering Projects',
    'Industrial Shed Fabrication',
    'Factory Building Construction',
    'Steel Erection Assam',
  ],
  authors: [{ name: 'Structro Infratech', url: siteUrl.toString() }],
  creator: 'Structro Infratech',
  publisher: 'Structro Infratech',
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: 'Structro Infratech | Best Steel Engineering & PEB Contractors in Guwahati',
    description: 'Looking for top steel fabrication or PEB contractors in Northeast India? Structro Infratech specializes in bridges, industrial sheds, MS/SS works, and turnkey structures.',
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'en_US',
    siteName: 'Structro Infratech',
    url: siteUrl.toString(),
    images: [
      {
        url: '/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Structro Infratech — Best Steel Engineering & PEB Contractors in Guwahati',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structro Infratech | Best Steel Engineering & PEB Contractors in Guwahati',
    description: 'Looking for top steel fabrication or PEB contractors in Northeast India? Bridge construction, PEB buildings, and heavy steel structures by Structro Infratech.',
    images: ['/images/og-banner.jpg'],
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
    google: 'rQBn6ofh0gjSygDAeBi4dPa54TfWeAb0Q0c6g_e2OSQ',
  },
  category: 'Construction',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ClientLayout header={<Header />} footer={<Footer />}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}