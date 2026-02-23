import { useEffect, useRef, useState } from 'react';

const FinisherBackgroundSafe = ({ 
  children, 
  className = '', 
  style = {},
  config = {} 
}) => {
  const containerRef = useRef(null);
  const finisherInstanceRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    // Load the FinisherHeader script if not already loaded
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.FinisherHeader) {
          setScriptLoaded(true);
          resolve();
          return;
        }

        // Check if script element already exists
        const existingScript = document.querySelector('script[src="/finisher-header.es5.min.js"]');
        if (existingScript) {
          // Wait for existing script to load
          existingScript.onload = () => {
            setScriptLoaded(true);
            resolve();
          };
          existingScript.onerror = () => {
            setScriptError(true);
            reject(new Error('Script loading failed'));
          };
          return;
        }

        const script = document.createElement('script');
        script.src = '/finisher-header.es5.min.js';
        script.onload = () => {
          setScriptLoaded(true);
          resolve();
        };
        script.onerror = () => {
          setScriptError(true);
          reject(new Error('Script loading failed'));
        };
        
        document.head.appendChild(script);
      });
    };

    const initializeFinisher = () => {
      try {
        if (containerRef.current && window.FinisherHeader) {
          // Destroy existing instance if any
          if (finisherInstanceRef.current && typeof finisherInstanceRef.current.destroy === 'function') {
            finisherInstanceRef.current.destroy();
          }

          // Default configuration
          const defaultConfig = {
            count: 60, // Reduced for better performance
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
                '#FF7A19',
                '#ffffff',
                '#ffcaa6'
              ]
            },
            blending: 'screen',
            opacity: {
              center: 0.6,
              edge: 0.1
            },
            skew: 0,
            shapes: ['c'],
            target: containerRef.current
          };

          // Merge with custom config
          const finalConfig = { ...defaultConfig, ...config };

          // Initialize FinisherHeader with error handling
          finisherInstanceRef.current = new window.FinisherHeader(finalConfig);
        }
      } catch (error) {
        console.warn('FinisherBackground initialization failed:', error);
        setScriptError(true);
      }
    };

    // Set timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (!scriptLoaded && !scriptError) {
        console.warn('FinisherHeader script loading timeout');
        setScriptError(true);
      }
    }, 10000); // 10 second timeout

    loadScript()
      .then(initializeFinisher)
      .catch((error) => {
        console.warn('FinisherBackground failed to load:', error);
        setScriptError(true);
      });

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (finisherInstanceRef.current && typeof finisherInstanceRef.current.destroy === 'function') {
        try {
          finisherInstanceRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying FinisherBackground:', error);
        }
        finisherInstanceRef.current = null;
      }
    };
  }, [config, scriptLoaded, scriptError]);

  // Fallback gradient background if script fails
  const fallbackStyle = {
    background: scriptError ? 'linear-gradient(135deg, #FF7A19 0%, #ffcaa6 100%)' : 'transparent',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    ...style
  };

  return (
    <div 
      ref={containerRef}
      className={`finisher-header ${className}`}
      style={fallbackStyle}
    >
      {children}
      {/* Loading indicator for script */}
      {!scriptLoaded && !scriptError && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.7)',
          pointerEvents: 'none'
        }}>
          Loading effects...
        </div>
      )}
    </div>
  );
};

export default FinisherBackgroundSafe;