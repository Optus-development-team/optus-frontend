import { cn } from '../../lib/utils';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('rounded-2xl bg-white/95 backdrop-blur-sm text-gray-900 shadow-lg border-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={cn('flex flex-col space-y-3 p-8 pb-6', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={cn('text-2xl font-semibold leading-relaxed', className)}
      style={{ letterSpacing: '-0.02em' }}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('p-8 pt-4', className)} {...props}>
      {children}
    </div>
  );
};
