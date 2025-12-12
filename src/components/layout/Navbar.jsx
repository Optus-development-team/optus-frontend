import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const handleSectionLink = (sectionId) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            scrollToSection(sectionId);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo nav-logo-area">
                        <video autoPlay loop muted playsInline style={{ height: '70px', width: 'auto', objectFit: 'contain' }}>
                            <source src="/animado.mp4" type="video/mp4" />
                            <img src="/OPTUSLOGO.png" alt="OPTUS Logo" style={{ height: '70px', width: 'auto' }} />
                        </video>
                    </Link>
                    
                    <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="nav-links">
                        <li><Link to="/nosotros" onClick={() => setIsMobileMenuOpen(false)}>NOSOTROS</Link></li>
                        <li><Link to="/servicios" onClick={() => setIsMobileMenuOpen(false)}>SERVICIOS</Link></li>
                        <li><Link to="/portafolio" onClick={() => setIsMobileMenuOpen(false)}>PORTAFOLIO</Link></li>
                        <li><Link to="/beneficios" onClick={() => setIsMobileMenuOpen(false)}>BENEFICIOS</Link></li>
                    </ul>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: 'auto' }}>
                        <ThemeToggle />
                        <Link to="/login" className="btn btn-primary nav-cta login-btn" onClick={() => setIsMobileMenuOpen(false)}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src="/iconolog.png" alt="Login" className="login-icon" />
                                Iniciar Sesión
                            </span>
                        </Link>
                    </div>
                    
                    <div className="menu-toggle" id="menu-toggle" onClick={toggleMobileMenu}>
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
