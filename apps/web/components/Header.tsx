"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, PenTool } from 'lucide-react';
import Link from 'next/link';
import { Button } from './Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3 border-b border-stone-100' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] text-white rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[#3B82F6]/30 group-hover:shadow-xl group-hover:shadow-[#3B82F6]/40">
            <PenTool size={20} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent font-sans tracking-tight">Scribly</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-gradient-to-r from-[#DBEAFE]/40 via-white/50 to-[#60A5FA]/40 p-1.5 rounded-full border border-[#3B82F6]/30 backdrop-blur-sm shadow-md shadow-[#3B82F6]/10">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="px-5 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-[#3B82F6] hover:bg-gradient-to-r hover:from-white hover:via-[#DBEAFE]/30 hover:to-[#60A5FA]/20 hover:shadow-md hover:shadow-[#3B82F6]/20 transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-stone-600 hover:text-[#3B82F6] transition-colors">Log in</Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-stone-900 p-2 hover:bg-stone-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-200 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-lg font-medium text-stone-700 py-3 px-4 rounded-xl hover:bg-stone-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-stone-100">
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="justify-center w-full">Log in</Button>
            </Link>
            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="justify-center w-full">Sign up free</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};