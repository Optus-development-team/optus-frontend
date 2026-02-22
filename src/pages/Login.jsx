import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { useTranslation } from 'react-i18next';
import CompanyModal from '../components/ui/CompanyModal';
import { createCompany, checkUserCompanyByEmail } from '../utils/supabaseClient';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, authenticated, user, logout } = usePrivy();
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [hasCheckedCompany, setHasCheckedCompany] = useState(false);

  // Verificar si el usuario tiene empresa registrada cuando se autentica
  useEffect(() => {
    const checkAndShowModal = async () => {
      if (authenticated && user && !hasCheckedCompany) {
        setHasCheckedCompany(true);
        
        // Verificar si ya tiene empresa registrada por email
        const userEmail = user.email?.address;
        if (userEmail) {
          const { exists } = await checkUserCompanyByEmail(userEmail);
          
          // Si no tiene empresa, mostrar modal
          if (!exists) {
            setShowCompanyModal(true);
          }
        }
      }
    };

    checkAndShowModal();
  }, [authenticated, user, hasCheckedCompany]);

  // Resetear el estado cuando el usuario cierra sesión
  useEffect(() => {
    if (!authenticated) {
      setHasCheckedCompany(false);
      setShowCompanyModal(false);
    }
  }, [authenticated]);

  // Manejar el envío del formulario de empresa
  const handleCompanySubmit = async (companyData) => {
    try {
      const result = await createCompany(companyData);
      
      if (result.success) {
        setShowCompanyModal(false);
        console.log('Empresa registrada exitosamente:', result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error al registrar empresa:', error);
      throw error; // Re-lanzar para que el modal lo maneje
    }
  };

  const goBack = () => {
    navigate('/');
  };

  // Si está autenticado, mostrar información del usuario
  if (authenticated && user) {
    return (
      <div className="login-page">
        <button className="btn-login-primary" onClick={goBack} style={{position: 'absolute', top: '20px', left: '20px', width: 'auto', zIndex: 10}}>
          <i className="fas fa-arrow-left"></i>
          {t('login.back')}
        </button>
        
        {/* Modal para registrar empresa */}
        <CompanyModal
          isOpen={showCompanyModal}
          onClose={() => setShowCompanyModal(false)}
          onSubmit={handleCompanySubmit}
          userEmail={user.email?.address}
          userId={user.id}
        />
        
        <div className="authenticated-container">
          <div className="user-info-card">
            <div className="welcome-icon">✅</div>
            <h1>{t('login.authenticated.welcome')}</h1>
            {user.email?.address && (
              <p className="user-email">{user.email.address}</p>
            )}
            <p className="success-message">
              {t('login.authenticated.successMessage')}
            </p>
            <div className="user-actions">
              <button className="btn-dashboard" onClick={() => navigate('/')}>
                <i className="fas fa-home"></i>
                {t('login.authenticated.goHome')}
              </button>
              <button className="btn-logout" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
                {t('login.authenticated.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <button className="btn-login-primary" onClick={goBack} style={{position: 'absolute', top: '20px', left: '20px', width: 'auto', zIndex: 10}}>
        <i className="fas fa-arrow-left"></i>
        {t('login.back')}
      </button>
      
      <div className="login-simple-container">
        <div className="login-hero">
          <div className="login-logo">
            <img src="/OPTUSLOGO.png" alt="OPTUS Logo" />
          </div>
          <h1>{t('login.hero.title')}</h1>
          <p>{t('login.hero.subtitle')}</p>
        </div>

        <div className="login-actions">
          <button className="btn-login-primary" onClick={login}>
            <i className="fas fa-sign-in-alt"></i>
            {t('login.actions.loginSignup')}
          </button>
          <p className="login-methods-info">
            {t('login.actions.methods')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
