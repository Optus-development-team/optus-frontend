import { useEffect, useState } from 'react';
import AOS from 'aos';
import gsap from 'gsap';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import './Nosotros.css';


const Nosotros = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const missionSlides = [
    {
      icon: 'fas fa-robot',
      title: 'Automatización Sin Barreras',
      description: 'OPTUS es la plataforma de agentes inteligentes diseñada para que emprendedores, jóvenes y startups puedan automatizar su negocio sin conocimientos técnicos.',
      color: '#6C5CE7'
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp Como Herramienta de Poder',
      description: 'Convertimos WhatsApp en un asistente digital 24/7 que vende, agenda, cobra, responde clientes y genera reportes con la misma facilidad con la que se envía un mensaje.',
      color: '#00D9A5'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Resultados Inmediatos',
      description: 'Diseñamos esta propuesta para dueños de MYPES y nuevos emprendimientos que necesitan resultados inmediatos, escalabilidad y soluciones ágiles, intuitivas y efectivas.',
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
      <section className="nosotros-hero">
        <AnimatedBackground />
        <div className="container">
          <h1 data-aos="fade-up">Transformación Digital hecha en  Bolivia</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            Somos OPTUS, la plataforma líder en automatización e inteligencia artificial para la nueva generación de negocios bolivianos.
          </p>
        </div>
      </section>

      <section className="nosotros-about">
        <div className="container">
          <h2 className="mission-title" data-aos="fade-up">Nuestra Misión</h2>
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
              Transformación Digital hecha en <span className="bolivia-badge"> Bolivia</span>
            </h3>
            <p>
              <strong>OPTUS</strong> es la plataforma de <strong>agentes inteligentes</strong> diseñada para que emprendedores, jóvenes y <em>startups</em> puedan <strong>automatizar su negocio sin conocimientos técnicos</strong>.
            </p>
            <p>
              Mediante APIs de mensajería y servicios en la nube, convertimos <strong>WhatsApp en un asistente digital 24/7</strong> que vende, agenda, cobra, responde clientes y genera reportes con la misma facilidad con la que se envía un mensaje.
            </p>
            <p>
              Diseñamos esta propuesta para dueños de MYPES y nuevos emprendimientos que necesitan <strong>resultados inmediatos</strong>, escalabilidad y una herramienta moderna lista para la nueva generación que exige soluciones <strong>ágiles, intuitivas y efectivas</strong>.
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
          <h2 className="section-title text-center" data-aos="fade-up">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
              <h3>Innovación</h3>
              <p>Estamos a la vanguardia de la tecnología de IA y automatización, siempre buscando nuevas formas de mejorar y optimizar procesos empresariales.</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="value-icon"><i className="fas fa-users"></i></div>
              <h3>Accesibilidad</h3>
              <p>Creemos que la automatización debe estar al alcance de todos, no solo de grandes empresas. Democratizamos la tecnología para MYPES y emprendedores.</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="value-icon"><i className="fas fa-heart"></i></div>
              <h3>Compromiso Local</h3>
              <p>Nacimos en Bolivia y trabajamos para Bolivia. Entendemos las necesidades y desafíos únicos del mercado local.</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="400">
              <div className="value-icon"><i className="fas fa-rocket"></i></div>
              <h3>Resultados Rápidos</h3>
              <p>No creemos en implementaciones largas y complejas. Nuestro enfoque es ofrecer valor desde el primer día con resultados tangibles e inmediatos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-team">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">¿Por Qué Elegirnos?</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            Somos más que un proveedor de tecnología, somos tu socio estratégico en la transformación digital
          </p>
          <div className="features-grid">
            <div className="feature-item" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-mobile-alt"></i>
              <h3>100% WhatsApp Native</h3>
              <p>Trabajamos con la plataforma que tus clientes ya usan todos los días. Sin apps nuevas que descargar ni sistemas complicados que aprender.</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
              <i className="fas fa-code"></i>
              <h3>Sin Código, Sin Complicaciones</h3>
              <p>No necesitas contratar desarrolladores ni tener conocimientos técnicos. Implementación simple y rápida, lista en días, no en meses.</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="400">
              <i className="fas fa-brain"></i>
              <h3>IA Entrenada para tu Negocio</h3>
              <p>Nuestros agentes aprenden de tu información específica, hablando el lenguaje de tu empresa y adaptándose a tu forma de trabajar.</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="500">
              <i className="fas fa-headset"></i>
              <h3>Soporte Local en Español</h3>
              <p>Equipo boliviano que entiende tu contexto cultural, empresarial y tecnológico. Respuesta rápida y en tu idioma.</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="600">
              <i className="fas fa-chart-line"></i>
              <h3>ROI Comprobado</h3>
              <p>Casos de éxito documentados con reducción del 80% en tiempo de respuesta y aumento del 200% en conversión de leads.</p>
            </div>
            <div className="feature-item" data-aos="fade-up" data-aos-delay="700">
              <i className="fas fa-lock"></i>
              <h3>Seguridad y Privacidad</h3>
              <p>Cumplimos con los más altos estándares de protección de datos. Tu información y la de tus clientes está completamente segura.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-cta">
        <div className="container text-center">
          <h2 data-aos="fade-up">¿Listo para Transformar tu Negocio?</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Únete a la revolución de la automatización en Bolivia. Comienza hoy y ve resultados desde la primera semana.
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href="#contact" className="btn btn-primary btn-lg">Agenda una Demo Gratuita</a>
            <a href="https://wa.me/59177379190" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Chatea con Nosotros
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
