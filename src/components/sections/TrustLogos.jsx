import './TrustLogos.css';
import circleLogo from '../../assets/img/Circle_idJiLiqOi3_1.png';
import arcLogo from '../../assets/img/arc.svg';

const TrustLogos = () => {
  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", alt: "OpenAI" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", alt: "Microsoft" },
    { src: circleLogo, alt: "Circle" },
    { src: arcLogo, alt: "Arc Blockchain" }
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
