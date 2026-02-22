import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import FinisherBackground from '../components/ui/FinisherBackground';
import './Privacy.css';

const Privacy = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="privacy-page">
      <FinisherBackground className="privacy-hero">
        <div className="container">
          <h1 data-aos="fade-up">{t('privacy.title')}</h1>

        </div>
      </FinisherBackground>

      <div className="container">
        <div className="privacy-content">
          <section className="privacy-section" data-aos="fade-up">
            <h2>
              <i className="fas fa-shield-alt"></i>
              {t('privacy.sections.introduction.title')}
            </h2>
            <p>{t('privacy.sections.introduction.content')}</p>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="100">
            <h2>
              <i className="fas fa-database"></i>
              {t('privacy.sections.dataCollection.title')}
            </h2>
            <p>{t('privacy.sections.dataCollection.description')}</p>
            <ul>
              <li><i className="fas fa-check-circle"></i>{t('privacy.sections.dataCollection.types.contact')}</li>
              <li><i className="fas fa-check-circle"></i>{t('privacy.sections.dataCollection.types.technical')}</li>
              <li><i className="fas fa-check-circle"></i>{t('privacy.sections.dataCollection.types.automation')}</li>
              <li><i className="fas fa-check-circle"></i>{t('privacy.sections.dataCollection.types.payment')}</li>
            </ul>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="200">
            <h2>
              <i className="fas fa-tasks"></i>
              {t('privacy.sections.dataUsage.title')}
            </h2>
            <p>{t('privacy.sections.dataUsage.description')}</p>
            <ul>
              {t('privacy.sections.dataUsage.purposes', { returnObjects: true }).map((purpose, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{purpose}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="300">
            <h2>
              <i className="fas fa-lock"></i>
              {t('privacy.sections.dataSecurity.title')}
            </h2>
            <p>{t('privacy.sections.dataSecurity.description')}</p>
            <ul>
              {t('privacy.sections.dataSecurity.measures', { returnObjects: true }).map((measure, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{measure}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="400">
            <h2>
              <i className="fas fa-share-alt"></i>
              {t('privacy.sections.dataSharing.title')}
            </h2>
            <p>{t('privacy.sections.dataSharing.description')}</p>
            <ul>
              {t('privacy.sections.dataSharing.conditions', { returnObjects: true }).map((condition, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{condition}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="500">
            <h2>
              <i className="fas fa-user-shield"></i>
              {t('privacy.sections.userRights.title')}
            </h2>
            <p>{t('privacy.sections.userRights.description')}</p>
            <ul>
              {t('privacy.sections.userRights.rights', { returnObjects: true }).map((right, index) => (
                <li key={index}><i className="fas fa-check-circle"></i>{right}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="600">
            <h2>
              <i className="fas fa-calendar-alt"></i>
              {t('privacy.sections.dataRetention.title')}
            </h2>
            <p>{t('privacy.sections.dataRetention.content')}</p>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="700">
            <h2>
              <i className="fas fa-cookie-bite"></i>
              {t('privacy.sections.cookies.title')}
            </h2>
            <p>{t('privacy.sections.cookies.content')}</p>
          </section>

          <section className="privacy-section" data-aos="fade-up" data-aos-delay="800">
            <h2>
              <i className="fas fa-edit"></i>
              {t('privacy.sections.policyChanges.title')}
            </h2>
            <p>{t('privacy.sections.policyChanges.content')}</p>
          </section>

          <section className="privacy-section contact-section" data-aos="fade-up" data-aos-delay="900">
            <h2>
              <i className="fas fa-envelope"></i>
              {t('privacy.sections.contact.title')}
            </h2>
            <p>{t('privacy.sections.contact.description')}</p>
            <ul className="contact-info">
              <li><i className="fas fa-envelope"></i>{t('privacy.sections.contact.info.email')}</li>
              <li><i className="fas fa-phone"></i>{t('privacy.sections.contact.info.phone')}</li>
              <li><i className="fas fa-map-marker-alt"></i>{t('privacy.sections.contact.info.address')}</li>
            </ul>
            <div className="cta-buttons">
              <a href="mailto:optus.aut@gmail.com" className="btn btn-primary btn-lg">
                <i className="fas fa-envelope"></i>
                {t('privacy.sections.contact.buttons.email')}
              </a>
              <a href="https://wa.me/59177379190" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                {t('privacy.sections.contact.buttons.whatsapp')}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Privacy;