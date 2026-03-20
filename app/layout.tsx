import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header-3";
import Footer from "@/components/Footer";
import type { Metadata } from 'next';

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// SEO Metadata for Structro Infra Tech
export const metadata: Metadata = {
  title: 'Structro Infratech | Steel Engineering Company Guwahati | Bridge Construction Assam',
  description: 'Structro Infratech is a leading steel engineering company in Guwahati, Assam. Specializing in bridge engineering, PEB buildings, steel structures, and water staging infrastructure. ISO 9001:2015 certified. Since 2000.',
  keywords: [
    'Steel Engineering Company Guwahati',
    'Bridge Construction Assam',
    'PEB Manufacturers Guwahati',
    'Structro Infra Tech',
    'Pre-Engineered Buildings',
    'Industrial Sheds Assam',
    'Bridge Engineering',
    'Steel Structure Company',
    'Water Staging Construction',
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
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
