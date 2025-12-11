import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container footer-content">
                <div className="footer-col">
                    <Link to="/" className="logo footer-logo-area">
                        OPTUS
                    </Link>
                    <p>La plataforma de agentes inteligentes líder en automatización para la nueva generación de negocios en Bolivia.</p>
                    <div className="social-links">
                        <a href="https://www.facebook.com/share/1Ce4TjnxRU/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://x.com/OptusAut" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/optusaut/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="footer-col">
                    <h5>Compañía</h5>
                    <ul>
                        <li><Link to="/nosotros">Nosotros</Link></li>
                        <li><Link to="/portafolio">Casos de Éxito</Link></li>
                        <li><Link to="/">Testimonios</Link></li>
                        <li><Link to="/">Trabaja con Nosotros</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h5>Servicios</h5>
                    <ul>
                        <li><Link to="/servicios">Automatización</Link></li>
                        <li><Link to="/servicios">Agentes de IA</Link></li>
                        <li><Link to="/servicios">Integraciones</Link></li>
                        <li><Link to="/servicios">Consultoría</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h5>Contacto</h5>
                    <p>La Paz, Bolivia</p>
                    <p>optus.aut@gmail.com</p>
                    <p>+591 77379190</p>
                </div>

                <div className="footer-col">
                    <h5>Legal</h5>
                    <ul>
                        <li><Link to="/prueba">Política de Privacidad</Link></li>
                        <li><Link to="/terminos-servicio">Términos de Servicio</Link></li>
                        <li><Link to="/eliminar">Eliminar Información</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container footer-bottom">
                <p>&copy; 2025 OPTUS. Todos los derechos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;
