import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import ClientLayout from "./client-layout";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
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
  openGraph: {
    title: 'Structro Infratech | Steel Engineering Company Guwahati',
    description: 'Leading steel engineering company in Northeast India. Specializing in bridge construction, PEB buildings, and industrial infrastructure. ISO 9001:2015 certified.',
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'en_US',
    siteName: 'Structro Infratech',
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}