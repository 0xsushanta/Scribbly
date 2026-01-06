import React from 'react';
import { PenTool, Users, Zap, Grid, Lock, Share2 } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Smart Ink",
    description: "Our algorithm recognizes shapes and smoothes your rough sketches into beautiful diagrams instantly.",
    icon: PenTool,
  },
  {
    title: "Live Multiplayer",
    description: "Collaborate with zero latency. See cursors dance and ideas materialize as if you're in the same room.",
    icon: Users,
  },
  {
    title: "Infinite Workspace",
    description: "Boundless creativity. Pan and zoom infinitely without losing clarity or context.",
    icon: Grid,
  },
  {
    title: "Warp Speed",
    description: "Powered by WebGL. Scribly handles thousands of elements with butter-smooth 60fps performance.",
    icon: Zap,
  },
  {
    title: "Private by Default",
    description: "End-to-end encryption ensures your intellectual property stays yours. We can't see your data.",
    icon: Lock,
  },
  {
    title: "Universal Export",
    description: "Copy to clipboard as SVG, PNG, or JSON. Embed your diagrams anywhere with a simple link.",
    icon: Share2,
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-white via-[#FEEAC9]/10 to-white relative" id="features">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 tracking-tight">Everything you need to <span className="bg-gradient-to-r from-[#FDACAC] via-[#FD7979] to-[#FDACAC] bg-clip-text text-transparent font-hand">create</span></h2>
          <p className="text-xl text-stone-600 leading-relaxed">
            A powerful engine wrapped in a simple interface. Focused on what matters: your ideas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl bg-gradient-to-br from-white via-[#FEEAC9]/20 to-[#FFCDC9]/10 border border-[#FDACAC]/20 hover:from-[#FFCDC9]/30 hover:via-[#FDACAC]/20 hover:to-[#FD7979]/10 hover:border-[#FD7979]/40 hover:shadow-2xl hover:shadow-[#FD7979]/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#FEEAC9] to-[#FFCDC9] rounded-2xl border border-[#FDACAC]/30 flex items-center justify-center mb-6 text-[#FD7979] shadow-md group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#FDACAC] group-hover:to-[#FD7979] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-[#FD7979]/30 transition-all duration-300">
                <feature.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#FDACAC] group-hover:to-[#FD7979] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{feature.title}</h3>
              <p className="text-stone-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};