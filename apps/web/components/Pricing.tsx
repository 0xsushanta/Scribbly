import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { Plan } from '../types';

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for individuals and hobbyists.",
    features: [
      "Unlimited local drawings",
      "Export to PNG",
      "3 Shared drawings",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "$12",
    description: "For professionals who need more power.",
    features: [
      "Unlimited cloud storage",
      "Real-time collaboration",
      "Advanced export (SVG, PDF)",
      "Priority support",
      "Version history"
    ],
    highlight: true
  },
  {
    name: "Team",
    price: "$30",
    description: "Best for growing teams and startups.",
    features: [
      "Everything in Pro",
      "Team management",
      "SAML SSO",
      "Centralized billing",
      "Dedicated success manager"
    ]
  }
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#FEEAC9]/5 to-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6 font-hand bg-gradient-to-r from-[#FDACAC] via-[#FD7979] to-[#FDACAC] bg-clip-text text-transparent">Simple, transparent pricing</h2>
          <p className="text-lg text-stone-600">Start for free, upgrade when you need to.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-[#FEEAC9]/40 via-white to-[#FFCDC9]/30 border-[#FDACAC] shadow-[8px_8px_0px_0px_rgba(253,172,172,0.4)] hover:shadow-[12px_12px_0px_0px_rgba(253,121,121,0.3)] z-10 scale-105 hover:scale-110' 
                  : 'bg-gradient-to-br from-white to-[#FEEAC9]/20 border-[#FDACAC]/30 hover:border-[#FD7979]/50 hover:bg-gradient-to-br hover:from-[#FFCDC9]/20 hover:to-[#FDACAC]/10 hover:shadow-xl hover:shadow-[#FDACAC]/20 hover:-translate-y-1'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FDACAC] via-[#FD7979] to-[#FDACAC] text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg shadow-[#FD7979]/30">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <p className="text-stone-600 mt-4">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="p-0.5 rounded-full bg-gradient-to-br from-[#FDACAC] to-[#FD7979]">
                      <Check className="w-4 h-4 text-white shrink-0" />
                    </div>
                    <span className="text-stone-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.highlight ? 'primary' : 'outline'} 
                className="w-full justify-center"
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};