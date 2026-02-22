import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import gsap from 'gsap';
import FinisherBackground from '../components/ui/FinisherBackground';
import './Nosotros.css';


const Nosotros = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const missionSlides = [
    {
      icon: 'fas fa-robot',
      title: t('about.mission.slide1.title'),
      description: t('about.mission.slide1.description'),
      color: '#6C5CE7'
    },
    {
      icon: 'fab fa-whatsapp',
      title: t('about.mission.slide2.title'),
      description: t('about.mission.slide2.description'),
      color: '#00D9A5'
    },
    {
      icon: 'fas fa-rocket',
      title: t('about.mission.slide3.title'),
      description: t('about.mission.slide3.description'),
      color: '#FF6B6B'
    }
  ];

  useEffect(() => {
    AOS.refresh();
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % missionSlides.length);
    }, 5000);
    
    // Efecto interactivo para las imágenes
    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;

    const root = document.querySelector('.mwg_effect000');
    if (root) {
      const handleMouseMove = (e) => {
        deltaX = e.clientX - oldX;
        deltaY = e.clientY - oldY;
        oldX = e.clientX;
        oldY = e.clientY;
      };

      root.addEventListener('mousemove', handleMouseMove);

      const mediaElements = root.querySelectorAll('.media');
      
      mediaElements.forEach(el => {
        const handleMouseEnter = () => {
          const image = el.querySelector('img');
          if (!image) return;

          const tl = gsap.timeline({ 
            onComplete: () => {
              tl.kill();
            }
          });
          tl.timeScale(1.2);

          const velocityX = deltaX * 30;
          const velocityY = deltaY * 30;

          tl.to(image, {
            x: velocityX,
            y: velocityY,
            duration: 1.5,
            ease: 'power3.out'
          }).to(image, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)'
          }, '-=0.8');

          tl.fromTo(image, 
            { rotate: 0, scale: 1 },
            {
              duration: 0.4,
              rotate: (Math.random() - 0.5) * 30,
              scale: 1.15,
              yoyo: true,
              repeat: 1,
              ease: 'power1.inOut'
            }, 
            '<'
          );
        };

        el.addEventListener('mouseenter', handleMouseEnter);
      });
    }
    
    return () => {
      clearInterval(interval);
      if (root) {
        root.removeEventListener('mousemove', () => {});
      }
    };
  }, []);

  return (
    <div className="nosotros-page">
      <FinisherBackground className="nosotros-hero">
        <div className="container">
          <h1 data-aos="fade-up">{t('about.hero.title')}</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </FinisherBackground>

      <section className="nosotros-about">
        <div className="container">
          <h2 className="mission-title" data-aos="fade-up">{t('about.sections.mission')}</h2>
          <div className="mission-carousel" data-aos="fade-up" data-aos-delay="200">
            <div className="carousel-container">
              {missionSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`carousel-slide ${index === activeSlide ? 'active' : ''} ${index < activeSlide ? 'prev' : 'next'}`}
                  style={{ '--slide-color': slide.color }}
                >
                  <div className="slide-icon">
                    <i className={slide.icon}></i>
                  </div>
                  <h3 className="slide-title">{slide.title}</h3>
                  <p className="slide-description">{slide.description}</p>
                  <div className="slide-number">{index + 1}/{missionSlides.length}</div>
                </div>
              ))}
            </div>
            <div className="carousel-controls">
              <button 
                className="carousel-btn prev-btn"
                onClick={() => setActiveSlide((prev) => (prev - 1 + missionSlides.length) % missionSlides.length)}
                aria-label="Anterior"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="carousel-dots">
                {missionSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                className="carousel-btn next-btn"
                onClick={() => setActiveSlide((prev) => (prev + 1) % missionSlides.length)}
                aria-label="Siguiente"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-transformation">
        <div className="container about-content">
          <div className="about-text" data-aos="fade-right">
            <h3>
              {t('about.transformation.title').split('Bolivia').map((part, index) => 
                index === 0 ? (
                  <span key={index}>
                    {part}<span className="bolivia-badge"> Bolivia</span>
                  </span>
                ) : (
                  <span key={index}>{part}</span>
                )
              )}
            </h3>
            <p>
              <strong>OPTUS</strong> {t('about.transformation.paragraph1')}
            </p>
            <p>
              {t('about.transformation.paragraph2')}
            </p>
            <p>
              {t('about.transformation.paragraph3')}
            </p>
          </div>
          <div className="about-image" data-aos="fade-left">
            <section className="mwg_effect000">
              <div className="medias">
                <div className="media"><img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400" alt="WhatsApp Business" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400" alt="Chatbot AI" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400" alt="Automatización" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400" alt="Emprendedores" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="MYPES Bolivia" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400" alt="Startups" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400" alt="Cloud Services" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400" alt="Digital Team" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400" alt="Mobile Business" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" alt="Data Analytics" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400" alt="Customer Service" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400" alt="Ventas Online" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400" alt="Equipo Remoto" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400" alt="Innovación Digital" /></div>
                <div className="media"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" alt="Colaboración" /></div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="nosotros-values">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">{t('about.sections.values')}</h2>
          <div className="values-grid">
            <div className="value-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
              <h3>{t('about.values.innovation.title')}</h3>
              <p>{t('about.values.innovation.description')}</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="value-icon"><i className="fas fa-users"></i></div>
              <h3>{t('about.values.accessibility.title')}</h3>
              <p>{t('about.values.accessibility.description')}</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="value-icon"><i className="fas fa-heart"></i></div>
              <h3>{t('about.values.localCommitment.title')}</h3>
              <p>{t('about.values.localCommitment.description')}</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="400">
              <div className="value-icon"><i className="fas fa-rocket"></i></div>
              <h3>{t('about.values.quickResults.title')}</h3>
              <p>{t('about.values.quickResults.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-team">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">{t('about.sections.whyChoose')}</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            {t('about.sections.whyChooseSubtitle')}
          </p>
          <div className="features-grid">
            <div className="feature-item" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-mobile-alt"></i>
              <h3>{t('about.features.whatsappNative.title')}</h3>
              <p>{t('about.features.whatsappNative.description')}</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
              <i className="fas fa-code"></i>
              <h3>{t('about.features.noCode.title')}</h3>
              <p>{t('about.features.noCode.description')}</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="400">
              <i className="fas fa-brain"></i>
              <h3>{t('about.features.aiTrained.title')}</h3>
              <p>{t('about.features.aiTrained.description')}</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="500">
              <i className="fas fa-headset"></i>
              <h3>{t('about.features.localSupport.title')}</h3>
              <p>{t('about.features.localSupport.description')}</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="600">
              <i className="fas fa-chart-line"></i>
              <h3>{t('about.features.provenROI.title')}</h3>
              <p>{t('about.features.provenROI.description')}</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="700">
              <i className="fas fa-lock"></i>
              <h3>{t('about.features.security.title')}</h3>
              <p>{t('about.features.security.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-cta">
        <div className="container text-center">
          <h2 data-aos="fade-up">{t('about.title')}</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            {t('about.subtitle')}
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href="#contact" className="btn btn-primary btn-lg">{t('about.ctaPrimary')}</a>
            <a href="https://wa.me/59177379190" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> {t('about.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
