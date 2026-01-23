import { useState } from 'react';
import './Log.css';

const Log = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí irá la lógica de autenticación
  };

  return (
    <div className="log-container">
      <div className="log-card">
        <div className="log-header">
          <h1 className="log-title">Bienvenido</h1>
          <p className="log-subtitle">Inicia sesión en tu cuenta</p>
        </div>

        <form className="log-form" onSubmit={handleSubmit}>
          <div className="log-form-group">
            <label htmlFor="email" className="log-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="log-input"
              placeholder="prueba@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="log-form-group">
            <label htmlFor="password" className="log-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="log-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="log-options">
            <label className="log-remember">
              <input type="checkbox" className="log-checkbox" />
              <span>Recordarme</span>
            </label>
            <a href="#" className="log-forgot">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="log-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="log-footer">
          <p className="log-register-text">
            ¿No tienes cuenta?{' '}
            <a href="#" className="log-register-link">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Log;
