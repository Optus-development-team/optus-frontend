import { useState } from 'react';
import './Eliminar.css';

const Eliminar = () => {
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
Solicitud de Eliminación de Información - OPTUS

Nombre: ${formData.fullName}
Email: ${formData.email}
Teléfono: ${formData.phone}
Empresa: ${formData.company || 'No especificada'}
ID de Cuenta: ${formData.accountId || 'No especificado'}
Motivo: ${formData.reason}

Detalles adicionales:
${formData.details || 'Ninguno'}

---
Esta solicitud fue enviada desde el formulario de eliminación de información de OPTUS.
    `.trim();

    const mailtoLink = `mailto:optus.aut@gmail.com?subject=${encodeURIComponent('Solicitud de Eliminación de Información - ' + formData.fullName)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    
    alert('Se abrirá tu cliente de correo electrónico para enviar la solicitud. Por favor, envía el correo para completar tu solicitud de eliminación.');
  };

  return (
    <div className="eliminar-page">
      <div className="container">
        <div className="eliminar-content">
          <h1>Solicitud de Eliminación de Información</h1>

          <p className="intro-text">
            En <strong>OPTUS</strong>, respetamos tu derecho a la privacidad y al control de tus datos personales. 
            Esta página te permite solicitar la eliminación completa de tu información personal de nuestros sistemas.
          </p>

          <div className="alert-warning">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <strong>Advertencia:</strong> La eliminación de tus datos es permanente e irreversible. Una vez procesada 
              tu solicitud, no podremos recuperar tu información, historial de conversaciones, configuraciones o 
              cualquier dato asociado a tu cuenta.
            </div>
          </div>

          <section className="delete-section">
            <h2>¿Qué Información se Eliminará?</h2>
            <p>Al solicitar la eliminación de tu información, se eliminarán los siguientes datos:</p>
            <ul>
              <li><strong>Datos de cuenta:</strong> Nombre, correo electrónico, teléfono, información de empresa.</li>
              <li><strong>Datos de configuración:</strong> Flujos de trabajo, agentes de IA personalizados, integraciones.</li>
              <li><strong>Historial de comunicaciones:</strong> Mensajes de WhatsApp y otros canales almacenados.</li>
              <li><strong>Datos de facturación:</strong> Información de pago e historial de transacciones.</li>
              <li><strong>Datos de uso:</strong> Logs de actividad, métricas y análisis asociados a tu cuenta.</li>
              <li><strong>Datos de soporte:</strong> Tickets, conversaciones y documentación relacionada.</li>
            </ul>
          </section>

          <section className="delete-section">
            <h2>Información que Podemos Retener</h2>
            <p>Por razones legales, contables o de seguridad, podemos retener cierta información:</p>
            <ul>
              <li>Datos requeridos por obligaciones legales o fiscales (hasta 7 años).</li>
              <li>Información necesaria para resolver disputas o hacer cumplir acuerdos.</li>
              <li>Datos anonimizados o agregados que no te identifican personalmente.</li>
              <li>Copias de seguridad que se eliminarán automáticamente según nuestro ciclo de rotación.</li>
            </ul>
          </section>

          <section className="delete-section">
            <h2>Proceso de Eliminación</h2>
            <p>Para solicitar la eliminación de tu información, completa el formulario a continuación:</p>

            <div className="form-section">
              <h3>📝 Formulario de Solicitud</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Nombre Completo *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico Registrado *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Número de Teléfono *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+591 12345678"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Nombre de Empresa (opcional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Tu empresa"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reason">Motivo de la Solicitud *</label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un motivo</option>
                    <option value="no-uso">Ya no utilizo el servicio</option>
                    <option value="privacidad">Preocupaciones de privacidad</option>
                    <option value="alternativa">Cambié a otra plataforma</option>
                    <option value="insatisfaccion">Insatisfacción con el servicio</option>
                    <option value="otro">Otro motivo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="details">Detalles Adicionales (opcional)</label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Proporciona cualquier información adicional que consideres relevante..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accountId">ID de Cuenta o Usuario (si lo conoces)</label>
                  <input
                    type="text"
                    id="accountId"
                    name="accountId"
                    value={formData.accountId}
                    onChange={handleChange}
                    placeholder="ID de cuenta"
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
                    Confirmo que entiendo que esta acción es permanente e irreversible, y que todos mis datos 
                    serán eliminados de los sistemas de OPTUS.
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
                    Entiendo que OPTUS puede retener cierta información por obligaciones legales y que las copias 
                    de seguridad se eliminarán según el ciclo de rotación estándar.
                  </label>
                </div>

                <div className="form-group submit-group">
                  <button type="submit" className="btn-submit">
                    📤 Enviar Solicitud de Eliminación
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="delete-section">
            <h2>¿Qué Sucede Después de Enviar la Solicitud?</h2>
            <ol className="process-list">
              <li><strong>Verificación de Identidad:</strong> Recibirás un correo electrónico de confirmación para verificar tu identidad y la autenticidad de la solicitud.</li>
              <li><strong>Revisión:</strong> Nuestro equipo revisará tu solicitud en un plazo de 5 días hábiles.</li>
              <li><strong>Confirmación Final:</strong> Te enviaremos una confirmación final antes de proceder con la eliminación.</li>
              <li><strong>Procesamiento:</strong> Una vez confirmada, eliminaremos tu información en un plazo de 30 días.</li>
              <li><strong>Notificación de Completitud:</strong> Recibirás una notificación cuando el proceso haya finalizado.</li>
            </ol>
          </section>

          <section className="delete-section">
            <h2>Alternativas a la Eliminación Total</h2>
            <p>Si no estás seguro de querer eliminar completamente tu información, considera estas alternativas:</p>
            <ul>
              <li><strong>Desactivación de cuenta:</strong> Puedes desactivar tu cuenta temporalmente sin eliminar datos.</li>
              <li><strong>Eliminación selectiva:</strong> Puedes solicitar eliminar solo ciertos tipos de datos.</li>
              <li><strong>Exportación de datos:</strong> Descarga una copia de tu información antes de eliminarla.</li>
              <li><strong>Cancelación de suscripción:</strong> Cancela tu plan sin eliminar tu cuenta.</li>
            </ul>
          </section>

          <section className="delete-section">
            <h2>Preguntas Frecuentes</h2>
            
            <div className="faq-item">
              <h3>¿Cuánto tiempo toma procesar la solicitud?</h3>
              <p>El proceso completo toma entre 5 y 30 días hábiles desde la verificación de identidad hasta la eliminación completa.</p>
            </div>

            <div className="faq-item">
              <h3>¿Puedo recuperar mi cuenta después de eliminarla?</h3>
              <p>No. La eliminación es permanente y no podemos recuperar cuentas o datos eliminados.</p>
            </div>

            <div className="faq-item">
              <h3>¿Qué pasa con mis suscripciones activas?</h3>
              <p>Tu suscripción se cancelará automáticamente. No se procesarán más cargos después de la eliminación.</p>
            </div>

            <div className="faq-item">
              <h3>¿Mis clientes también perderán acceso a sus datos?</h3>
              <p>Sí. Si tu cuenta se elimina, tus clientes ya no podrán interactuar con tus agentes de IA ni acceder a los servicios que proporcionabas.</p>
            </div>
          </section>

          <section className="delete-section">
            <h2>Contacto</h2>
            <p>Si tienes preguntas sobre el proceso de eliminación o necesitas asistencia:</p>
            <ul className="contact-info">
              <li><strong>Email:</strong> optus.aut@gmail.com</li>
              <li><strong>Teléfono:</strong> +591 77379190</li>
              <li><strong>Ubicación:</strong> La Paz, Bolivia</li>
            </ul>
          </section>

          <div className="note-box">
            <strong>Nota:</strong> Si solo deseas actualizar tu información o hacer cambios en tu cuenta, no es necesario 
            eliminarla. Puedes gestionar tus datos desde la configuración de tu cuenta o contactarnos para asistencia.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eliminar;
