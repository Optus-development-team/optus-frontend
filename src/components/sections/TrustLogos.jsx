import './TrustLogos.css';

const TrustLogos = () => {
  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", alt: "OpenAI" },
     { src: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4", alt: "Base" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", alt: "Microsoft" },
    { src: "https://cryptologos.cc/logos/avalanche-avax-logo.svg", alt: "Avalanche" },
   
  ];

  return (
    <section className="trust-logos">
      <div className="trust-logos-wrapper">
        <div className="trust-logos-container">
          {logos.map((logo, index) => (
            <img 
              key={`logo-1-${index}`}
              src={logo.src} 
              alt={logo.alt} 
              className="company-logo" 
            />
          ))}
          {/* Duplicate for infinite loop effect */}
          {logos.map((logo, index) => (
            <img 
              key={`logo-2-${index}`}
              src={logo.src} 
              alt={logo.alt} 
              className="company-logo" 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
