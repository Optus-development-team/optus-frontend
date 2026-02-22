import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import FinisherBackground from '../components/ui/FinisherBackground';
import './Beneficios.css';

const Beneficios = () => {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.refresh();
  }, []);

  const mainBenefits = [
    {
      id: 1,
      icon: 'fas fa-bolt',
      key: 'productivity'
    },
    {
      id: 2,
      icon: 'fas fa-hand-holding-usd',
      key: 'costReduction'
    },
    {
      id: 3,
      icon: 'fas fa-rocket',
      key: 'scalability'
    },
    {
      id: 4,
      icon: 'fas fa-lightbulb',
      key: 'innovation'
    },
    {
      id: 5,
      icon: 'fas fa-clock',
      key: 'availability'
    },
    {
      id: 6,
      icon: 'fas fa-code',
      key: 'noCode'
    }
  ];

  const businessImpact = [
    {
      icon: 'fas fa-users-cog',
      key: 'team'
    },
    {
      icon: 'fas fa-user-check',
      key: 'customers'
    },
    {
      icon: 'fas fa-chart-line',
      key: 'business'
    }
  ];

  const comparisonData = [
    { key: 'responseTime' },
    { key: 'monthlyCost' },
    { key: 'availability' },
    { key: 'capacity' },
    { key: 'errorRate' }
  ];

  return (
    <div className="beneficios-page">
      <FinisherBackground className="beneficios-hero">
        <div className="container">
          <h1 data-aos="fade-up">{t('benefits.hero.title')}</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            {t('benefits.hero.subtitle')}
          </p>
        </div>
      </FinisherBackground>

      <section className="beneficios-main">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">{t('benefits.sections.whyOptus')}</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            {t('benefits.sections.whyOptusSubtitle')}
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
                <h3>{t(`benefits.mainBenefits.${benefit.key}.title`)}</h3>
                <p>{t(`benefits.mainBenefits.${benefit.key}.description`)}</p>
                <div className="benefit-metrics">
                  {t(`benefits.mainBenefits.${benefit.key}.metrics`, { returnObjects: true }).map((metric, idx) => (
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
          <h2 className="section-title text-center" data-aos="fade-up">{t('benefits.sections.businessImpact')}</h2>
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
                <h3>{t(`benefits.impact.${area.key}.title`)}</h3>
                <ul>
                  {t(`benefits.impact.${area.key}.points`, { returnObjects: true }).map((point, idx) => (
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
          <h2 className="section-title text-center" data-aos="fade-up">{t('benefits.sections.comparison')}</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            {t('benefits.sections.comparisonSubtitle')}
          </p>

          <div className="comparison-table" data-aos="fade-up" data-aos-delay="200">
            <div className="comparison-header">
              <div className="header-item">{t('benefits.comparison.headers.aspect')}</div>
              <div className="header-item traditional">{t('benefits.comparison.headers.traditional')}</div>
              <div className="header-item optus">{t('benefits.comparison.headers.optus')}</div>
              <div className="header-item">{t('benefits.comparison.headers.improvement')}</div>
            </div>
            {comparisonData.map((row, index) => (
              <div key={index} className="comparison-row" data-aos="fade-up" data-aos-delay={300 + (index * 50)}>
                <div className="row-item category">{t(`benefits.comparison.data.${row.key}.category`)}</div>
                <div className="row-item traditional">{t(`benefits.comparison.data.${row.key}.traditional`)}</div>
                <div className="row-item optus">{t(`benefits.comparison.data.${row.key}.optus`)}</div>
                <div className="row-item improvement">
                  <span className="improvement-badge">{t(`benefits.comparison.data.${row.key}.improvement`)}</span>
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
              <h2>{t('benefits.roi.title')}</h2>
              <p className="roi-highlight">
                {t('benefits.roi.subtitle')}
              </p>
              <ul className="roi-list">
                <li>
                  <i className="fas fa-check-double"></i>
                  <div>
                    <strong>{t('benefits.roi.timeline.month13.label')}</strong> {t('benefits.roi.timeline.month13.description')}
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-double"></i>
                  <div>
                    <strong>{t('benefits.roi.timeline.month46.label')}</strong> {t('benefits.roi.timeline.month46.description')}
                  </div>
                </li>
                <li>
                  <i className="fas fa-check-double"></i>
                  <div>
                    <strong>{t('benefits.roi.timeline.month712.label')}</strong> {t('benefits.roi.timeline.month712.description')}
                  </div>
                </li>
              </ul>
              <div className="roi-cta">
                <a href="#contact" className="btn btn-primary btn-lg">{t('benefits.roi.cta')}</a>
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
          <h2 data-aos="fade-up">{t('benefits.title')}</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            {t('benefits.subtitle')}
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href="#contact" className="btn btn-primary btn-lg">{t('benefits.ctaPrimary')}</a>
            <a href="https://wa.me/59177379190" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> {t('benefits.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beneficios;
