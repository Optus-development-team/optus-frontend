import { cn } from '../../lib/utils';
import './badge.css';

export const Badge = ({ children, className, variant = 'default', ...props }) => {
  const variantClasses = {
    default: 'badge-default',
    secondary: 'badge-secondary',
    destructive: 'badge-destructive',
    outline: 'badge-outline',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold transition-all shadow-sm gap-1',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
