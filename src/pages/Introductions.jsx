import { useTranslation } from 'react-i18next';
import ThemeLanguageToggle from '../components/ui/ThemeLanguageToggle';
import './Introductions.css';

const WHATSAPP_SUPPORT_NUMBER = import.meta.env.VITE_WHATSAPP_SUPPORT || '77379190';
const WA_URL = `https://wa.me/${WHATSAPP_SUPPORT_NUMBER}`;

const SOCIAL_LINKS = [
  { label: 'WhatsApp', href: WA_URL, icon: 'fab fa-whatsapp' },
  { label: 'Facebook', href: 'https://www.facebook.com/optusteam/about', icon: 'fab fa-facebook-f' },
  { label: 'Instagram', href: 'https://www.instagram.com/opt.aut/', icon: 'fab fa-instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/optus-aut/posts/?feedView=all', icon: 'fab fa-linkedin-in' },
  { label: 'X', href: 'https://x.com/OptusAut', icon: 'fab fa-twitter' },
];

export default function Introductions() {
  const { t } = useTranslation();

  return (
    <div className="introductions-page">
      <div className="introductions-toggle">
        <ThemeLanguageToggle />
      </div>

      <header className="introductions-hero">
        <div className="container">
          <h1 className="introductions-title">{t('introductions.title')}</h1>
          <p className="introductions-subtitle">{t('introductions.subtitle')}</p>
          <div className="introductions-cta">
            <a className="btn btn-secondary" href="/servicios">
              <i className="fas fa-list-check"></i>
              {t('introductions.ctaSecondary')}
            </a>
          </div>
        </div>
      </header>

      <section className="introductions-steps">
        <div className="container">
          <div className="introductions-steps-header">
            <h2>{t('introductions.stepsTitle')}</h2>
            <p>{t('introductions.stepsSubtitle')}</p>
          </div>
          <div className="introductions-steps-grid">
            {t('introductions.steps', { returnObjects: true }).map((step, index) => (
              <article key={step.title} className="introductions-step-card">
                <div className="introductions-step-index">{index + 1}</div>
                <div className="introductions-step-icon">
                  <i className={step.icon}></i>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="introductions-video">
        <div className="container">
          <div className="introductions-video-header">
            <h2>{t('introductions.videoTitle')}</h2>
            <p>{t('introductions.videoSubtitle')}</p>
          </div>
          <div className="introductions-video-wrapper">
            <video className="introductions-video-player" controls preload="metadata">
              <source src="/Optus pitch.mp4" type="video/mp4" />
              {t('introductions.videoFallback')}
            </video>
          </div>
          <div className="introductions-socials">
            <p className="introductions-socials-title">{t('introductions.socialTitle')}</p>
            <div className="introductions-socials-icons">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  className="introductions-social-link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="introductions-footer">
        <p>{t('introductions.footer')}</p>
      </footer>
    </div>
  );
}
