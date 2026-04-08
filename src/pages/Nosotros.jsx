import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import gsap from 'gsap';
import FinisherBackground from '../components/ui/FinisherBackground';
import './Nosotros.css';


const Nosotros = () => {
  const { t } = useTranslation();

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
          <div className="mission-flashcards" data-aos="fade-up" data-aos-delay="200">
            {missionSlides.map((slide, index) => (
              <article key={index} className="mission-flashcard" style={{ '--slide-color': slide.color }}>
                <div className="slide-icon">
                  <i className={slide.icon}></i>
                </div>
                <h3 className="slide-title">{slide.title}</h3>
                <p className="slide-description">{slide.description}</p>
              </article>
            ))}
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
          <h2 className="section-title text-center" data-aos="fade-up">{t('about.vision.title')}</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            {t('about.vision.description')}
          </p>
          <div className="vision-card" data-aos="fade-up" data-aos-delay="200">
            <h3>{t('about.vision.cardTitle')}</h3>
            <ul className="vision-list">
              {t('about.vision.points', { returnObjects: true }).map((point, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
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
            <a href="https://wa.me/59177379190" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> {t('about.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
