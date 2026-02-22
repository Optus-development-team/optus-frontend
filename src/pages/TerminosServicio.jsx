import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import FinisherBackground from '../components/ui/FinisherBackground';
import './TerminosServicio.css';

const TerminosServicio = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="terminos-page">
      <FinisherBackground className="terminos-hero">
        <div className="container">
          <h1 data-aos="fade-up">{t('terms.title')}</h1>
        </div>
      </FinisherBackground>

      <div className="container">
        <div className="terminos-content">
          <section className="terms-section" data-aos="fade-up">
            <h2>
              <i className="fas fa-handshake"></i>
              {t('terms.sections.introduction.title')}
            </h2>
            <p>{t('terms.sections.introduction.content')}</p>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="100">
            <h2>
              <i className="fas fa-cogs"></i>
              {t('terms.sections.serviceDescription.title')}
            </h2>
            <p>{t('terms.sections.serviceDescription.content')}</p>
            <ul>
              {t('terms.sections.serviceDescription.services', { returnObjects: true }).map((service, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{service}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="200">
            <h2>
              <i className="fas fa-user-circle"></i>
              {t('terms.sections.userAccounts.title')}
            </h2>
            <p>{t('terms.sections.userAccounts.content')}</p>
            <ul>
              {t('terms.sections.userAccounts.responsibilities', { returnObjects: true }).map((responsibility, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{responsibility}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="300">
            <h2>
              <i className="fas fa-exclamation-triangle"></i>
              {t('terms.sections.acceptableUse.title')}
            </h2>
            <p>{t('terms.sections.acceptableUse.description')}</p>
            <ul>
              {t('terms.sections.acceptableUse.prohibitions', { returnObjects: true }).map((prohibition, index) => (
                <li key={index}><i className="fas fa-times-circle"></i>{prohibition}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="400">
            <h2>
              <i className="fas fa-copyright"></i>
              {t('terms.sections.intellectualProperty.title')}
            </h2>
            <p>{t('terms.sections.intellectualProperty.content')}</p>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="500">
            <h2>
              <i className="fas fa-shield-alt"></i>
              {t('terms.sections.dataAndPrivacy.title')}
            </h2>
            <p>{t('terms.sections.dataAndPrivacy.content')}</p>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="600">
            <h2>
              <i className="fas fa-credit-card"></i>
              {t('terms.sections.paymentTerms.title')}
            </h2>
            <p>{t('terms.sections.paymentTerms.content')}</p>
            <ul>
              {t('terms.sections.paymentTerms.terms', { returnObjects: true }).map((term, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{term}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="700">
            <h2>
              <i className="fas fa-server"></i>
              {t('terms.sections.serviceAvailability.title')}
            </h2>
            <p>{t('terms.sections.serviceAvailability.content')}</p>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="800">
            <h2>
              <i className="fas fa-times"></i>
              {t('terms.sections.termination.title')}
            </h2>
            <p>{t('terms.sections.termination.description')}</p>
            <ul>
              {t('terms.sections.termination.conditions', { returnObjects: true }).map((condition, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{condition}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="900">
            <h2>
              <i className="fas fa-info-circle"></i>
              {t('terms.sections.disclaimers.title')}
            </h2>
            <p>{t('terms.sections.disclaimers.content')}</p>
          </section>

          <section className="terms-section" data-aos="fade-up" data-aos-delay="1000">
            <h2>
              <i className="fas fa-gavel"></i>
              {t('terms.sections.governingLaw.title')}
            </h2>
            <p>{t('terms.sections.governingLaw.content')}</p>
          </section>

          <section className="terms-section contact-section" data-aos="fade-up" data-aos-delay="1100">
            <h2>
              <i className="fas fa-envelope"></i>
              {t('terms.sections.contact.title')}
            </h2>
            <p>{t('terms.sections.contact.description')}</p>
            <ul className="contact-info">
              <li><i className="fas fa-envelope"></i>{t('terms.sections.contact.info.email')}</li>
              <li><i className="fas fa-phone"></i>{t('terms.sections.contact.info.phone')}</li>
              <li><i className="fas fa-map-marker-alt"></i>{t('terms.sections.contact.info.address')}</li>
            </ul>
            <div className="cta-buttons">
              <a href="mailto:optus.aut@gmail.com" className="btn btn-primary btn-lg">
                <i className="fas fa-envelope"></i>
                {t('terms.sections.contact.buttons.email')}
              </a>
              <a href="https://wa.me/59177379190" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                {t('terms.sections.contact.buttons.whatsapp')}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TerminosServicio;
