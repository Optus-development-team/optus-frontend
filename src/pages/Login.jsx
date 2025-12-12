import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, authenticated, user, logout } = usePrivy();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  
  // Estados para el formulario de registro
  const [registerForm, setRegisterForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  // Estados para el formulario de login
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Si el usuario ya está autenticado, redirigir al home
  useEffect(() => {
    if (authenticated && user) {
      console.log('Usuario autenticado:', user);
      // Aquí puedes redirigir o mostrar un mensaje
      // navigate('/');
    }
  }, [authenticated, user, navigate]);

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Abrir modal de Privy para registro
    login();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Abrir modal de Privy para login
    login();
  };

  const handleSocialLogin = (provider) => {
    // Privy manejará la autenticación social
    login();
  };

  const goBack = () => {
    navigate('/');
  };

  // Si está autenticado, mostrar información del usuario
  if (authenticated && user) {
    return (
      <div className="login-page">
        <button id="backButton" onClick={goBack}>VOLVER</button>
        
        <div className="authenticated-container">
          <div className="user-info-card">
            <h1>¡Bienvenido a OPTUS!</h1>
            <div className="user-details">
              <p><strong>Email:</strong> {user.email?.address || 'No disponible'}</p>
              <p><strong>ID de Usuario:</strong> {user.id}</p>
              <p><strong>Método de Login:</strong> {user.linkedAccounts[0]?.type || 'Email'}</p>
            </div>
            <div className="user-actions">
              <button className="btn-logout" onClick={logout}>
                Cerrar Sesión
              </button>
              <button className="btn-dashboard" onClick={() => navigate('/')}>
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <button id="backButton" onClick={goBack}>VOLVER</button>
      
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        {/* Formulario de Registro */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Crea tu Cuenta</h1>
            
            <div className="social-container">
              <a href="#" className="social" onClick={(e) => { e.preventDefault(); handleSocialLogin('facebook'); }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social" id="red" onClick={(e) => { e.preventDefault(); handleSocialLogin('google'); }}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social" id="black" onClick={(e) => { e.preventDefault(); handleSocialLogin('apple'); }}>
                <i className="fab fa-apple"></i>
              </a>
            </div>
            
            <span>o usa tu email como registro</span>
            
            <input 
              type="text" 
              name="nombre" 
              placeholder="Nombres" 
              value={registerForm.nombre}
              onChange={handleRegisterChange}
              required 
            />
            <input 
              type="text" 
              name="apellido" 
              placeholder="Apellidos" 
              value={registerForm.apellido}
              onChange={handleRegisterChange}
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={registerForm.email}
              onChange={handleRegisterChange}
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña" 
              value={registerForm.password}
              onChange={handleRegisterChange}
              required 
            />
            
            <button id="lila" type="submit">Registrar</button>
          </form>
        </div>

        {/* Formulario de Login */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Iniciar Sesión</h1>
            
            <div className="social-container">
              <a href="#" className="social" onClick={(e) => { e.preventDefault(); handleSocialLogin('facebook'); }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social" id="red" onClick={(e) => { e.preventDefault(); handleSocialLogin('google'); }}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social" id="black" onClick={(e) => { e.preventDefault(); handleSocialLogin('apple'); }}>
                <i className="fab fa-apple"></i>
              </a>
            </div>
            
            <span>o usa tu email</span>
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={loginForm.email}
              onChange={handleLoginChange}
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={loginForm.password}
              onChange={handleLoginChange}
              required 
            />
            
            <a href="#">Olvidaste tu contraseña?</a>
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>

        {/* Overlay para cambiar entre formularios */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¡Bienvenido!</h1>
              <p>Inicia sesión con tu cuenta</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                Inicia sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bienvenido a OPTUS</h1>
              <p>Crea tu cuenta</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
