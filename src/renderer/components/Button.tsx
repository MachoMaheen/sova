import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'upgrade';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Button component following the LMN8 design system
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  // Base styles for all buttons
  const baseClasses = 'font-bold rounded-lg transition-colors focus:outline-none flex items-center justify-center';
  
  // Size-specific classes
  const sizeClasses = {
    sm: 'text-xs py-2 px-3',
    md: 'text-sm py-2.5 px-4',
    lg: 'text-base py-3 px-6',
  };
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-gradient-delete text-white hover:opacity-90',
    secondary: 'bg-[#E9F5FF] text-primary hover:bg-white',
    outline: 'border border-[#CAD1E6] text-[#CAD1E6] hover:bg-[#CAD1E6]/10',
    danger: 'bg-gradient-configure text-white hover:opacity-90',
    upgrade: 'bg-gradient-upgrade text-white hover:opacity-90',
  };

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Combine all classes
  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`;

  return (
    <button className={allClasses} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;