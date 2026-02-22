import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import Navbar from '../components/layout/Navbar';
import FinisherBackground from '../components/ui/FinisherBackground';
import './Servicios.css';

const Servicios = () => {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.refresh();
  }, []);

  const serviciosDetallados = [
    {
      id: 1,
      icon: 'fas fa-cogs',
      key: 'automation'
    },
    {
      id: 2,
      icon: 'fas fa-brain',
      key: 'aiAgents'
    },
    {
      id: 3,
      icon: 'fas fa-network-wired',
      key: 'systemsIntegration'
    },
    {
      id: 4,
      icon: 'fas fa-chart-line',
      key: 'agileConsulting'
    },
    {
      id: 5,
      icon: 'fas fa-comments',
      key: 'multichannel'
    },
    {
      id: 6,
      icon: 'fas fa-calendar-check',
      key: 'scheduling'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="servicios-page">
      <FinisherBackground className="servicios-hero">
        <div className="container">
          <h1 data-aos="fade-up">{t('services.hero.title')}</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            {t('services.hero.subtitle')}
          </p>
        </div>
      </FinisherBackground>

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
                  <h2>{t(`services.detailed.${servicio.key}.title`)}</h2>
                  <p className="subtitle">{t(`services.detailed.${servicio.key}.subtitle`)}</p>
                </div>
              </div>
              <p className="servicio-description">{t(`services.detailed.${servicio.key}.description`)}</p>
              <div className="servicio-features">
                <h4>{t('services.common.features')}</h4>
                <ul>
                  {t(`services.detailed.${servicio.key}.features`, { returnObjects: true }).map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="servicio-caso">
                <i className="fas fa-star"></i>
                <span><strong>{t('services.common.successCase')}</strong> {t(`services.detailed.${servicio.key}.successCase`)}</span>
              </div>
              <div className="servicio-cta">
                <a href="#contact" className="btn btn-primary">{t('services.common.requestDemo')}</a>
                <a href="https://wa.me/59177379190" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> {t('services.common.consultWhatsApp')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="servicios-proceso">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">{t('services.process.title')}</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            {t('services.process.subtitle')}
          </p>
          <div className="proceso-timeline">
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="200">
              <div className="step-number">1</div>
              <h3>{t('services.process.steps.consultation.title')}</h3>
              <p>{t('services.process.steps.consultation.description')}</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="300">
              <div className="step-number">2</div>
              <h3>{t('services.process.steps.proposal.title')}</h3>
              <p>{t('services.process.steps.proposal.description')}</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="400">
              <div className="step-number">3</div>
              <h3>{t('services.process.steps.setup.title')}</h3>
              <p>{t('services.process.steps.setup.description')}</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="500">
              <div className="step-number">4</div>
              <h3>{t('services.process.steps.training.title')}</h3>
              <p>{t('services.process.steps.training.description')}</p>
            </div>
            <div className="proceso-step" data-aos="fade-right" data-aos-delay="600">
              <div className="step-number">5</div>
              <h3>{t('services.process.steps.launch.title')}</h3>
              <p>{t('services.process.steps.launch.description')}</p>
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
          <h2 data-aos="fade-up">{t('services.title')}</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            {t('services.subtitle')}
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href="#contact" className="btn btn-primary btn-lg">{t('services.ctaPrimary')}</a>
            <a href="https://wa.me/59177379190" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> {t('services.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Servicios;
