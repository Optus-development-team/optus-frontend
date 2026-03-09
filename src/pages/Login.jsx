import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

// ─── Constantes ────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'https://dot-revealable-telescopically.ngrok-free.dev';
const GOOGLE_AUTH_URL = `${API_BASE}/v1/auth/google`;
const WHATSAPP_SUPPORT_NUMBER = import.meta.env.VITE_WHATSAPP_SUPPORT || '59170000000';
// ───────────────────────────────────────────────────────────────────────────────

/** Genera un código de 6 dígitos aleatorio */
const generateCode = () =>
  String(Math.floor(100000 + Math.random() * 900000));

// ── Paso 1: Pantalla de bienvenida ─────────────────────────────────────────────
const WelcomeStep = ({ onGoogleLogin }) => (
  <div className="login-step welcome-step">
    <div className="login-logo-wrapper">
      <img src="/OPTUSLOGO.png" alt="OPTUS Logo" className="login-logo-img" />
    </div>

    <div className="login-welcome-text">
      <h1 className="login-title">Bienvenido a <span className="accent-text">OPTUS</span></h1>
      <p className="login-subtitle">
        Gestiona tu negocio con <strong>inteligencia artificial</strong>
      </p>
    </div>

    <div className="login-divider" />

    <button className="btn-google-auth" onClick={onGoogleLogin}>
      <svg className="google-icon" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
      Iniciar Sesión / Regístrate
    </button>

    <p className="login-disclaimer">
      Al continuar, verificaremos tu identidad de forma segura mediante Google.
    </p>
  </div>
);

// ── Paso 2: Formulario de teléfono ────────────────────────────────────────────
const PhoneStep = ({ tempToken, onCodeGenerated, preview = false }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateCode = async () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 8) {
      setError('Ingresa un número válido (mínimo 8 dígitos).');
      return;
    }
    setError('');
    setLoading(true);

    // Generar código localmente
    const code = generateCode();

    // Modo preview: avanza sin llamar al backend
    if (preview) {
      setTimeout(() => {
        setLoading(false);
        onCodeGenerated(`+591${cleaned}`, code);
      }, 700);
      return;
    }

    try {
      // Registrar el código en el backend para que sepa qué esperar
      const res = await fetch(`${API_BASE}/v1/auth/phone/request-code`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `+591${cleaned}`,
          code,
          temp_token: tempToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'No se pudo registrar el código.');
      }

      onCodeGenerated(`+591${cleaned}`, code);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-step phone-step">
      <div className="step-icon-wrapper">
        <i className="fab fa-whatsapp step-icon" />
      </div>

      <h2 className="step-title">Ingresa tu teléfono</h2>
      <p className="step-subtitle">
        Te generaremos un código de <strong>6 dígitos</strong> que deberás enviar
        a nuestro WhatsApp para verificar tu identidad.
      </p>

      <div className="phone-input-group">
        <span className="phone-prefix">
          <img
            src="https://flagcdn.com/w20/bo.png"
            srcSet="https://flagcdn.com/w40/bo.png 2x"
            alt="Bolivia"
            className="flag-img"
          />
          +591
        </span>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="70000000"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
          className="phone-input"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerateCode()}
        />
      </div>

      {error && (
        <div className="login-error">
          <i className="fas fa-exclamation-circle" /> {error}
        </div>
      )}

      <button
        className="btn-login-primary"
        onClick={handleGenerateCode}
        disabled={loading || phone.length < 7}
      >
        {loading ? (
          <><i className="fas fa-spinner fa-spin" /> Generando código...</>
        ) : (
          <><i className="fas fa-key" /> Generar código</>
        )}
      </button>
    </div>
  );
};

