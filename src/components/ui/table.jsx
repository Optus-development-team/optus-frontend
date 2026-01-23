import { cn } from '../../lib/utils';

export const Table = ({ className, ...props }) => (
  <div className="w-full overflow-auto">
    <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
);

export const TableHeader = ({ className, ...props }) => (
  <thead className={cn('[&_tr]:border-b', className)} {...props} />
);

export const TableBody = ({ className, ...props }) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);

export const TableRow = ({ className, ...props }) => (
  <tr
    className={cn(
      'border-b border-gray-100 transition-all hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 data-[state=selected]:bg-blue-50',
      className
    )}
    {...props}
  />
);

export const TableHead = ({ className, ...props }) => (
  <th
    className={cn(
      'h-14 px-6 text-left align-middle font-semibold text-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 [&:has([role=checkbox])]:pr-0 first:rounded-tl-xl last:rounded-tr-xl',
      className
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }) => (
  <td
    className={cn('p-6 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
);
