import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import './FAQ.css';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: t('faq.questions.q1.question'),
      answer: t('faq.questions.q1.answer')
    },
    {
      question: t('faq.questions.q2.question'),
      answer: t('faq.questions.q2.answer')
    },
    {
      question: t('faq.questions.q3.question'),
      answer: t('faq.questions.q3.answer')
    },
    {
      question: t('faq.questions.q4.question'),
      answer: t('faq.questions.q4.answer')
    }
  ];

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <h1>{t('faq.hero.title')}</h1>
            <p className="hero-subtitle">{t('faq.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="container">
          <div className="faq-intro" data-aos="fade-up">
            <h2>{t('faq.content.title')}</h2>
            <p>{t('faq.content.description')}</p>
          </div>

          <div className="faq-accordion" data-aos="fade-up" data-aos-delay="200">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
              >
                <button 
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="question-text">{item.question}</span>
                  <span className="accordion-icon">
                    <i className={`fas ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
                  </span>
                </button>
                <div className={`accordion-content ${activeIndex === index ? 'show' : ''}`}>
                  <div className="accordion-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="faq-cta" data-aos="fade-up" data-aos-delay="400">
            <div className="cta-card">
              <div className="cta-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>{t('faq.cta.title')}</h3>
              <p>{t('faq.cta.description')}</p>
              <div className="cta-buttons">
                <a 
                  href={`https://wa.me/59177379190?text=${encodeURIComponent(t('faq.cta.whatsappMessage'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  <i className="fab fa-whatsapp"></i>
                  {t('faq.cta.whatsapp')}
                </a>
                <a 
                  href="mailto:optus.aut@gmail.com"
                  className="btn btn-primary btn-lg"
                >
                  <i className="fas fa-envelope"></i>
                  {t('faq.cta.email')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
