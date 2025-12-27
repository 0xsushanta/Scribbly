import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold tracking-tight font-sans text-white mb-4 block">
              scribly
            </span>
            <p className="text-slate-400 text-sm leading-relaxed">
              Making collaboration fun again. Sketch, plan, and build the future together.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-slate-200">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-slate-200">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-slate-200">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-scribly-accent transition-colors">About</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-scribly-accent transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
             <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
             <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
             <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-scribly-coral fill-scribly-coral" /> by the Scribly Team.
          </p>
        </div>
      </div>
    </footer>
  );
};