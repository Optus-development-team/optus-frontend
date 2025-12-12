import { useState } from 'react';
import './CompanyModal.css';

const CompanyModal = ({ isOpen, onClose, onSubmit, userEmail, userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp_display_phone_number: '',
    whatsapp_admin_phone_ids: '',
    // Profile
    agent_name: '',
    persona_description: '',
    tone: 'Amigable, entusiasta',
    language: 'es-BO',
    // Business Info
    industry: '',
    address: '',
    google_maps_link: '',
    value_proposition: '',
    contact_phone: '',
    contact_email: userEmail || '',
    // Operational Rules
    opening_hours_monday_friday: '09:00 - 19:00',
    opening_hours_saturday: '10:00 - 14:00',
    opening_hours_sunday: 'Cerrado',
    // Sales Policy
    delivery_cost: '',
    refund_policy: '',
    stock_behavior: '',
    payment_methods: 'QR, Efectivo',
    // Appointment Policy
    service_name: 'Soporte Técnico',
    slot_duration_minutes: '30',
    max_advance_booking_days: '14',
    buffer_between_appointments_minutes: '15',
    cancellation_rule: 'El cliente puede cancelar hasta 2 horas antes.'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación básica
    if (!formData.name || !formData.industry) {
      setError('Por favor completa los campos obligatorios');
      setLoading(false);
      return;
    }

    try {
      // Formatear datos según estructura de Supabase
      const companyPayload = {
        name: formData.name,
        whatsapp_phone_id: formData.whatsapp_display_phone_number || `temp_${Date.now()}`,
        whatsapp_display_phone_number: formData.whatsapp_display_phone_number || '',
        whatsapp_admin_phone_ids: formData.whatsapp_admin_phone_ids 
          ? formData.whatsapp_admin_phone_ids.split(',').map(p => p.trim()) 
          : [],
        config: {
          profile: {
            tone: formData.tone,
            language: formData.language,
            agent_name: formData.agent_name,
            persona_description: formData.persona_description
          },
          security: {
            require_2fa_for_admin_actions: false
          },
          sales_policy: {
            delivery_cost: formData.delivery_cost,
            refund_policy: formData.refund_policy,
            stock_behavior: formData.stock_behavior,
            accepted_payment_methods: formData.payment_methods.split(',').map(m => m.trim())
          },
          business_info: {
            address: formData.address,
            industry: formData.industry,
            google_maps_link: formData.google_maps_link,
            value_proposition: formData.value_proposition,
            contact_email: formData.contact_email,
            user_id: userId
          },
          operational_rules: {
            contact_phone: formData.contact_phone,
            opening_hours: {
              sunday: formData.opening_hours_sunday,
              saturday: formData.opening_hours_saturday,
              monday_friday: formData.opening_hours_monday_friday
            }
          },
          appointment_policy: {
            service_name: formData.service_name,
            cancellation_rule: formData.cancellation_rule,
            slot_duration_minutes: parseInt(formData.slot_duration_minutes),
            max_advance_booking_days: parseInt(formData.max_advance_booking_days),
            buffer_between_appointments_minutes: parseInt(formData.buffer_between_appointments_minutes)
          }
        }
      };

      await onSubmit(companyPayload);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al registrar la empresa');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="company-modal-overlay" onClick={onClose}>
      <div className="company-modal" onClick={(e) => e.stopPropagation()}>
        <div className="company-modal-header">
          <h2>🏢 Registra tu Empresa</h2>
          <p>Completa la configuración de tu negocio</p>
        </div>

        <form className="company-form" onSubmit={handleSubmit}>
          {error && <div className="company-form-error">{error}</div>}

          {/* Información Básica */}
          <div className="company-form-section">
            <h3>📋 Información Básica</h3>
            
            <div className="company-form-group">
              <label htmlFor="name">
                Nombre de la Empresa <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Tech Store Bolivia"
                required
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="industry">
                Industria <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Ej: Tecnología y Accesorios"
                required
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="value_proposition">
                Propuesta de Valor
              </label>
              <input
                type="text"
                id="value_proposition"
                name="value_proposition"
                value={formData.value_proposition}
                onChange={handleChange}
                placeholder="Ej: Garantía real en Bolivia y entrega rápida"
              />
            </div>
          </div>

          {/* WhatsApp Configuration */}
          <div className="company-form-section">
            <h3>📱 Configuración de WhatsApp</h3>
            
            <div className="company-form-group">
              <label htmlFor="whatsapp_display_phone_number">
                Número de WhatsApp a Mostrar
              </label>
              <input
                type="text"
                id="whatsapp_display_phone_number"
                name="whatsapp_display_phone_number"
                value={formData.whatsapp_display_phone_number}
                onChange={handleChange}
                placeholder="Ej: +591 77242197"
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="whatsapp_admin_phone_ids">
                IDs de Admin de WhatsApp (separados por coma)
              </label>
              <input
                type="text"
                id="whatsapp_admin_phone_ids"
                name="whatsapp_admin_phone_ids"
                value={formData.whatsapp_admin_phone_ids}
                onChange={handleChange}
                placeholder="Ej: 59177242197, 59188888888"
              />
            </div>
          </div>

          {/* Perfil del Agente */}
          <div className="company-form-section">
            <h3>🤖 Perfil del Agente IA</h3>
            
            <div className="company-form-group">
              <label htmlFor="agent_name">
                Nombre del Agente
              </label>
              <input
                type="text"
                id="agent_name"
                name="agent_name"
                value={formData.agent_name}
                onChange={handleChange}
                placeholder="Ej: Tico"
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="tone">
                Tono de Comunicación
              </label>
              <input
                type="text"
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                placeholder="Ej: Amigable, entusiasta, usa emojis"
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="persona_description">
                Descripción de Personalidad
              </label>
              <textarea
                id="persona_description"
                name="persona_description"
                value={formData.persona_description}
                onChange={handleChange}
                placeholder="Ej: Experto en tecnología apasionado por los gadgets..."
              />
            </div>

            <div className="company-form-row">
              <div className="company-form-group">
                <label htmlFor="language">
                  Idioma
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="es-BO">Español (Bolivia)</option>
                  <option value="es-PE">Español (Perú)</option>
                  <option value="es-CL">Español (Chile)</option>
                  <option value="es-AR">Español (Argentina)</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="company-form-section">
            <h3>📍 Información de Contacto</h3>
            
            <div className="company-form-group">
              <label htmlFor="address">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej: Av. Montenegro, Edificio Torre Azul, Piso 2"
              />
            </div>

            <div className="company-form-row">
              <div className="company-form-group">
                <label htmlFor="contact_phone">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  placeholder="Ej: +591 77242197"
                />
              </div>

              <div className="company-form-group">
                <label htmlFor="contact_email">
                  Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  placeholder="contacto@empresa.com"
                />
              </div>
            </div>

            <div className="company-form-group">
              <label htmlFor="google_maps_link">
                Link de Google Maps
              </label>
              <input
                type="url"
                id="google_maps_link"
                name="google_maps_link"
                value={formData.google_maps_link}
                onChange={handleChange}
                placeholder="https://maps.app.goo.gl/ejemplo"
              />
            </div>
          </div>

          {/* Horarios */}
          <div className="company-form-section">
            <h3>🕐 Horarios de Atención</h3>
            
            <div className="company-form-group">
              <label htmlFor="opening_hours_monday_friday">
                Lunes a Viernes
              </label>
              <input
                type="text"
                id="opening_hours_monday_friday"
                name="opening_hours_monday_friday"
                value={formData.opening_hours_monday_friday}
                onChange={handleChange}
                placeholder="09:00 - 19:00"
              />
            </div>

            <div className="company-form-row">
              <div className="company-form-group">
                <label htmlFor="opening_hours_saturday">
                  Sábado
                </label>
                <input
                  type="text"
                  id="opening_hours_saturday"
                  name="opening_hours_saturday"
                  value={formData.opening_hours_saturday}
                  onChange={handleChange}
                  placeholder="10:00 - 14:00"
                />
              </div>

              <div className="company-form-group">
                <label htmlFor="opening_hours_sunday">
                  Domingo
                </label>
                <input
                  type="text"
                  id="opening_hours_sunday"
                  name="opening_hours_sunday"
                  value={formData.opening_hours_sunday}
                  onChange={handleChange}
                  placeholder="Cerrado"
                />
              </div>
            </div>
          </div>

          {/* Políticas de Venta */}
          <div className="company-form-section">
            <h3>💰 Políticas de Venta</h3>
            
            <div className="company-form-group">
              <label htmlFor="delivery_cost">
                Costo de Delivery
              </label>
              <input
                type="text"
                id="delivery_cost"
                name="delivery_cost"
                value={formData.delivery_cost}
                onChange={handleChange}
                placeholder="Ej: 20 Bs tarifa plana en La Paz"
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="refund_policy">
                Política de Devoluciones
              </label>
              <textarea
                id="refund_policy"
                name="refund_policy"
                value={formData.refund_policy}
                onChange={handleChange}
                placeholder="Ej: Solo cambios por defecto de fábrica dentro de 72 horas"
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="stock_behavior">
                Comportamiento sin Stock
              </label>
              <input
                type="text"
                id="stock_behavior"
                name="stock_behavior"
                value={formData.stock_behavior}
                onChange={handleChange}
                placeholder="Ej: Ofrecer modelo superior más cercano"
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="payment_methods">
                Métodos de Pago Aceptados
              </label>
              <input
                type="text"
                id="payment_methods"
                name="payment_methods"
                value={formData.payment_methods}
                onChange={handleChange}
                placeholder="Ej: QR, Efectivo, Tarjeta"
              />
              <small>Separados por coma</small>
            </div>
          </div>

          {/* Política de Citas */}
          <div className="company-form-section">
            <h3>📅 Política de Citas</h3>
            
            <div className="company-form-group">
              <label htmlFor="service_name">
                Nombre del Servicio
              </label>
              <input
                type="text"
                id="service_name"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
                placeholder="Ej: Soporte Técnico / Diagnóstico"
              />
            </div>

            <div className="company-form-row">
              <div className="company-form-group">
                <label htmlFor="slot_duration_minutes">
                  Duración de Cita (min)
                </label>
                <input
                  type="number"
                  id="slot_duration_minutes"
                  name="slot_duration_minutes"
                  value={formData.slot_duration_minutes}
                  onChange={handleChange}
                  placeholder="30"
                />
              </div>

              <div className="company-form-group">
                <label htmlFor="buffer_between_appointments_minutes">
                  Buffer entre Citas (min)
                </label>
                <input
                  type="number"
                  id="buffer_between_appointments_minutes"
                  name="buffer_between_appointments_minutes"
                  value={formData.buffer_between_appointments_minutes}
                  onChange={handleChange}
                  placeholder="15"
                />
              </div>
            </div>

            <div className="company-form-group">
              <label htmlFor="max_advance_booking_days">
                Días Máximos de Anticipación
              </label>
              <input
                type="number"
                id="max_advance_booking_days"
                name="max_advance_booking_days"
                value={formData.max_advance_booking_days}
                onChange={handleChange}
                placeholder="14"
              />
            </div>

            <div className="company-form-group">
              <label htmlFor="cancellation_rule">
                Regla de Cancelación
              </label>
              <input
                type="text"
                id="cancellation_rule"
                name="cancellation_rule"
                value={formData.cancellation_rule}
                onChange={handleChange}
                placeholder="Cliente puede cancelar hasta 2 horas antes"
              />
            </div>
          </div>

          <div className="company-form-actions">
            <button
              type="button"
              className="btn-cancel-company"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-submit-company"
              disabled={loading}
            >
              {loading ? (
                <span className="company-form-loading">Guardando...</span>
              ) : (
                'Registrar Empresa'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyModal;
