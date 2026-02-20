import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../components/layout/Navbar';
import FinisherBackground from '../components/ui/FinisherBackground';
import './Portafolio.css';

const Portafolio = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const portfolioItems = [
    {
      id: 1,
      title: 'Retail Fashion: Soporte 24/7 Automatizado',
      company: 'TiendaModa Bolivia',
      industry: 'Retail & Moda',
      description: 'Reducción del 80% en tickets de soporte manual tras implementar Agente de IA para preguntas frecuentes, seguimiento de pedidos y gestión de devoluciones.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      results: [
        '80% reducción en tickets manuales',
        '24/7 disponibilidad sin costos extra',
        '95% satisfacción del cliente',
        'ROI de 300% en 3 meses'
      ],
      tag: 'Chatbot IA'
    },
    {
      id: 2,
      title: 'Agencia Digital: Captación Automática de Leads',
      company: 'CreativaLab',
      industry: 'Marketing & Servicios',
      description: 'Duplicaron leads calificados al mes gracias a la automatización del formulario de contacto, calificación inteligente y seguimiento inicial por IA.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      results: [
        '200% aumento en leads calificados',
        '60% reducción en tiempo de respuesta',
        '45% aumento en conversión',
        'Automatización 100% del funnel inicial'
      ],
      tag: 'Automatización CRM'
    },
    {
      id: 3,
      title: 'E-commerce: Cobros y Facturación Inteligente',
      company: 'TechStore Bolivia',
      industry: 'E-commerce & Tecnología',
      description: 'Automatización completa del proceso de cobro mediante QR, emisión automática de facturas y notificaciones de pago, eliminando errores y optimizando cash flow.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      results: [
        'Cero errores en facturación',
        '90% reducción en tiempo de cobranza',
        '50% mejora en cash flow',
        'Integración completa con pagos digitales'
      ],
      tag: 'Pagos & Facturación'
    },
    {
      id: 4,
      title: 'Clínica Médica: Agendamiento sin Fricción',
      company: 'Centro Salud Integral',
      industry: 'Salud & Servicios Médicos',
      description: 'Sistema de agendamiento automático por WhatsApp con recordatorios, reprogramación inteligente y confirmación de citas. Reducción drástica de ausencias.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      results: [
        '60% reducción en ausencias',
        '100% automatización de agendamiento',
        '40% aumento en citas confirmadas',
        '24/7 disponibilidad para reservas'
      ],
      tag: 'Agendamiento IA'
    },
    {
      id: 5,
      title: 'Restaurante: Pedidos y Delivery Optimizado',
      company: 'Sabor Boliviano',
      industry: 'Gastronomía & Food Service',
      description: 'Implementación de sistema de pedidos automáticos por WhatsApp con menú digital, gestión de stock en tiempo real y coordinación de delivery.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      results: [
        '150% aumento en pedidos digitales',
        'Cero errores en toma de pedidos',
        '30% reducción en tiempo de atención',
        'Integración con sistemas de delivery'
      ],
      tag: 'WhatsApp Commerce'
    },
    {
      id: 6,
      title: 'Inmobiliaria: Gestión Inteligente de Propiedades',
      company: 'Hogar Ideal',
      industry: 'Bienes Raíces',
      description: 'Agente virtual que califica prospectos, agenda visitas, envía información de propiedades y hace seguimiento automático del interés del cliente.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3',
      results: [
        '75% calificación automática de leads',
        '3x más visitas agendadas',
        '50% reducción en tiempo de cierre',
        'Base de datos centralizada y actualizada'
      ],
      tag: 'Lead Qualification'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="portafolio-page">
      <FinisherBackground className="portafolio-hero">
        <div className="container">
          <h1 data-aos="fade-up">Casos de Éxito Reales</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            Empresas bolivianas que transformaron su operación con OPTUS. Resultados medibles, implementación rápida y ROI comprobado.
          </p>
        </div>
      </FinisherBackground>

      <section className="portafolio-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="stat-number">50+</div>
              <div className="stat-label">Empresas Atendidas</div>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="stat-number">80%</div>
              <div className="stat-label">Reducción en Costos</div>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="stat-number">300%</div>
              <div className="stat-label">ROI Promedio</div>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="400">
              <div className="stat-number">7 días</div>
              <div className="stat-label">Implementación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      <section className="portafolio-casos">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Historias de Transformación Digital</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            Cada proyecto es único, pero todos comparten algo: resultados inmediatos y tangibles
          </p>

          <div className="casos-grid">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id} 
                className="caso-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="caso-image">
                  <img src={item.image} alt={item.title} />
                  <div className="caso-tag">{item.tag}</div>
                </div>
                <div className="caso-content">
                  <div className="caso-header">
                    <h3>{item.title}</h3>
                    <div className="caso-meta">
                      <span className="company">{item.company}</span>
                      <span className="industry">{item.industry}</span>
                    </div>
                  </div>
                  <p className="caso-description">{item.description}</p>
                  <div className="caso-results">
                    <h4>Resultados Clave:</h4>
                    <ul>
                      {item.results.map((result, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check-circle"></i>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="portafolio-industries">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Industrias que Transformamos</h2>
          <div className="industries-grid">
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="100">
              <i className="fas fa-shopping-bag"></i>
              <h3>Retail & E-commerce</h3>
              <p>Automatización de ventas, inventario y atención al cliente</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="200">
              <i className="fas fa-heartbeat"></i>
              <h3>Salud & Clínicas</h3>
              <p>Agendamiento inteligente y seguimiento de pacientes</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="300">
              <i className="fas fa-utensils"></i>
              <h3>Gastronomía</h3>
              <p>Pedidos automáticos y gestión de delivery</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="400">
              <i className="fas fa-building"></i>
              <h3>Bienes Raíces</h3>
              <p>Calificación de leads y agendamiento de visitas</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="500">
              <i className="fas fa-graduation-cap"></i>
              <h3>Educación</h3>
              <p>Inscripciones automáticas y soporte a estudiantes</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="600">
              <i className="fas fa-briefcase"></i>
              <h3>Servicios Profesionales</h3>
              <p>Captación de leads y automatización de consultas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portafolio-cta">
        <div className="container text-center">
          <h2 data-aos="fade-up">¿Quieres Ser el Siguiente Caso de Éxito?</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Transforma tu negocio como lo hicieron estas empresas. Comienza con una demo gratuita y descubre el potencial de tu empresa.
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href="#contact" className="btn btn-primary btn-lg">Agenda tu Demo Gratuita</a>
            <a href="https://wa.me/59177379190" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Portafolio;
