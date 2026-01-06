import React from 'react';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { Button } from './Button';
import { MiniCanvas } from './MinCanvas';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden bg-gradient-to-br from-[#FEEAC9]/30 via-white to-[#FFCDC9]/20">
      {/* Animated Gradient Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#FFCDC9]/40 via-[#FDACAC]/30 to-[#FD7979]/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#FEEAC9]/40 via-[#FFCDC9]/30 to-[#FDACAC]/20 rounded-full blur-3xl -z-10 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_#FDACAC10,_#FFCDC905_40%,_transparent_70%)] rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FEEAC9] via-white to-[#FFCDC9] border border-[#FDACAC]/30 shadow-lg shadow-[#FD7979]/10 text-sm font-medium text-brand-700 animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: '0ms' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FD7979] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-br from-[#FDACAC] to-[#FD7979]"></span>
            </span>
            <span>New Feature: AI Sketch Smoothing</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink font-sans leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Ideas flow better <br className="hidden md:block"/> when you <span className="relative inline-block font-hand px-2 bg-gradient-to-r from-[#FDACAC] via-[#FD7979] to-[#FDACAC] bg-clip-text text-transparent">
              scribble.
              {/* Gradient highlight underline svg */}
              <svg className="absolute w-full h-4 -bottom-1 left-0 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFCDC9" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#FDACAC" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FD7979" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <path d="M0 5 Q 50 10 100 5" stroke="url(#underlineGradient)" strokeWidth="12" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            The infinite canvas for engineering teams. Sketch architectures, brainstorm workflows, and feel the freedom of paper with the power of the cloud.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button size="lg" className="group">
              Start Drawing Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg">
              Watch Demo
            </Button>
          </div>

          <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-stone-500 text-sm animate-fade-in-up" style={{ animationDelay: '400ms' }}>
             <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/32/32?random=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-stone-100" alt="User" />
                  ))}
                </div>
                <div className="h-4 w-px bg-stone-200"></div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-orange-400 fill-current" />
                  <span className="font-bold text-stone-900">4.9/5</span>
                </div>
             </div>
          </div>
        </div>

        <div className="relative animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          {/* Decorative elements behind canvas */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          <MiniCanvas />
          
          {/* Floating feature pill */}
          <div className="absolute -bottom-6 right-8 bg-gradient-to-br from-white via-[#FEEAC9]/50 to-[#FFCDC9]/30 p-3 rounded-xl shadow-xl border border-[#FDACAC]/30 flex items-center gap-3 animate-float backdrop-blur-sm" style={{ animationDelay: '1.5s' }}>
             <div className="p-2 bg-gradient-to-br from-[#FDACAC] to-[#FD7979] text-white rounded-lg shadow-md">
                <Zap size={20} fill="currentColor" />
             </div>
             <div>
                <div className="text-xs text-stone-500 font-medium">Performance</div>
                <div className="text-sm font-bold bg-gradient-to-r from-[#FDACAC] to-[#FD7979] bg-clip-text text-transparent">60 FPS</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};