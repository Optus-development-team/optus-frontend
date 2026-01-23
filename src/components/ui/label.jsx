import { cn } from '../../lib/utils';

export const Label = ({ className, ...props }) => {
  return (
    <label
      className={cn(
        'text-sm font-semibold leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block',
        className
      )}
      {...props}
    />
  );
};
