import React from 'react';
import Link from 'next/link';
import { Mail, Facebook, Instagram, Twitter, Linkedin, Phone, MapPin, Award } from 'lucide-react';
import { Container } from './ui/container';
import { Button } from './ui/button';
import { getPublicCollectionData } from '@/lib/public-db-server';
import { DownloadBrochureButton } from './download-brochure-modal';

interface Service {
  id: string;
  title: string;
}

interface Brochure {
  id: string;
  title: string;
  fileUrl: string;
}

export default async function Footer() {
  let services: Service[] = [];
  let brochureUrl = "";
  let brochureTitle = "our brochure";
  try {
    services = await getPublicCollectionData<Service>("services");
  } catch (error) {
    console.error("Error fetching services for footer:", error);
  }
  try {
    const brochures = await getPublicCollectionData<Brochure>("brochures");
    if (brochures.length > 0) {
      brochureUrl = brochures[0].fileUrl;
      brochureTitle = brochures[0].title;
    }
  } catch (error) {
    console.error("Error fetching brochures for footer:", error);
  }

  return (
    <footer className="font-sans bg-[#0A0A0A] text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand and Contact */}
          <div className="flex flex-col gap-6">
           
            {/* ISO Certification Badge */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
              <Award className="text-accent w-8 h-8 flex-shrink-0" />
              <div>
                <p className="text-xs text-accent font-bold uppercase tracking-wider">ISO 9001:2015</p>
                <p className="text-[10px] text-gray-400">Certified Company</p>
              </div>
            </div>
            
           
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              The leading steel engineering company in Northeast India, specializing in bridge construction, PEB buildings, and industrial infrastructure.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={16} className="text-accent" />
                <a href="tel:+919678027684" className="hover:text-primary transition-colors font-medium">+91-9678027684</a>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail size={16} className="text-accent" />
                <a href="mailto:structro.infratech@gmail.com" className="hover:text-primary transition-colors font-medium">structro.infratech@gmail.com</a>
              </div>
            </div>
            
            <div className="flex gap-4 mt-2">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/structroinfratech/?viewAsMember=true" }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel={href !== "#" ? "noopener noreferrer" : undefined} className="w-10 h-10 rounded-sm flex items-center justify-center border border-gray-700 hover:bg-primary hover:border-primary transition-all cursor-pointer">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Our Projects</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              {brochureUrl && (
                <li>
                  <DownloadBrochureButton brochureUrl={brochureUrl} brochureTitle={brochureTitle} />
                </li>
              )}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <Link href={`/services/${service.id}`} className="hover:text-primary transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/services" className="hover:text-primary transition-colors">Bridge Engineering</Link></li>
                  <li><Link href="/services" className="hover:text-primary transition-colors">PEB Buildings</Link></li>
                  <li><Link href="/services" className="hover:text-primary transition-colors">Steel Structures</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Office Address */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Office Address</h4>
            <div className="space-y-6">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Silver+Square+Guwahati+Structro+Infra+Tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start gap-2 text-gray-300 text-sm mb-2">
                  <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-white group-hover:text-primary transition-colors">Head Office:</p>
                    <p className="text-gray-400">1st Floor, Silver Square, Christian Basti, G.S Road, Guwahati, Assam - 781005</p>
                  </div>
                </div>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Structro+Infra+Tech+Rani+Guwahati+Workshop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start gap-2 text-gray-300 text-sm">
                  <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-white group-hover:text-primary transition-colors">Workshop:</p>
                    <p className="text-gray-400">Guwahati-Accoland-Rani Rd, South Rani, Guwahati-31</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Stakeholder and Business Connectivity Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pt-12 border-t border-gray-800">
          {/* Stakeholder Portal */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Stakeholder Portal</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/stakeholder/contractor" className="hover:text-primary transition-colors flex items-center gap-2">Contractors <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">Form</span></Link></li>
              <li><Link href="/stakeholder/vendor" className="hover:text-primary transition-colors flex items-center gap-2">Vendors <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">Form</span></Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors flex items-center gap-2">Job Seekers <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">Apply</span></Link></li>
            </ul>
          </div>

          {/* Business Connectivity */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Business Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="https://gem.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GeM (Govt. e-Marketplace)</a></li>
              <li><a href="https://www.indiamart.com/structro-infra-tech/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IndiaMART</a></li>
              <li><a href="https://jsdl.in/DT-997A7SFQVYJ" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">JustDial</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg border border-white/5 h-full flex flex-col justify-center">
              <h4 className="font-bold text-xl text-white mb-2">Ready to Build Something Great?</h4>
              <p className="text-gray-400 text-sm mb-6">Request a technical consultation for your bridge, PEB, or steel infrastructure project.</p>
              <Link href="/contact">
                <Button variant="saffron" size="lg">
                  Get Technical Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Structro Infratech. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="hidden md:inline text-gray-700">|</span>
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
              Designed and Developed by <a href="https://cinzmedia.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors font-semibold">Cinzmedia</a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

