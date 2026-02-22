import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import Navbar from '../components/layout/Navbar';
import FinisherBackground from '../components/ui/FinisherBackground';
import './Portafolio.css';

const Portafolio = () => {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.refresh();
  }, []);

  const portfolioItems = [
    {
      id: 1,
      key: 'retail',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 2,
      key: 'agency',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 3,
      key: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 4,
      key: 'medical',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 5,
      key: 'restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 6,
      key: 'realEstate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="portafolio-page">
      <FinisherBackground className="portafolio-hero">
        <div className="container">
          <h1 data-aos="fade-up">{t('portfolio.hero.title')}</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            {t('portfolio.hero.subtitle')}
          </p>
        </div>
      </FinisherBackground>

      <section className="portafolio-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="stat-number">50+</div>
              <div className="stat-label">{t('portfolio.stats.companies')}</div>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="stat-number">80%</div>
              <div className="stat-label">{t('portfolio.stats.costReduction')}</div>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="stat-number">300%</div>
              <div className="stat-label">{t('portfolio.stats.averageROI')}</div>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="400">
              <div className="stat-number">7 días</div>
              <div className="stat-label">{t('portfolio.stats.implementation')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="portafolio-casos">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">{t('portfolio.sections.stories')}</h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            {t('portfolio.sections.storiesSubtitle')}
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
                  <img src={item.image} alt={t(`portfolio.cases.${item.key}.title`)} />
                  <div className="caso-tag">{t(`portfolio.cases.${item.key}.tag`)}</div>
                </div>
                <div className="caso-content">
                  <div className="caso-header">
                    <h3>{t(`portfolio.cases.${item.key}.title`)}</h3>
                    <div className="caso-meta">
                      <span className="company">{t(`portfolio.cases.${item.key}.company`)}</span>
                      <span className="industry">{t(`portfolio.cases.${item.key}.industry`)}</span>
                    </div>
                  </div>
                  <p className="caso-description">{t(`portfolio.cases.${item.key}.description`)}</p>
                  <div className="caso-results">
                    <h4>{t('portfolio.sections.keyResults')}</h4>
                    <ul>
                      {t(`portfolio.cases.${item.key}.results`, { returnObjects: true }).map((result, idx) => (
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
          <h2 className="section-title text-center" data-aos="fade-up">{t('portfolio.sections.industries')}</h2>
          <div className="industries-grid">
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="100">
              <i className="fas fa-shopping-bag"></i>
              <h3>{t('portfolio.industries.retail.title')}</h3>
              <p>{t('portfolio.industries.retail.description')}</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="200">
              <i className="fas fa-heartbeat"></i>
              <h3>{t('portfolio.industries.healthcare.title')}</h3>
              <p>{t('portfolio.industries.healthcare.description')}</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="300">
              <i className="fas fa-utensils"></i>
              <h3>{t('portfolio.industries.gastronomy.title')}</h3>
              <p>{t('portfolio.industries.gastronomy.description')}</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="400">
              <i className="fas fa-building"></i>
              <h3>{t('portfolio.industries.realEstate.title')}</h3>
              <p>{t('portfolio.industries.realEstate.description')}</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="500">
              <i className="fas fa-graduation-cap"></i>
              <h3>{t('portfolio.industries.education.title')}</h3>
              <p>{t('portfolio.industries.education.description')}</p>
            </div>
            <div className="industry-item" data-aos="zoom-in" data-aos-delay="600">
              <i className="fas fa-briefcase"></i>
              <h3>{t('portfolio.industries.professional.title')}</h3>
              <p>{t('portfolio.industries.professional.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portafolio-cta">
        <div className="container text-center">
          <h2 data-aos="fade-up">{t('portfolio.cta.title')}</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            {t('portfolio.cta.subtitle')}
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href="#contact" className="btn btn-primary btn-lg">{t('portfolio.cta.primary')}</a>
            <a href="https://wa.me/59177379190" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> {t('portfolio.cta.secondary')}
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Portafolio;
