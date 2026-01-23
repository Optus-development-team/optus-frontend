import { cn } from '../../lib/utils';

export const Button = ({ 
  children, 
  className, 
  variant = 'default', 
  size = 'default',
  disabled,
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-md hover:shadow-lg';
  
  const variants = {
    default: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700',
    ghost: 'hover:bg-purple-50 hover:text-purple-900 shadow-none',
    outline: 'border-2 border-purple-300 bg-transparent hover:bg-purple-50 text-purple-700',
  };
  
  const sizes = {
    default: 'h-12 py-3 px-6',
    sm: 'h-10 px-4 text-sm',
    lg: 'h-14 px-8 text-lg',
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
