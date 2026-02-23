import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    content: "Scribly has completely changed how we do remote architecture reviews. It's like having a whiteboard in the cloud.",
    author: "Sarah Chen",
    role: "Staff Engineer @ TechFlow",
    avatar: "https://picsum.photos/100/100?random=10"
  },
  {
    content: "The hand-drawn aesthetic makes diagrams feel less formal and more inviting for feedback. Absolutely love it.",
    author: "Marcus Rodriguez",
    role: "Product Manager @ DesignCo",
    avatar: "https://picsum.photos/100/100?random=11"
  },
  {
    content: "I use it for everything from quick notes to complex system architecture. The infinite canvas is a game changer.",
    author: "Emily Watson",
    role: "Freelance Designer",
    avatar: "https://picsum.photos/100/100?random=12"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-stone-900 mb-16 font-hand">
          Don't just take our word for it
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-stone-200" />
              <p className="text-lg text-stone-700 mb-8 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border border-stone-200" />
                <div>
                  <div className="font-bold text-stone-900">{t.author}</div>
                  <div className="text-sm text-stone-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};