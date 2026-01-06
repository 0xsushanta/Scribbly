import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] text-white hover:from-[#3B82F6] hover:via-[#60A5FA] hover:to-[#3B82F6] hover:shadow-xl hover:shadow-[#3B82F6]/30 border border-transparent transition-all duration-300 hover:scale-105",
    secondary: "bg-gradient-to-br from-white to-[#DBEAFE]/30 text-stone-900 hover:from-[#60A5FA]/20 hover:to-[#3B82F6]/20 border border-[#3B82F6]/30 shadow-sm hover:shadow-lg hover:shadow-[#3B82F6]/20",
    outline: "bg-transparent border-2 border-[#60A5FA] text-[#3B82F6] hover:border-[#3B82F6] hover:bg-gradient-to-r hover:from-[#DBEAFE]/30 hover:via-[#60A5FA]/20 hover:to-[#3B82F6]/10 transition-all duration-300",
    ghost: "bg-transparent text-stone-600 hover:text-[#3B82F6] hover:bg-gradient-to-r hover:from-[#DBEAFE]/20 hover:to-[#60A5FA]/10 transition-all duration-300",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};