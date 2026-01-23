import { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';
import './select.css';

const SelectContext = createContext();

export const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({ children, className, id, ...props }) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);

  return (
    <button
      type="button"
      id={id}
      className={cn(
        'flex h-12 w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium ring-offset-white placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        className
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

export const SelectValue = ({ placeholder }) => {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

export const SelectContent = ({ children, className, ...props }) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          'absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border-2 border-gray-200 bg-white py-2 shadow-2xl select-content-wrapper',
          className
        )}
        style={{ backgroundColor: 'white', opacity: 1 }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export const SelectItem = ({ children, value, className, ...props }) => {
  const { onValueChange, setIsOpen } = useContext(SelectContext);

  return (
    <div
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-lg py-3 px-4 text-sm font-medium outline-none hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 focus:bg-purple-50 transition-all',
        className
      )}
      onClick={() => {
        onValueChange(value);
        setIsOpen(false);
      }}
      {...props}
    >
      {children}
    </div>
  );
};
