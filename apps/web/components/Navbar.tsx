import React, { useState, useEffect } from 'react';
import { Menu, X, Pencil } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
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
    { label: 'Showcase', href: '#showcase' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-scribly-accent rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-scribly-primary text-white p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
                <Pencil size={20} className="fill-current" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              scribly
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-slate-600 hover:text-scribly-primary font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-scribly-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
            <Button variant="ghost" size="sm" className="mr-2">Log In</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-scribly-primary transition-colors"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-slate-100"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-slate-700 hover:text-scribly-primary"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button variant="ghost" className="w-full justify-start">Log In</Button>
                <Button variant="primary" className="w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};