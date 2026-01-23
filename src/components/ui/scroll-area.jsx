import { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export const ScrollArea = ({ children, className, ...props }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div
      ref={scrollRef}
      className={cn('overflow-auto', className)}
      {...props}
    >
      {children}
    </div>
  );
};
