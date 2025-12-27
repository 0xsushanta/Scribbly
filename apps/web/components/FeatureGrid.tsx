import React from 'react';
import { Users, Zap, Layers, Globe, Lock, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Live Collaboration',
    description: 'Work with your team in real-time. See cursors, instant updates, and bring ideas to life together.',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    delay: 0.1,
    colSpan: 'md:col-span-2',
  },
  {
    title: 'Hand-drawn Feel',
    description: 'Sketchy aesthetics that keep things low-fidelity so you focus on the concept, not the pixels.',
    icon: Palette,
    color: 'bg-purple-100 text-purple-600',
    delay: 0.2,
    colSpan: 'md:col-span-1',
  },
  {
    title: 'Infinite Canvas',
    description: 'Never run out of space. Pan and zoom infinitely to map out complex flows.',
    icon: Layers,
    color: 'bg-yellow-100 text-yellow-600',
    delay: 0.3,
    colSpan: 'md:col-span-1',
  },
  {
    title: 'End-to-End Encrypted',
    description: 'Your ideas are yours. Enterprise-grade security keeps your sketches private and secure.',
    icon: Lock,
    color: 'bg-green-100 text-green-600',
    delay: 0.4,
    colSpan: 'md:col-span-2',
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to <span className="text-scribly-primary">flow</span>
          </h2>
          <p className="text-lg text-slate-600">
            Powerful features wrapped in a simple, intuitive interface that feels just like paper.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              className={`${feature.colSpan} group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-scribly-primary/20 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};