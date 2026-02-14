import { useEffect } from 'react';
import AOS from 'aos';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import './Beneficios.css';

const Beneficios = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const mainBenefits = [
    {
      id: 1,
      icon: 'fas fa-bolt',
      title: 'Productividad x10',
      description: 'Libera a tu equipo de tareas repetitivas. Dedica el tiempo a la estrategia y la creatividad, no a la operación manual.',
      metrics: ['10x más eficiencia', 'Automatización 80% tareas', '20 hrs/semana ahorradas']
    },
    {
      id: 2,
      icon: 'fas fa-hand-holding-usd',
      title: 'Reducción de Costos Drástica',
      description: 'Menos errores, menos personal operativo. La IA trabaja sin descanso por una fracción del costo de un empleado tradicional.',
      metrics: ['70% reducción costos', 'ROI en 3 meses', 'Cero errores manuales']
    },
    {
      id: 3,
      icon: 'fas fa-rocket',
      title: 'Escalabilidad Sin Límites',
      description: 'Tu agente de IA atiende a 10 o a 10,000 clientes con la misma eficiencia. Escala tu negocio sin preocuparte por la infraestructura.',
      metrics: ['Capacidad ilimitada', 'Misma calidad siempre', 'Sin inversión adicional']
    },
    {
      id: 4,
      icon: 'fas fa-lightbulb',
      title: 'Innovación Continua',
      description: 'Accede a las últimas tendencias en IA y automatización sin código. Mantente siempre un paso adelante de la competencia.',
      metrics: ['Actualizaciones automáticas', 'Nuevas features mensuales', 'Sin costo adicional']
    },
    {
      id: 5,
      icon: 'fas fa-clock',
      title: 'Disponibilidad 24/7',
      description: 'Tus agentes de IA nunca duermen. Atiende clientes, cierra ventas y resuelve dudas a cualquier hora, incluso fines de semana y feriados.',
      metrics: ['365 días al año', 'Sin horarios', 'Respuesta instantánea']
    },
    {
      id: 6,
      icon: 'fas fa-code',
      title: 'Sin Conocimientos Técnicos',
      description: 'Diseñado para emprendedores y MYPES. No necesitas programar ni contratar desarrolladores. Implementación simple con WhatsApp.',
      metrics: ['Implementación en 7 días', 'Interfaz intuitiva', 'Soporte incluido']
    }
  ];

  const businessImpact = [
    {
      icon: 'fas fa-users-cog',
      title: 'Para tu Equipo',
      points: [
        'Menos trabajo manual y repetitivo',
        'Más tiempo para tareas estratégicas',
        'Mejor ambiente laboral y motivación',
        'Capacitación continua incluida'
      ]
    },
    {
      icon: 'fas fa-user-check',
      title: 'Para tus Clientes',
      points: [
        'Respuestas instantáneas sin espera',
        'Atención personalizada y consistente',
        'Disponibilidad 24/7 sin interrupciones',
        'Experiencia fluida y moderna'
      ]
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Para tu Negocio',
      points: [
        'Aumento comprobado en conversiones',
        'Reducción significativa de costos operativos',
        'Datos y reportes en tiempo real',
        'Ventaja competitiva clara en el mercado'
      ]
    }
  ];

  const comparisonData = [
    {
      category: 'Tiempo de Respuesta',
      traditional: '2-24 horas',
      optus: 'Instantáneo',
      improvement: '95% más rápido'
    },
    {
      category: 'Costo Mensual',
      traditional: '$800-1500',
      optus: '$99-299',
      improvement: '80% menos'
    },
    {
      category: 'Disponibilidad',
      traditional: '8hrs/día laborables',
      optus: '24/7/365',
      improvement: '3x más cobertura'
    },
    {
      category: 'Capacidad de Atención',
      traditional: '10-20 clientes/día',
      optus: 'Ilimitado',
      improvement: 'Sin límites'
    },
    {
      category: 'Tasa de Errores',
      traditional: '15-20%',
      optus: '<1%',
      improvement: '95% menos errores'
    }
  ];

  return (
    <div className="beneficios-page">
      <section className="beneficios-hero">
        <AnimatedBackground />
        <div className="container">
          <h1 data-aos="fade-up">Beneficios que Transforman tu Negocio</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            No solo automatización. OPTUS es tu ventaja competitiva en el mercado digital boliviano.
          </p>
        </div>
      </section>

      <section className="beneficios-main">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">¿Por Qué OPTUS Marca la Diferencia?</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            Resultados medibles desde el primer día. Inversión inteligente con retorno garantizado.
          </p>

          <div className="benefits-grid">
            {mainBenefits.map((benefit, index) => (
              <div 
                key={benefit.id} 
                className="benefit-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="benefit-icon">
                  <i className={benefit.icon}></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <div className="benefit-metrics">
                  {benefit.metrics.map((metric, idx) => (
                    <span key={idx} className="metric-badge">
                      <i className="fas fa-check"></i> {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="beneficios-impact">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Impacto en Cada Área de tu Empresa</h2>
          <div className="impact-grid">
            {businessImpact.map((area, index) => (
              <div 
                key={index} 
                className="impact-card"
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <div className="impact-icon">
                  <i className={area.icon}></i>
                </div>
                <h3>{area.title}</h3>
                <ul>
                  {area.points.map((point, idx) => (
                    <li key={idx}>
                      <i className="fas fa-arrow-right"></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="beneficios-comparison">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">OPTUS vs Métodos Tradicionales</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            La diferencia es clara. Los números hablan por sí solos.
          </p>

          <div className="comparison-table" data-aos="fade-up" data-aos-delay="200">
            <div className="comparison-header">
              <div className="header-item">Aspecto</div>
              <div className="header-item traditional">Método Tradicional</div>
              <div className="header-item optus">Con OPTUS</div>
              <div className="header-item">Mejora</div>
            </div>
            {comparisonData.map((row, index) => (
              <div key={index} className="comparison-row" data-aos="fade-up" data-aos-delay={300 + (index * 50)}>
                <div className="row-item category">{row.category}</div>
                <div className="row-item traditional">{row.traditional}</div>
                <div className="row-item optus">{row.optus}</div>
                <div className="row-item improvement">
                  <span className="improvement-badge">{row.improvement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="beneficios-roi">
        <div className="container">
          <div className="roi-content">
            <div className="roi-text" data-aos="fade-right">
              <h2>Retorno de Inversión Comprobado</h2>
              <p className="roi-highlight">
                El 95% de nuestros clientes recuperan su inversión en los primeros 3 meses y multiplican su ROI x3 en el primer año.
              </p>
              <ul className="roi-list">
                <li>
                  <i className="fas fa-check-double"></i>
                  <div>
                    <strong>Mes 1-3:</strong> Recuperación de inversión inicial
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-double"></i>
                  <div>
                    <strong>Mes 4-6:</strong> 200% ROI promedio
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-double"></i>
                  <div>
                    <strong>Mes 7-12:</strong> 300%+ ROI con optimizaciones
                  </div>
                </li>
              </ul>
              <div className="roi-cta">
                <a href="#contact" className="btn btn-primary btn-lg">Calcula tu ROI</a>
              </div>
            </div>
            <div className="roi-visual" data-aos="fade-left">
              <div className="roi-chart">
                <div className="chart-bar" style={{ height: '30%' }}>
                  <span className="bar-label">Mes 1</span>
                  <span className="bar-value">-$299</span>
                </div>
                <div className="chart-bar" style={{ height: '50%' }}>
                  <span className="bar-label">Mes 3</span>
                  <span className="bar-value">$0</span>
                </div>
                <div className="chart-bar" style={{ height: '75%' }}>
                  <span className="bar-label">Mes 6</span>
                  <span className="bar-value">+$600</span>
                </div>
                <div className="chart-bar success" style={{ height: '100%' }}>
                  <span className="bar-label">Mes 12</span>
                  <span className="bar-value">+$1,200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="beneficios-cta">
        <div className="container text-center">
          <h2 data-aos="fade-up">Experimenta los Beneficios Hoy Mismo</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            No esperes a que tu competencia te adelante. Comienza tu transformación digital ahora.
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href="#contact" className="btn btn-primary btn-lg">Solicitar Demo Gratuita</a>
            <a href="https://wa.me/59177379190" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Consultar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beneficios;
