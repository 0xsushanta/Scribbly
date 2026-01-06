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
    primary: "bg-gradient-to-r from-[#FDACAC] via-[#FD7979] to-[#FDACAC] text-white hover:from-[#FD7979] hover:via-[#FDACAC] hover:to-[#FD7979] hover:shadow-xl hover:shadow-[#FD7979]/30 border border-transparent transition-all duration-300 hover:scale-105",
    secondary: "bg-gradient-to-br from-white to-[#FEEAC9]/30 text-stone-900 hover:from-[#FFCDC9]/20 hover:to-[#FDACAC]/20 border border-[#FDACAC]/30 shadow-sm hover:shadow-lg hover:shadow-[#FDACAC]/20",
    outline: "bg-transparent border-2 border-[#FDACAC] text-[#FD7979] hover:border-[#FD7979] hover:bg-gradient-to-r hover:from-[#FEEAC9]/30 hover:via-[#FFCDC9]/20 hover:to-[#FDACAC]/10 transition-all duration-300",
    ghost: "bg-transparent text-stone-600 hover:text-[#FD7979] hover:bg-gradient-to-r hover:from-[#FEEAC9]/20 hover:to-[#FFCDC9]/10 transition-all duration-300",
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