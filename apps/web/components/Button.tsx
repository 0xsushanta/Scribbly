import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-scribly-primary text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5",
    secondary: "bg-scribly-accent text-scribly-dark shadow-[0_4px_14px_0_rgba(250,204,21,0.3)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.23)] hover:-translate-y-0.5",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-scribly-primary hover:text-scribly-primary bg-transparent",
    ghost: "text-slate-600 hover:text-scribly-primary hover:bg-slate-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="ml-2 w-5 h-5" />}
    </motion.button>
  );
};