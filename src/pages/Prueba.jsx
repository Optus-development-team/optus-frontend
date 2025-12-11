import './Prueba.css';

const Prueba = () => {
  return (
    <div className="prueba-page">
      <div className="container">
        <div className="privacy-policy-content">
          <h1>Política de Privacidad</h1>
          <p className="last-updated">Última actualización: 11 de diciembre de 2025</p>

          <section className="policy-section">
            <h2>1. Introducción</h2>
            <p>
              En OPTUS, nos comprometemos a proteger la privacidad y seguridad de los datos personales de nuestros clientes. 
              Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos su información 
              cuando utiliza nuestros servicios de automatización y agentes inteligentes.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Información que Recopilamos</h2>
            <p>Recopilamos diferentes tipos de información para proporcionar y mejorar nuestros servicios:</p>
            <ul>
              <li><strong>Información de contacto:</strong> Nombre, correo electrónico, número de teléfono y empresa.</li>
              <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo y datos de uso de la plataforma.</li>
              <li><strong>Datos de automatización:</strong> Información necesaria para configurar y ejecutar los agentes inteligentes en sus procesos empresariales.</li>
              <li><strong>Información de pago:</strong> Datos necesarios para procesar transacciones (procesados de forma segura por terceros certificados).</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Uso de la Información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul>
              <li>Proporcionar, mantener y mejorar nuestros servicios de automatización</li>
              <li>Personalizar su experiencia con nuestros agentes inteligentes</li>
              <li>Procesar transacciones y enviar notificaciones relacionadas</li>
              <li>Comunicarnos con usted sobre actualizaciones, soporte técnico y ofertas de servicio</li>
              <li>Analizar el uso de la plataforma para optimizar nuestros servicios</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Seguridad de los Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas avanzadas para proteger sus datos:
            </p>
            <ul>
              <li>Encriptación de datos en tránsito y en reposo mediante protocolos SSL/TLS</li>
              <li>Controles de acceso estrictos y autenticación multifactor</li>
              <li>Monitoreo continuo de seguridad y auditorías regulares</li>
              <li>Respaldo automático de datos con redundancia geográfica</li>
              <li>Cumplimiento con estándares internacionales de seguridad de la información</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Compartir Información</h2>
            <p>
              No vendemos ni alquilamos su información personal. Solo compartimos datos cuando:
            </p>
            <ul>
              <li>Es necesario para proporcionar el servicio solicitado</li>
              <li>Contamos con su consentimiento explícito</li>
              <li>Se requiere por ley o para proteger nuestros derechos legales</li>
              <li>Es necesario para integraciones con plataformas de terceros autorizadas por usted</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>6. Sus Derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul>
              <li>Acceder a sus datos personales que tenemos en nuestros sistemas</li>
              <li>Solicitar la corrección de información inexacta o incompleta</li>
              <li>Solicitar la eliminación de sus datos personales</li>
              <li>Oponerse al procesamiento de sus datos para ciertos fines</li>
              <li>Solicitar la portabilidad de sus datos a otro proveedor</li>
              <li>Retirar el consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Retención de Datos</h2>
            <p>
              Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos 
              descritos en esta política, salvo que la ley exija o permita un período de retención más largo. 
              Los datos de automatización y configuraciones se mantienen mientras su cuenta esté activa.
            </p>
          </section>

          <section className="policy-section">
            <h2>8. Cookies y Tecnologías Similares</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestra plataforma, 
              analizar el uso del servicio y personalizar el contenido. Puede controlar el uso de cookies 
              a través de la configuración de su navegador.
            </p>
          </section>

          <section className="policy-section">
            <h2>9. Cambios en esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios 
              significativos mediante un aviso en nuestra plataforma o por correo electrónico. 
              Le recomendamos revisar esta página regularmente.
            </p>
          </section>

          <section className="policy-section">
            <h2>10. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos sus datos, 
              puede contactarnos:
            </p>
            <ul className="contact-info">
              <li><strong>Email:</strong> optus.aut@gmail.com</li>
              <li><strong>Teléfono:</strong> +591 77379190</li>
              <li><strong>Dirección:</strong> La Paz, Bolivia</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Prueba;