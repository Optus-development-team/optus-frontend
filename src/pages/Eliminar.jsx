import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Eliminar.css';

const Eliminar = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    reason: '',
    details: '',
    accountId: '',
    confirmDeletion: false,
    confirmBackup: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailBody = `
${t('delete.title')} - OPTUS

${t('delete.form.fullName.label')} ${formData.fullName}
${t('delete.form.email.label')} ${formData.email}
${t('delete.form.phone.label')} ${formData.phone}
${t('delete.form.company.label')} ${formData.company || t('delete.form.company.placeholder')}
${t('delete.form.accountId.label')} ${formData.accountId || 'No especificado'}
${t('delete.form.reason.label')} ${formData.reason}

${t('delete.form.details.label')}
${formData.details || 'Ninguno'}

---
Esta solicitud fue enviada desde el formulario de eliminaci\u00f3n de informaci\u00f3n de OPTUS.
    `.trim();

    const mailtoLink = `mailto:optus.aut@gmail.com?subject=${encodeURIComponent(t('delete.title') + ' - ' + formData.fullName)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    
    alert(t('delete.form.successMessage'));
  };

  return (
    <div className="eliminar-page">
      <div className="container">
        <div className="eliminar-content">
          <h1>{t('delete.title')}</h1>

          <p className="intro-text">
            {t('delete.intro')}
          </p>

          <div className="alert-warning">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <strong>{t('delete.warning.title')}</strong> {t('delete.warning.content')}
            </div>
          </div>

          <section className="delete-section">
            <h2>{t('delete.dataToDelete.title')}</h2>
            <p>{t('delete.dataToDelete.description')}</p>
            <ul>
              <li><strong>{t('delete.dataToDelete.types.account').split(':')[0]}:</strong> {t('delete.dataToDelete.types.account').split(':')[1]}</li>
              <li><strong>{t('delete.dataToDelete.types.configuration').split(':')[0]}:</strong> {t('delete.dataToDelete.types.configuration').split(':')[1]}</li>
              <li><strong>{t('delete.dataToDelete.types.communications').split(':')[0]}:</strong> {t('delete.dataToDelete.types.communications').split(':')[1]}</li>
              <li><strong>{t('delete.dataToDelete.types.billing').split(':')[0]}:</strong> {t('delete.dataToDelete.types.billing').split(':')[1]}</li>
              <li><strong>{t('delete.dataToDelete.types.usage').split(':')[0]}:</strong> {t('delete.dataToDelete.types.usage').split(':')[1]}</li>
              <li><strong>{t('delete.dataToDelete.types.support').split(':')[0]}:</strong> {t('delete.dataToDelete.types.support').split(':')[1]}</li>
            </ul>
          </section>

          <section className="delete-section">
            <h2>{t('delete.dataToRetain.title')}</h2>
            <p>{t('delete.dataToRetain.description')}</p>
            <ul>
              {t('delete.dataToRetain.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="delete-section">
            <h2>{t('delete.process.title')}</h2>
            <p>{t('delete.process.description')}</p>

            <div className="form-section">
              <h3>{t('delete.process.formTitle')}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">{t('delete.form.fullName.label')}</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder={t('delete.form.fullName.placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('delete.form.email.label')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('delete.form.email.placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t('delete.form.phone.label')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={t('delete.form.phone.placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">{t('delete.form.company.label')}</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('delete.form.company.placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reason">{t('delete.form.reason.label')}</label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('delete.form.reason.placeholder')}</option>
                    <option value="no-use">{t('delete.form.reason.options.no-use')}</option>
                    <option value="privacy">{t('delete.form.reason.options.privacy')}</option>
                    <option value="alternative">{t('delete.form.reason.options.alternative')}</option>
                    <option value="dissatisfaction">{t('delete.form.reason.options.dissatisfaction')}</option>
                    <option value="other">{t('delete.form.reason.options.other')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="details">{t('delete.form.details.label')}</label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder={t('delete.form.details.placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accountId">{t('delete.form.accountId.label')}</label>
                  <input
                    type="text"
                    id="accountId"
                    name="accountId"
                    value={formData.accountId}
                    onChange={handleChange}
                    placeholder={t('delete.form.accountId.placeholder')}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="confirmDeletion"
                    name="confirmDeletion"
                    checked={formData.confirmDeletion}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="confirmDeletion">
                    {t('delete.form.confirmDeletion')}
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="confirmBackup"
                    name="confirmBackup"
                    checked={formData.confirmBackup}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="confirmBackup">
                    {t('delete.form.confirmBackup')}
                  </label>
                </div>

                <div className="form-group submit-group">
                  <button type="submit" className="btn-submit">
                    {t('delete.form.submit')}
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="delete-section">
            <h2>{t('delete.afterSubmission.title')}</h2>
            <ol className="process-list">
              {t('delete.afterSubmission.steps', { returnObjects: true }).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="delete-section">
            <h2>{t('delete.alternatives.title')}</h2>
            <p>{t('delete.alternatives.description')}</p>
            <ul>
              {t('delete.alternatives.options', { returnObjects: true }).map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </section>

          <section className="delete-section">
            <h2>{t('delete.faq.title')}</h2>
            
            {t('delete.faq.questions', { returnObjects: true }).map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>

          <section className="delete-section">
            <h2>{t('delete.contact.title')}</h2>
            <p>{t('delete.contact.description')}</p>
            <ul className="contact-info">
              <li>{t('delete.contact.info.email')}</li>
              <li>{t('delete.contact.info.phone')}</li>
              <li>{t('delete.contact.info.location')}</li>
            </ul>
          </section>

          <div className="note-box">
            <strong>Nota:</strong> {t('delete.note')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eliminar;
