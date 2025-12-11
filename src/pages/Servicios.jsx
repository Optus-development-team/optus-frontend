import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../components/layout/Navbar';
import './Servicios.css';

const Servicios = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const serviciosDetallados = [
    {
      id: 1,
      icon: 'fas fa-cogs',
      title: 'Automatización Empresarial',
      subtitle: 'Optimiza tu flujo de trabajo completo',
      description: 'Flujos de trabajo completos sin código: desde la captación de leads hasta el cierre de ventas y la facturación automática.',
      features: [
        'Captación automática de leads desde múltiples canales',
        'Calificación inteligente de prospectos con IA',
        'Seguimiento automatizado de oportunidades de venta',
        'Cierre de ventas y generación de contratos digitales',
        'Facturación automática integrada con sistemas de pago',
        'Reportes y dashboards en tiempo real'
      ],
      casos: 'Empresas aumentan su productividad en un 300% y reducen tiempo operativo en 75%'
    },
    {
      id: 2,
      icon: 'fas fa-brain',
      title: 'Agentes de IA Personalizados',
      subtitle: 'Tu vendedor digital 24/7',
      description: 'Entrena a tu Agente de WhatsApp con la información de tu negocio para que sea tu vendedor o soporte 24/7 más eficiente.',
      features: [
        'Entrenamiento con información específica de tu empresa',
        'Respuestas naturales adaptadas a tu tono de marca',
        'Aprendizaje continuo de nuevas consultas',
        'Manejo de objeciones y preguntas complejas',
        'Escalamiento a humanos cuando es necesario',
        'Disponibilidad 24/7 sin interrupciones'
      ],
      casos: 'Retail reduce 80% tickets de soporte. E-commerce duplica conversiones nocturnas.'
    },
    {
      id: 3,
      icon: 'fas fa-network-wired',
      title: 'Integración de Sistemas Inteligentes',
      subtitle: 'Ecosistema digital unificado',
      description: 'Conecta OPTUS con tus sistemas de pago, CRM, inventario y más para tener un ecosistema digital totalmente sincronizado.',
      features: [
        'Integración con pasarelas de pago (QR, tarjetas, billeteras)',
        'Conexión con CRM (HubSpot, Salesforce, Zoho)',
        'Sincronización con sistemas de inventario en tiempo real',
        'Integración con plataformas de e-commerce',
        'Conexión con ERPs empresariales',
        'APIs personalizadas para sistemas propietarios'
      ],
      casos: 'Empresas eliminan errores de conciliación y ganan 20 horas semanales en procesos manuales.'
    },
    {
      id: 4,
      icon: 'fas fa-chart-line',
      title: 'Consultoría en Digitalización Ágil',
      subtitle: 'Estrategia personalizada para tu transformación',
      description: 'Asesoría estratégica para identificar y optimizar los puntos débiles de tu flujo comercial con tecnología de punta.',
      features: [
        'Auditoría completa de procesos actuales',
        'Identificación de cuellos de botella operativos',
        'Diseño de solución personalizada',
        'Plan de implementación por fases',
        'Capacitación del equipo interno',
        'Soporte post-implementación continuo'
      ],
      casos: 'Startups reducen tiempo de implementación de 6 meses a 2 semanas con estrategia clara.'
    },
    {
      id: 5,
      icon: 'fas fa-comments',
      title: 'Asistentes Virtuales Multicanal',
      subtitle: 'Atiende desde una sola plataforma',
      description: 'Implementa chatbots inteligentes en WhatsApp, Messenger, Instagram y tu sitio web con una sola plataforma centralizada.',
      features: [
        'Inbox unificado para todos los canales',
        'Respuestas consistentes en múltiples plataformas',
        'Enrutamiento inteligente según tipo de consulta',
        'Historial centralizado de conversaciones',
        'Análisis de sentimiento en tiempo real',
        'Respuestas automatizadas con contexto de canal'
      ],
      casos: 'Empresas de servicios aumentan satisfacción del cliente en 45% con respuestas instantáneas.'
    },
    {
      id: 6,
      icon: 'fas fa-calendar-check',
      title: 'Sistema de Agendamiento Inteligente',
      subtitle: 'Reservas automáticas sin fricción',
      description: 'Automatiza la gestión de citas, reservas y agendamiento con confirmaciones, recordatorios y reprogramación inteligente.',
      features: [
        'Calendario sincronizado en tiempo real',
        'Reservas 24/7 sin intervención humana',
        'Recordatorios automáticos por WhatsApp',
        'Reprogramación fácil para clientes',
        'Gestión de cancelaciones y lista de espera',
        'Integración con Google Calendar y Outlook'
      ],
      casos: 'Clínicas médicas reducen ausencias en 60% con recordatorios automáticos.'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="servicios-page">
      <section className="servicios-hero">
        <div className="container">
          <h1 data-aos="fade-up">Nuestros Servicios de Impacto</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            Soluciones modulares que se integran a tu flujo de trabajo de manera inmediata. Elige lo que necesitas hoy y escala cuando estés listo.
          </p>
        </div>
      </section>

      <section className="servicios-lista">
        <div className="container">
          {serviciosDetallados.map((servicio, index) => (
            <div 
              key={servicio.id} 
              className="servicio-detallado"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="servicio-header">
                <div className="servicio-icon">
                  <i className={servicio.icon}></i>
                </div>
                <div className="servicio-title-section">
                  <h2>{servicio.title}</h2>
                  <p className="subtitle">{servicio.subtitle}</p>
                </div>
              </div>
              <p className="servicio-description">{servicio.description}</p>
              <div className="servicio-features">
                <h4>Características Principales:</h4>
                <ul>
                  {servicio.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="servicio-caso">
                <i className="fas fa-star"></i>
                <span><strong>Caso de Éxito:</strong> {servicio.casos}</span>
              </div>
              <div className="servicio-cta">
                <a href="#contact" className="btn btn-primary">Solicitar Demo</a>
                <a href="https://wa.me/59177379190" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> Consultar por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="servicios-proceso">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Nuestro Proceso de Implementación</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            Simple, rápido y sin complicaciones. De la consulta a la producción en tiempo récord.
          </p>
          <div className="proceso-timeline">
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="200">
              <div className="step-number">1</div>
              <h3>Consulta Inicial</h3>
              <p>Reunión de 30 minutos para entender tu negocio, objetivos y desafíos actuales. Totalmente gratis.</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="300">
              <div className="step-number">2</div>
              <h3>Propuesta Personalizada</h3>
              <p>En 24 horas recibes un plan detallado con alcance, tiempos y costos específicos para tu caso.</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="400">
              <div className="step-number">3</div>
              <h3>Configuración Rápida</h3>
              <p>Implementación en 3-7 días. Nosotros nos encargamos de todo, tú solo proporcionas la información necesaria.</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="500">
              <div className="step-number">4</div>
              <h3>Capacitación del Equipo</h3>
              <p>Entrenamos a tu equipo en el uso de la plataforma. Sesiones prácticas y materiales de apoyo incluidos.</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="600">
              <div className="step-number">5</div>
              <h3>Lanzamiento y Soporte</h3>
              <p>Salida a producción con acompañamiento. Soporte continuo y optimización basada en resultados reales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="servicios-precios">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Planes Flexibles para Cada Etapa</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            Desde emprendimientos en etapa temprana hasta empresas establecidas. Paga por lo que usas y escala cuando crezcas.
          </p>
          <div className="planes-grid">
            <div className="plan-card" data-aos="zoom-in" data-aos-delay="200">
              <h3>Starter</h3>
              <div className="plan-price">Desde $99<span>/mes</span></div>
              <ul>
                <li><i className="fas fa-check"></i> 1 Agente de IA</li>
                <li><i className="fas fa-check"></i> 500 conversaciones/mes</li>
                <li><i className="fas fa-check"></i> WhatsApp + Web Chat</li>
                <li><i className="fas fa-check"></i> Reportes básicos</li>
                <li><i className="fas fa-check"></i> Soporte por email</li>
              </ul>
              <a href="#contact" className="btn btn-outline">Comenzar</a>
            </div>
            <div className="plan-card plan-featured" data-aos="zoom-in" data-aos-delay="300">
              <div className="plan-badge">Más Popular</div>
              <h3>Business</h3>
              <div className="plan-price">Desde $299<span>/mes</span></div>
              <ul>
                <li><i className="fas fa-check"></i> 3 Agentes de IA</li>
                <li><i className="fas fa-check"></i> 2,000 conversaciones/mes</li>
                <li><i className="fas fa-check"></i> Multicanal completo</li>
                <li><i className="fas fa-check"></i> Integraciones incluidas</li>
                <li><i className="fas fa-check"></i> Reportes avanzados</li>
                <li><i className="fas fa-check"></i> Soporte prioritario 24/7</li>
              </ul>
              <a href="#contact" className="btn btn-primary">Solicitar Demo</a>
            </div>
            <div className="plan-card" data-aos="zoom-in" data-aos-delay="400">
              <h3>Enterprise</h3>
              <div className="plan-price">Personalizado</div>
              <ul>
                <li><i className="fas fa-check"></i> Agentes ilimitados</li>
                <li><i className="fas fa-check"></i> Conversaciones ilimitadas</li>
                <li><i className="fas fa-check"></i> Todo de Business +</li>
                <li><i className="fas fa-check"></i> Consultoría estratégica</li>
                <li><i className="fas fa-check"></i> SLA garantizado</li>
                <li><i className="fas fa-check"></i> Account Manager dedicado</li>
              </ul>
              <a href="#contact" className="btn btn-outline">Contactar Ventas</a>
            </div>
          </div>
        </div>
      </section> */}

      <section className="servicios-final-cta">
        <div className="container text-center">
          <h2 data-aos="fade-up">¿Listo para Comenzar?</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Descubre más servicios personalizados para tu negocio. Agenda una demo gratuita y transforma tu empresa hoy.
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
    </>
  );
};

export default Servicios;
