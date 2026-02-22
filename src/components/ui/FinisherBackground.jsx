import { useEffect, useRef } from 'react';

const FinisherBackground = ({ 
  children, 
  className = '', 
  style = {},
  config = {} 
}) => {
  const containerRef = useRef(null);
  const finisherInstanceRef = useRef(null);

  useEffect(() => {
    // Load the FinisherHeader script if not already loaded
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (window.FinisherHeader) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = '/finisher-header.es5.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeFinisher = () => {
      if (containerRef.current && window.FinisherHeader) {
        // Destroy existing instance if any
        if (finisherInstanceRef.current && finisherInstanceRef.current.destroy) {
          finisherInstanceRef.current.destroy();
        }

        // Default configuration
        const defaultConfig = {
          count: 80,
          size: {
            min: 3,
            max: 8,
            pulse: 2
          },
          speed: {
            x: {
              min: -0.3,
              max: 0.3
            },
            y: {
              min: -0.2,
              max: 0.2
            }
          },
          colors: {
            background: 'transparent',
            particles: [
              '#002b5b',
              '#06b6d4',
              '#ffffff'
            ]
          },
          blending: 'screen',
          opacity: {
            center: 0.8,
            edge: 0.2
          },
          skew: 0,
          shapes: ['c', 's'],
          target: containerRef.current
        };

        // Merge with custom config
        const finalConfig = { ...defaultConfig, ...config };

        // Initialize FinisherHeader
        finisherInstanceRef.current = new window.FinisherHeader(finalConfig);
      }
    };

    loadScript()
      .then(initializeFinisher)
      .catch(console.error);

    // Cleanup function
    return () => {
      if (finisherInstanceRef.current && finisherInstanceRef.current.destroy) {
        finisherInstanceRef.current.destroy();
        finisherInstanceRef.current = null;
      }
    };
  }, [config]);

  return (
    <div 
      ref={containerRef}
      className={`finisher-header ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        /* minHeight: '400px', */
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default FinisherBackground;