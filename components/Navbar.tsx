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
        scrolled || isOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <Container className="flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-40 h-10 transition-all duration-300">
            <Image 
              src="/images/transparantLogo.png" 
              alt="Structro Logo" 
              fill
              className={`object-contain transition-opacity duration-300 ${scrolled || isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <Image 
              src="/images/logo.png" 
              alt="Structro Logo" 
              fill
              className={`object-contain transition-opacity duration-300 ${scrolled || isOpen ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
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
            <Button className={`ml-4 font-bold rounded-sm px-6 py-2 transition-all ${
              scrolled 
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-accent text-gray-900 hover:bg-yellow-400'
            }`}>
              GET A QUOTE <ArrowUpRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={28} className={scrolled || isOpen ? 'text-gray-900' : 'text-white'} />
          ) : (
            <Menu size={28} className={scrolled ? 'text-gray-900' : 'text-white'} />
          )}
        </button>
      </Container>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 bg-white border-t border-gray-100 h-screen">
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
            <Button className="w-full bg-primary text-white font-bold py-6 text-lg rounded-sm mt-4">
              REQUEST QUOTE <ArrowUpRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;