import { useTranslation } from 'react-i18next';
import './Privacy.css';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-content">
          <h1>{t('privacy.title')}</h1>
          <p className="last-updated">{t('privacy.lastUpdated')}</p>

          <section className="privacy-section">
            <h2>{t('privacy.sections.introduction.title')}</h2>
            <p>{t('privacy.sections.introduction.content')}</p>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.dataCollection.title')}</h2>
            <p>{t('privacy.sections.dataCollection.description')}</p>
            <ul>
              <li>{t('privacy.sections.dataCollection.types.contact')}</li>
              <li>{t('privacy.sections.dataCollection.types.technical')}</li>
              <li>{t('privacy.sections.dataCollection.types.automation')}</li>
              <li>{t('privacy.sections.dataCollection.types.payment')}</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.dataUsage.title')}</h2>
            <p>{t('privacy.sections.dataUsage.description')}</p>
            <ul>
              {t('privacy.sections.dataUsage.purposes', { returnObjects: true }).map((purpose, index) => (
                <li key={index}>{purpose}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.dataSecurity.title')}</h2>
            <p>{t('privacy.sections.dataSecurity.description')}</p>
            <ul>
              {t('privacy.sections.dataSecurity.measures', { returnObjects: true }).map((measure, index) => (
                <li key={index}>{measure}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.dataSharing.title')}</h2>
            <p>{t('privacy.sections.dataSharing.description')}</p>
            <ul>
              {t('privacy.sections.dataSharing.conditions', { returnObjects: true }).map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.userRights.title')}</h2>
            <p>{t('privacy.sections.userRights.description')}</p>
            <ul>
              {t('privacy.sections.userRights.rights', { returnObjects: true }).map((right, index) => (
                <li key={index}>{right}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.dataRetention.title')}</h2>
            <p>{t('privacy.sections.dataRetention.content')}</p>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.cookies.title')}</h2>
            <p>{t('privacy.sections.cookies.content')}</p>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.policyChanges.title')}</h2>
            <p>{t('privacy.sections.policyChanges.content')}</p>
          </section>

          <section className="privacy-section">
            <h2>{t('privacy.sections.contact.title')}</h2>
            <p>{t('privacy.sections.contact.description')}</p>
            <ul className="contact-info">
              <li>{t('privacy.sections.contact.info.email')}</li>
              <li>{t('privacy.sections.contact.info.phone')}</li>
              <li>{t('privacy.sections.contact.info.address')}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Privacy;