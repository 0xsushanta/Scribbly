import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeatureGrid } from '../components/FeatureGrid';
import { InteractiveCanvas } from '../components/InteractiveCanvas';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Trusted By Strip */}
        <div className="bg-white border-y border-slate-100 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Loved by creative teams at</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['Acme Corp', 'GlobalBank', 'TechStart', 'Nebula', 'FoxRun'].map((name) => (
                <span key={name} className="text-xl font-bold text-slate-600">{name}</span>
              ))}
            </div>
          </div>
        </div>

        <FeatureGrid />

        {/* Demo Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
               <span className="text-scribly-primary font-bold tracking-wider uppercase text-sm">Playground</span>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Try it yourself</h2>
               <p className="text-slate-600 mt-4">No sign up needed. Just start drawing.</p>
             </div>
             
             <InteractiveCanvas />
             
             <div className="mt-12 text-center">
                <Button size="lg" className="shadow-xl shadow-scribly-primary/30">
                  Create Free Board
                </Button>
             </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-scribly-dark text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
           <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6 font-hand"
              >
                Ready to unleash your creativity?
              </motion.h2>
              <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto">
                Join 100,000+ developers, designers, and product managers who use Scribly to build better products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-scribly-dark">Get Scribly Free</Button>
                <Button variant="outline" size="lg" className="border-indigo-400 text-indigo-100 hover:bg-indigo-900 hover:border-indigo-300">Contact Sales</Button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;