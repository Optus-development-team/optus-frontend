import { useTranslation } from 'react-i18next';
import './TerminosServicio.css';

const TerminosServicio = () => {
  const { t } = useTranslation();

  return (
    <div className="terminos-page">
      <div className="container">
        
        <div className="terminos-content">
          <h1>{t('terms.title')}</h1>
          <p className="last-updated">{t('terms.lastUpdated')}</p>

          <section className="terms-section">
            <h2>{t('terms.sections.introduction.title')}</h2>
            <p>{t('terms.sections.introduction.content')}</p>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.serviceDescription.title')}</h2>
            <p>{t('terms.sections.serviceDescription.content')}</p>
            <ul>
              {t('terms.sections.serviceDescription.services', { returnObjects: true }).map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.userAccounts.title')}</h2>
            <p>{t('terms.sections.userAccounts.content')}</p>
            <ul>
              {t('terms.sections.userAccounts.responsibilities', { returnObjects: true }).map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.acceptableUse.title')}</h2>
            <p>{t('terms.sections.acceptableUse.description')}</p>
            <ul>
              {t('terms.sections.acceptableUse.prohibitions', { returnObjects: true }).map((prohibition, index) => (
                <li key={index}>{prohibition}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.intellectualProperty.title')}</h2>
            <p>{t('terms.sections.intellectualProperty.content')}</p>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.dataAndPrivacy.title')}</h2>
            <p>{t('terms.sections.dataAndPrivacy.content')}</p>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.paymentTerms.title')}</h2>
            <p>{t('terms.sections.paymentTerms.content')}</p>
            <ul>
              {t('terms.sections.paymentTerms.terms', { returnObjects: true }).map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.serviceAvailability.title')}</h2>
            <p>{t('terms.sections.serviceAvailability.content')}</p>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.termination.title')}</h2>
            <p>{t('terms.sections.termination.description')}</p>
            <ul>
              {t('terms.sections.termination.conditions', { returnObjects: true }).map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.disclaimers.title')}</h2>
            <p>{t('terms.sections.disclaimers.content')}</p>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.governingLaw.title')}</h2>
            <p>{t('terms.sections.governingLaw.content')}</p>
          </section>

          <section className="terms-section">
            <h2>{t('terms.sections.contact.title')}</h2>
            <p>{t('terms.sections.contact.description')}</p>
            <ul className="contact-info">
              <li>{t('terms.sections.contact.info.email')}</li>
              <li>{t('terms.sections.contact.info.phone')}</li>
              <li>{t('terms.sections.contact.info.address')}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TerminosServicio;
