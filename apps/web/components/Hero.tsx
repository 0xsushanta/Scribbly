import React from 'react';
import { Button } from './Button';
import { ArrowRight, Play, PenTool, Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingBadge = ({ icon: Icon, text, className, delay }: { icon: any, text: string, className: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.6, type: "spring" }}
    className={`absolute flex items-center gap-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 z-10 ${className}`}
  >
    <div className="p-2 bg-slate-50 rounded-xl text-scribly-primary">
      <Icon size={18} />
    </div>
    <span className="font-semibold text-sm text-slate-700">{text}</span>
  </motion.div>
);

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 dot-grid opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-scribly-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-scribly-accent/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scribly-surface border border-slate-200 text-slate-600 text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-scribly-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-scribly-accent"></span>
              </span>
              v2.0 is now live
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
            >
              Sketch your ideas <br />
              <span className="relative inline-block text-scribly-primary">
                together.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-scribly-accent opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path 
                    d="M0 5 Q 50 10 100 5" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              The infinite canvas for hand-drawn wireframes, diagrams, and collaborative brainstorming. No design skills required.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button size="lg" icon={ArrowRight}>Start Sketching</Button>
              <Button size="lg" variant="outline" icon={Play}>Watch Demo</Button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-sm text-slate-400 font-medium"
            >
              No sign-up required for drawing • Free forever for individuals
            </motion.p>
          </div>

          {/* Visual Showcase */}
          <div className="lg:w-1/2 w-full relative">
             <div className="relative w-full aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden group">
                {/* Simulated UI Header */}
                <div className="absolute top-0 left-0 right-0 h-12 border-b border-slate-100 flex items-center px-4 gap-2 bg-white/50 backdrop-blur-sm z-10">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="mx-auto flex gap-4 text-slate-400">
                     <PenTool size={16} />
                     <div className="w-px h-4 bg-slate-200"></div>
                     <div className="w-4 h-4 border-2 border-slate-300 rounded-sm"></div>
                     <div className="w-4 h-4 border-2 border-slate-300 rounded-full"></div>
                   </div>
                </div>

                {/* Canvas Content (SVG) */}
                <div className="absolute inset-0 pt-12 flex items-center justify-center bg-[#FDFCF8] cursor-crosshair">
                   <svg className="w-full h-full" viewBox="0 0 400 300">
                      <motion.path
                        d="M100,100 C150,50 250,50 300,100"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <motion.rect
                        x="90" y="90" width="220" height="120"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="3"
                        rx="5"
                        strokeDasharray="10 5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      />
                      
                      {/* Animated Cursor */}
                      <motion.g
                        initial={{ x: 100, y: 100, opacity: 0 }}
                        animate={{ 
                          x: [100, 150, 250, 300], 
                          y: [100, 50, 50, 100],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                         <path d="M0,0 L12,12 L6,14 L4,20 L0,0" fill="#facc15" stroke="none" />
                      </motion.g>

                      {/* Sticky Note */}
                      <foreignObject x="250" y="180" width="120" height="100">
                        <motion.div 
                          initial={{ rotate: 0, scale: 0 }}
                          animate={{ rotate: 5, scale: 1 }}
                          transition={{ delay: 1.5, type: 'spring' }}
                          className="bg-yellow-200 p-3 shadow-md rounded-sm h-full font-hand text-lg leading-tight transform rotate-3"
                        >
                          Ship it! 🚀
                        </motion.div>
                      </foreignObject>
                   </svg>
                </div>
             </div>

             {/* Floating Badges */}
             <FloatingBadge 
                icon={PenTool} 
                text="Smart Drawing" 
                className="-top-6 -left-6" 
                delay={1} 
             />
             <FloatingBadge 
                icon={Share2} 
                text="Real-time Sync" 
                className="top-1/2 -right-12" 
                delay={1.2} 
             />
             <FloatingBadge 
                icon={Sparkles} 
                text="AI Assist" 
                className="-bottom-8 left-12" 
                delay={1.4} 
             />
          </div>
        </div>
      </div>
    </section>
  );
};