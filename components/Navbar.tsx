"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Container } from './ui/container';
import { Button } from './ui/button';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white shadow-md py-2 md:py-3' : 'bg-transparent py-3 md:py-5'
      }`}
    >
      <Container className="flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-[50px] h-[40px] md:w-[63px] md:h-[50px] transition-all duration-300">
            <Image 
              src="/images/transparantLogo.png" 
              alt="Structro Logo" 
              fill
              sizes="(max-width: 768px) 50px, 63px"
              className={`object-contain transition-opacity duration-300 ${scrolled || isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <Image 
              src="/images/logo.png" 
              alt="Structro Logo" 
              fill
              sizes="(max-width: 768px) 50px, 63px"
              className={`object-contain transition-opacity duration-300 ${scrolled || isOpen ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-all relative py-1 ${
                  scrolled 
                    ? isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                    : isActive ? 'text-accent' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    scrolled ? 'bg-primary' : 'bg-accent'
                  }`}></span>
                )}
              </Link>
            );
          })}
          
          <Link href="/contact">
            <Button 
              variant={scrolled ? "saffron" : "red"} 
              size="default"
              className="ml-2 xl:ml-4 font-bold transition-all whitespace-nowrap"
            >
              GET A QUOTE <ArrowUpRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-900 border-none outline-none focus:outline-none focus:ring-0 active:bg-transparent -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X size={28} className={`transition-colors ${scrolled || isOpen ? 'text-gray-900' : 'text-white'}`} />
          ) : (
            <Menu size={28} className={`transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`} />
          )}
        </button>
      </Container>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 top-[56px] sm:top-[72px] bg-white z-40 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 bg-white border-t border-gray-100 h-[calc(100vh-56px)] sm:h-[calc(100vh-72px)] overflow-y-auto pb-20">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xl font-bold uppercase tracking-wider border-b border-gray-50 pb-4 ${
                  isActive ? 'text-primary' : 'text-gray-900 hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <Button variant="saffron" size="xl" className="w-full mt-4">
              REQUEST QUOTE <ArrowUpRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;