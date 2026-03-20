import React from 'react';
import { Mail, Facebook, Instagram, Twitter, Phone, MapPin, Award } from 'lucide-react';
import { Container } from './ui/container';

const Footer = () => {
  return (
    <footer className="font-sans bg-[#0A0A0A] text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand and Contact */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <div className="w-5 h-5 bg-white rounded-sm transform rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white uppercase">Structro</span>
            </div>
            
            {/* ISO Certification Badge */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
              <Award className="text-accent w-8 h-8 flex-shrink-0" />
              <div>
                <p className="text-xs text-accent font-bold uppercase tracking-wider">ISO 9001:2015</p>
                <p className="text-[10px] text-gray-400">Certified Company</p>
              </div>
            </div>
            
            {/* Since 2000 Tagline */}
            <p className="text-gray-300 text-sm font-medium">
              Connecting dreams through quality construction since 2000
            </p>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              A leading steel engineering company in Northeast India, specializing in bridge construction, PEB buildings, and industrial infrastructure.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={16} className="text-accent" />
                <a href="tel:+919678027684" className="hover:text-primary transition-colors font-medium">+91-9678027684</a>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={16} className="text-accent" />
                <a href="tel:+917002245491" className="hover:text-primary transition-colors font-medium">+91-7002245491</a>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail size={16} className="text-accent" />
                <a href="mailto:structro.infratech@gmail.com" className="hover:text-primary transition-colors font-medium">structro.infratech@gmail.com</a>
              </div>
            </div>
            
            <div className="flex gap-4 mt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-sm flex items-center justify-center border border-gray-700 hover:bg-primary hover:border-primary transition-all cursor-pointer">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/projects" className="hover:text-primary transition-colors">Our Projects</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/services#bridge" className="hover:text-primary transition-colors">Bridge Engineering</a></li>
              <li><a href="/services#peb" className="hover:text-primary transition-colors">PEB Buildings</a></li>
              <li><a href="/services#steel" className="hover:text-primary transition-colors">Steel Structures</a></li>
              <li><a href="/services#water" className="hover:text-primary transition-colors">Water Staging</a></li>
            </ul>
          </div>

          {/* Office Address */}
          <div>
            <h4 className="font-semibold text-lg mb-6 uppercase tracking-wide">Office Address</h4>
            <div className="space-y-6">
              <div>
                <div className="flex items-start gap-2 text-gray-300 text-sm mb-2">
                  <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Head Office:</p>
                    <p className="text-gray-400">1st Floor, Silver Square, Christian Basti, G.S Road, Guwahati, Assam - 781005</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-2 text-gray-300 text-sm">
                  <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Workshop:</p>
                    <p className="text-gray-400">Guwahati-Accoland-Rani Rd, South Rani, Guwahati-31</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <a href="/contact" className="inline-block mt-6">
              <button className="bg-accent text-gray-900 font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors w-full">
                Request a Technical Consultation
              </button>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Structro Infratech. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