// ── Paso 3: Envío del código a WhatsApp ──────────────────────────────────────
const CodeStep = ({ phone, code, tempToken, onVerified, onBack, preview = false }) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  // Cooldown para el botón de reenvío
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Mensaje pre-llenado que el usuario mandará por WhatsApp
  const waMessage = encodeURIComponent(`Mi código de verificación OPTUS: ${code}`);
  const waUrl = `https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${waMessage}`;

  const handleConfirmSent = async () => {
    setError('');
    setLoading(true);

    // Modo preview: simula verificación exitosa
    if (preview) {
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard', { replace: true });
      }, 900);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/v1/auth/phone/verify-sent`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code, temp_token: tempToken }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Aún no recibimos tu mensaje. Intenta de nuevo en unos segundos.');
      }

      onVerified();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-step code-step">
      <div className="step-icon-wrapper success">
        <i className="fas fa-shield-alt step-icon" />
      </div>

      <h2 className="step-title">Envía tu código</h2>
      <p className="step-subtitle">
        Este es tu código de verificación. Mándalo por WhatsApp al número de OPTUS.
      </p>

      {/* Código generado — prominente y copiable */}
      <div className="code-display-wrapper">
        <p className="code-display-label">Tu código</p>
        <div className="code-display">
          {code.split('').map((digit, i) => (
            <span key={i} className="code-digit" style={{ '--i': i }}>{digit}</span>
          ))}
        </div>
        <button
          className="btn-copy-code"
          onClick={() => {
            navigator.clipboard?.writeText(code);
            setCooldown(3);
          }}
        >
          {cooldown > 0
            ? <><i className="fas fa-check" /> ¡Copiado!</>
            : <><i className="fas fa-copy" /> Copiar código</>}
        </button>
      </div>

      {/* Instrucción paso a paso */}
      <div className="code-instructions">
        <div className="instruction-step">
          <span className="instruction-num">1</span>
          <span>Copia el código de arriba</span>
        </div>
        <div className="instruction-step">
          <span className="instruction-num">2</span>
          <span>Abre WhatsApp y mándalo al número de OPTUS</span>
        </div>
        <div className="instruction-step">
          <span className="instruction-num">3</span>
          <span>Vuelve aquí y confirma que lo enviaste</span>
        </div>
      </div>

      {/* Botón principal: abre WhatsApp con el código pre-llenado */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp-send"
        onClick={() => setSent(true)}
      >
        <i className="fab fa-whatsapp" />
        Mandar código por WhatsApp
      </a>

      {/* Confirmación — aparece tras hacer clic en el botón de WA */}
      {sent && (
        <>
          {error ? (
            /* ── Estado de error: mostrar opciones de recuperación ── */
            <div className="verify-error-block">
              <div className="login-error">
                <i className="fas fa-exclamation-circle" /> {error}
              </div>

              <p className="error-hint">¿Qué quieres hacer?</p>

              <div className="error-actions">
                {/* Opción 1: reenviar el mismo código por WhatsApp */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-error-action btn-wa-retry"
                  onClick={() => setError('')}
                >
                  <i className="fab fa-whatsapp" />
                  Reenviar mismo código
                </a>

                {/* Opción 2: generar un código nuevo */}
                <button
                  className="btn-error-action btn-new-code"
                  onClick={onBack}
                >
                  <i className="fas fa-redo" />
                  Generar nuevo código
                </button>
              </div>
            </div>
          ) : (
            /* ── Estado normal: confirmar envío ── */
            <button
              className="btn-login-primary btn-confirm-sent"
              onClick={handleConfirmSent}
              disabled={loading}
            >
              {loading ? (
                <><i className="fas fa-spinner fa-spin" /> Verificando...</>
              ) : (
                <><i className="fas fa-check-circle" /> Ya mandé el código</>
              )}
            </button>
          )}
        </>
      )}

      <button className="btn-back-step" onClick={onBack}>
        <i className="fas fa-arrow-left" /> Cambiar número
      </button>

      {/* Solo en preview: botón para simular el estado de error */}
      {preview && (
        <button
          onClick={() => { setSent(true); setError('Aún no recibimos tu mensaje. Intenta de nuevo en unos segundos.'); }}
          style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#F59E0B', background: 'none', border: '1px dashed #F59E0B', borderRadius: '50px', padding: '0.25rem 0.7rem', cursor: 'pointer' }}
        >
          🔧 Simular error de verificación
        </button>
      )}
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────
const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // step: 'welcome' | 'phone' | 'code'
  const [step, setStep] = useState('welcome');
  const [tempToken, setTempToken] = useState('');
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // ?preview=true  → modo diseño sin backend
  const isPreview = searchParams.get('preview') === 'true';

  // Al volver del OAuth de Google, el backend redirige con ?step=phone&token=xxx
  useEffect(() => {
    const urlStep = searchParams.get('step');
    const urlToken = searchParams.get('token');

    if (urlStep === 'phone' && urlToken) {
      setTempToken(urlToken);
      setStep('phone');
    }
    // Preview mode: ir directo al paso indicado
    if (isPreview) {
      if (urlStep === 'phone') setStep('phone');
      if (urlStep === 'code') {
        setVerifiedPhone('+59170000000');
        setGeneratedCode('483921');   // código demo
        setStep('code');
      }
    }
  }, [searchParams, isPreview]);

  const handleGoogleLogin = useCallback(() => {
    window.location.href = GOOGLE_AUTH_URL;
  }, []);

  // Recibe el teléfono Y el código generado desde PhoneStep
  const handleCodeGenerated = useCallback((phone, code) => {
    setVerifiedPhone(phone);
    setGeneratedCode(code);
    setStep('code');
  }, []);

  const goBack = useCallback(() => navigate('/'), [navigate]);

  return (
    <div className="login-page">
      {/* Botón volver */}
      <button className="btn-back" onClick={goBack} aria-label="Volver al inicio">
        <i className="fas fa-arrow-left" />
        Volver
      </button>

      {/* Indicador de pasos (solo visible si no es welcome) */}
      {step !== 'welcome' && (
        <div className="step-progress" aria-label="Progreso de registro">
          {['phone', 'code'].map((s, i) => (
            <div key={s} className={`step-dot ${step === s ? 'active' : step === 'code' && i === 0 ? 'done' : ''}`} />
          ))}
        </div>
      )}

      <div className="login-card">
        {/* Logo siempre visible */}
        {step !== 'welcome' && (
          <div className="card-logo">
            <img src="/OPTUSLOGO.png" alt="OPTUS Logo" className="card-logo-img" />
          </div>
        )}

        {step === 'welcome' && (
          <WelcomeStep onGoogleLogin={handleGoogleLogin} />
        )}

        {step === 'phone' && (
          <PhoneStep
            tempToken={tempToken}
            onCodeGenerated={handleCodeGenerated}
            preview={isPreview}
          />
        )}

        {step === 'code' && (
          <CodeStep
            phone={verifiedPhone}
            code={generatedCode}
            tempToken={tempToken}
            onVerified={() => {}}
            onBack={() => setStep('phone')}
            preview={isPreview}
          />
        )}

        {/* Navegación de preview — solo visible en ?preview=true */}
        {isPreview && (
          <div style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            background: 'rgba(6,182,212,0.08)',
            border: '1px dashed #06B6D4',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '0.7rem', color: '#06B6D4', fontWeight: 600, width: '100%', textAlign: 'center' }}>
              🎨 MODO PREVIEW
            </span>
            {['welcome', 'phone', 'code'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  if (s === 'code') {
                    setVerifiedPhone('+59170000000');
                    setGeneratedCode('483921');
                  }
                  setStep(s);
                }}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '50px',
                  border: '1px solid #06B6D4',
                  background: step === s ? '#06B6D4' : 'transparent',
                  color: step === s ? '#fff' : '#06B6D4',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Marca de agua footer */}
      <p className="login-footer-brand">
        © {new Date().getFullYear()} OPTUS · Todos los derechos reservados
      </p>
    </div>
  );
};

export default Login;
