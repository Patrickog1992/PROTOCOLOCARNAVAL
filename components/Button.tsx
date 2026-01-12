import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center text-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-carnival-orange to-red-500 text-white hover:shadow-xl hover:brightness-110",
    secondary: "bg-carnival-purple text-white hover:bg-purple-800",
    outline: "border-2 border-carnival-orange text-carnival-orange hover:bg-orange-50",
    ghost: "bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};