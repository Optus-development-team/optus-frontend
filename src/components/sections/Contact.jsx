import './Contact.css';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-content">
          <h2 data-aos="fade-up">¿Listo para Automatizar tu Negocio?</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Comienza hoy mismo y descubre cómo OPTUS puede transformar tu negocio con inteligencia artificial.
          </p>
          <div className="contact-cta-group" data-aos="fade-up" data-aos-delay="200">
            <a href="https://wa.me/59177379190" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <i className="fab fa-whatsapp"></i> Contactar por WhatsApp
            </a>
            <a href="mailto:optus.aut@gmail.com" className="btn btn-secondary btn-lg">
              <i className="fas fa-envelope"></i> Enviar Email
            </a>
          </div>
          
          <div className="contact-info" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>La Paz, Bolivia</span>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-phone"></i>
              <a href="tel:+59177379190">+591 77379190</a>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:optus.aut@gmail.com">optus.aut@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
