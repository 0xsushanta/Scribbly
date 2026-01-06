import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}