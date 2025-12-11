import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [errores, setErrores] = useState([]);
  
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
    // Aquí irá la lógica de registro cuando conectes la base de datos
    console.log('Registro:', registerForm);
    alert('Funcionalidad de registro pendiente de conectar con base de datos');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de login cuando conectes la base de datos
    console.log('Login:', loginForm);
    alert('Funcionalidad de login pendiente de conectar con base de datos');
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <button id="backButton" onClick={goBack}>VOLVER</button>
      
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        {/* Formulario de Registro */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Crea tu Cuenta</h1>
            
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google" id="red"></i></a>
              <a href="#" className="social"><i className="fab fa-apple" id="black"></i></a>
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
            
            {errores.map((error, index) => (
              <div key={index} className="alert alert-danger">{error}</div>
            ))}
            
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google" id="red"></i></a>
              <a href="#" className="social"><i className="fab fa-apple" id="black"></i></a>
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
