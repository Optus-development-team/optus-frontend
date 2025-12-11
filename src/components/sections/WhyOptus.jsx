import { useState, useEffect } from 'react';
import './WhyOptus.css';

const WhyOptus = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const liveDemo = [
    {
      id: 1,
      time: '09:23 AM',
      customer: 'María González',
      message: '¿Tienen disponible el producto X?',
      agent: 'OPTUS Bot',
      response: '¡Hola María! 👋 Sí, tenemos 15 unidades disponibles. ¿Te gustaría hacer tu pedido ahora?',
      action: 'Respuesta instantánea',
      color: '#6C5CE7'
    },
    {
      id: 2,
      time: '10:45 AM',
      customer: 'Carlos Mamani',
      message: 'Quiero agendar una cita',
      agent: 'OPTUS Scheduler',
      response: 'Perfecto Carlos! 📅 Tengo disponible:\n• Hoy 3:00 PM\n• Mañana 10:00 AM\n¿Cuál prefieres?',
      action: 'Agendamiento automático',
      color: '#00D9A5'
    },
    {
      id: 3,
      time: '02:15 PM',
      customer: 'Ana Pérez',
      message: 'Confirmo mi pedido',
      agent: 'OPTUS Payments',
      response: '¡Excelente Ana! 💳 Tu total es Bs. 450\nAquí está tu QR de pago. Confirmación automática al recibir tu pago.',
      action: 'Cobro automatizado',
      color: '#FF6B6B'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % liveDemo.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { value: '3 seg', label: 'Tiempo de respuesta', icon: 'fas fa-bolt' },
    { value: '24/7', label: 'Disponibilidad', icon: 'fas fa-clock' },
    { value: '∞', label: 'Conversaciones simultáneas', icon: 'fas fa-users' },
    { value: '99.9%', label: 'Precisión', icon: 'fas fa-check-circle' }
  ];

  const problems = [
    {
      title: '¿Pierdes clientes en la noche?',
      solution: 'OPTUS responde 24/7',
      icon: 'fas fa-moon',
      stat: '87% de consultas fuera de horario'
    },
    {
      title: '¿Cobras tarde y pierdes dinero?',
      solution: 'OPTUS cobra al instante',
      icon: 'fas fa-money-bill-wave',
      stat: '60% mejora en cash flow'
    },
    {
      title: '¿Tu equipo está saturado?',
      solution: 'OPTUS escala sin límites',
      icon: 'fas fa-chart-line',
      stat: 'Infinitas conversaciones'
    }
  ];

  return (
    <section className="why-optus">
      {/* Live Demo Section */}
      <div className="live-demo-section">
        <div className="container">
          <h2 data-aos="fade-up">
            <span className="live-indicator">🔴 EN VIVO</span> Mira OPTUS en Acción
          </h2>
          <p className="demo-subtitle" data-aos="fade-up" data-aos-delay="100">
            Así trabaja tu agente de IA cada segundo del día
          </p>

          <div className="demo-container" data-aos="zoom-in" data-aos-delay="200">
            <div className="chat-simulation">
              <div className="chat-header">
                <div className="chat-status">
                  <span className="status-dot"></span>
                  <span>OPTUS IA activo</span>
                </div>
                <div className="chat-time">{liveDemo[activeDemo].time}</div>
              </div>

              <div className="chat-messages">
                <div className="message customer-message">
                  <div className="message-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="message-content">
                    <div className="message-name">{liveDemo[activeDemo].customer}</div>
                    <div className="message-bubble customer">
                      {liveDemo[activeDemo].message}
                    </div>
                  </div>
                </div>

                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="message agent-message">
                  <div className="message-avatar bot">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className="message-content">
                    <div className="message-name">{liveDemo[activeDemo].agent}</div>
                    <div className="message-bubble agent" style={{ borderColor: liveDemo[activeDemo].color }}>
                      {liveDemo[activeDemo].response}
                    </div>
                  </div>
                </div>
              </div>

              <div className="chat-action" style={{ backgroundColor: liveDemo[activeDemo].color }}>
                <i className="fas fa-check-circle"></i>
                {liveDemo[activeDemo].action}
              </div>
            </div>

            <div className="demo-indicators">
              {liveDemo.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeDemo ? 'active' : ''}`}
                  onClick={() => setActiveDemo(index)}
                  style={{ backgroundColor: index === activeDemo ? liveDemo[index].color : '#ddd' }}
                />
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="metrics-grid" data-aos="fade-up" data-aos-delay="300">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <i className={metric.icon}></i>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problems & Solutions */}
      <div className="problems-section">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            ¿Te Suena Familiar? <span className="emoji">🤔</span>
          </h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            Problemas reales que OPTUS resuelve hoy
          </p>

          <div className="problems-grid">
            {problems.map((problem, index) => (
              <div 
                key={index} 
                className="problem-card"
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <div className="problem-front">
                  <div className="problem-icon">
                    <i className={problem.icon}></i>
                  </div>
                  <h3>{problem.title}</h3>
                  <div className="problem-stat">{problem.stat}</div>
                </div>
                <div className="problem-back">
                  <div className="solution-icon">
                    <i className="fas fa-magic"></i>
                  </div>
                  <h3>{problem.solution}</h3>
                  <a href="#contact" className="btn btn-sm btn-primary">Solucionar Ahora</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before & After Transformation */}
      <div className="transformation-section">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            Tu Negocio <span className="gradient-text">Antes vs Después</span> de OPTUS
          </h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            La diferencia que marca OPTUS en tu día a día
          </p>

          <div className="comparison-slider" data-aos="zoom-in" data-aos-delay="200">
            <div className="before-section">
              <div className="section-header">
                <span className="badge-negative">❌ SIN OPTUS</span>
              </div>
              <div className="timeline-items">
                <div className="timeline-item negative">
                  <div className="time">08:00 AM</div>
                  <div className="content">
                    <i className="fas fa-coffee"></i>
                    <p>Llegas y tienes 47 mensajes sin leer de WhatsApp</p>
                  </div>
                </div>
                <div className="timeline-item negative">
                  <div className="time">10:30 AM</div>
                  <div className="content">
                    <i className="fas fa-tired"></i>
                    <p>Sigues respondiendo lo mismo: "¿Cuánto cuesta?" una y otra vez</p>
                  </div>
                </div>
                <div className="timeline-item negative">
                  <div className="time">02:00 PM</div>
                  <div className="content">
                    <i className="fas fa-phone-slash"></i>
                    <p>Pierdes un cliente porque no respondiste a tiempo</p>
                  </div>
                </div>
                <div className="timeline-item negative">
                  <div className="time">06:00 PM</div>
                  <div className="content">
                    <i className="fas fa-frown"></i>
                    <p>Terminas agotado sin haber avanzado en tu estrategia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="vs-divider">
              <div className="vs-circle">VS</div>
            </div>

            <div className="after-section">
              <div className="section-header">
                <span className="badge-positive">✅ CON OPTUS</span>
              </div>
              <div className="timeline-items">
                <div className="timeline-item positive">
                  <div className="time">08:00 AM</div>
                  <div className="content">
                    <i className="fas fa-smile"></i>
                    <p>OPTUS ya atendió los 47 mensajes durante la noche</p>
                  </div>
                </div>
                <div className="timeline-item positive">
                  <div className="time">10:30 AM</div>
                  <div className="content">
                    <i className="fas fa-chart-line"></i>
                    <p>Te enfocas en estrategia mientras OPTUS responde FAQs</p>
                  </div>
                </div>
                <div className="timeline-item positive">
                  <div className="time">02:00 PM</div>
                  <div className="content">
                    <i className="fas fa-bell"></i>
                    <p>Recibes notificación: "3 nuevos clientes agendados"</p>
                  </div>
                </div>
                <div className="timeline-item positive">
                  <div className="time">06:00 PM</div>
                  <div className="content">
                    <i className="fas fa-glass-cheers"></i>
                    <p>Terminas con 10 ventas cerradas y pagos confirmados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="transformation-stats" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-item">
              <div className="stat-icon">⏰</div>
              <div className="stat-info">
                <div className="stat-number">20+ hrs</div>
                <div className="stat-label">Ahorradas por semana</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <div className="stat-number">3x</div>
                <div className="stat-label">Más ventas cerradas</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">😌</div>
              <div className="stat-info">
                <div className="stat-number">95%</div>
                <div className="stat-label">Menos estrés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Ticker */}
      <div className="social-proof-section">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            Empresas Bolivianas Ya lo Están Usando <span className="live-pulse">🔴</span>
          </h2>
          <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
            Actualizaciones en tiempo real de nuestros clientes
          </p>

          <div className="activity-feed" data-aos="fade-up" data-aos-delay="200">
            <div className="feed-item">
              <div className="feed-icon success">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="feed-content">
                <strong>TechStore La Paz</strong> acaba de cerrar una venta de Bs. 2,450 vía WhatsApp
                <span className="feed-time">Hace 2 minutos</span>
              </div>
            </div>
            <div className="feed-item">
              <div className="feed-icon info">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="feed-content">
                <strong>Clínica Salud Total</strong> agendó 8 citas automáticamente esta mañana
                <span className="feed-time">Hace 15 minutos</span>
              </div>
            </div>
            <div className="feed-item">
              <div className="feed-icon success">
                <i className="fas fa-money-check"></i>
              </div>
              <div className="feed-content">
                <strong>RestauranteGourmet</strong> confirmó 12 pedidos y recibió pagos por Bs. 3,200
                <span className="feed-time">Hace 28 minutos</span>
              </div>
            </div>
            <div className="feed-item">
              <div className="feed-icon warning">
                <i className="fas fa-comments"></i>
              </div>
              <div className="feed-content">
                <strong>Moda Bella</strong> respondió 43 consultas mientras el equipo descansaba
                <span className="feed-time">Hace 1 hora</span>
              </div>
            </div>
            <div className="feed-item">
              <div className="feed-icon info">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="feed-content">
                <strong>InmobiliariaTop</strong> calificó 6 leads y agendó 3 visitas a propiedades
                <span className="feed-time">Hace 2 horas</span>
              </div>
            </div>
          </div>

          <div className="proof-numbers" data-aos="fade-up" data-aos-delay="300">
            <div className="proof-item">
              <div className="proof-number counter">1,247</div>
              <div className="proof-label">Mensajes procesados hoy</div>
            </div>
            <div className="proof-item">
              <div className="proof-number counter">86</div>
              <div className="proof-label">Ventas cerradas hoy</div>
            </div>
            <div className="proof-item">
              <div className="proof-number counter">342</div>
              <div className="proof-label">Citas agendadas esta semana</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive CTA */}
      <div className="interactive-cta">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <div className="cta-text">
              <h2>¿Listo para Tu Primer Agente de IA?</h2>
              <p>Implementación en 7 días. Sin programación. Sin riesgos.</p>
              <div className="cta-features">
                <span><i className="fas fa-check"></i> Demo gratuita 15 min</span>
                <span><i className="fas fa-check"></i> Setup personalizado</span>
                <span><i className="fas fa-check"></i> Soporte en español</span>
              </div>
            </div>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary btn-lg pulse">
                <i className="fab fa-whatsapp"></i> Comenzar Ahora
              </a>
              <a href="/servicios" className="btn btn-outline btn-lg">
                Ver Planes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyOptus;
