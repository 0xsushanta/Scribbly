import React from 'react';
import { PenTool, Twitter, Github, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-slate-400 py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FDACAC] to-[#FD7979] text-white rounded-lg flex items-center justify-center shadow-lg shadow-[#FD7979]/30">
                <PenTool size={16} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FDACAC] to-[#FD7979] bg-clip-text text-transparent font-sans">Scribly</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              The collaborative canvas for teams who think visually. Built with <Heart size={12} className="inline text-red-500 mx-1" fill="currentColor"/> by designers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white hover:bg-slate-800 p-2 rounded-full transition-all"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white hover:bg-slate-800 p-2 rounded-full transition-all"><Github size={18} /></a>
              <a href="#" className="hover:text-white hover:bg-slate-800 p-2 rounded-full transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-[#FDACAC] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} Scribly Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="text-slate-500">System Status: <span className="text-green-400">Operational</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};