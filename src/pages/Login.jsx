import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

const API_BASE = import.meta.env.VITE_API_URL || 'https://dot-revealable-telescopically.ngrok-free.dev';

const AUTH_ENDPOINTS = {
  login: '/auth/login-email',
  registerJoin: '/auth/register-join-company',
  registerCreate: '/auth/register-create-company',
  verifyEmail: '/auth/verify-email',
  resendVerification: '/auth/resend-verification',
};

const INDUSTRY_OPTIONS = ['Tecnología', 'Retail', 'Servicios', 'Alimentos y bebidas', 'Salud', 'Logística', 'Educación', 'Otro'];
const COMPANY_SIZE_OPTIONS = ['1-10', '11-50', '51-200', '200+'];
const TIME_ZONE_OPTIONS = ['America/La_Paz', 'UTC-04:00', 'UTC'];
const CURRENCY_OPTIONS = ['BOB', 'USD', 'EUR'];

const INITIAL_FORM = {
  email: '',
  password: '',
  fullName: '',
  phone: '',
  companyCode: '',
  companyName: '',
  companySlug: '',
  industry: '',
  size: '',
  timeZone: 'America/La_Paz',
  currency: 'BOB',
  acceptTerms: false,
};

const getInitialFlow = (searchParams) => {
  const flow = searchParams.get('flow');
  return flow === 'login' || flow === 'join' || flow === 'create' ? flow : null;
};

const trimOrEmpty = (value) => value.trim();

const trimOrUndefined = (value) => {
  const trimmed = trimOrEmpty(value);
  return trimmed ? trimmed : undefined;
};

const requestJson = async (endpoint, body) => {
  const requestWithEndpoint = async (path) => fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  let response;
  let data = {};

  try {
    response = await requestWithEndpoint(endpoint);
  } catch (networkError) {
    if (!endpoint.startsWith('/auth/')) {
      throw networkError;
    }

    response = await requestWithEndpoint(`/v1${endpoint}`);
  }

  data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || 'No se pudo completar la solicitud.');
  }

  return data;
};

const buildUserPayload = (formData) => {
  const payload = {
    email: trimOrEmpty(formData.email),
    password: formData.password,
    fullName: trimOrEmpty(formData.fullName),
  };

  const phone = trimOrUndefined(formData.phone);
  if (phone) payload.phone = phone;

  return payload;
};

const buildCompanyPayload = (formData) => {
  const payload = {
    companyName: trimOrEmpty(formData.companyName),
    industry: trimOrEmpty(formData.industry),
    size: trimOrEmpty(formData.size),
    timeZone: trimOrEmpty(formData.timeZone),
    currency: trimOrEmpty(formData.currency),
  };

  const companySlug = trimOrUndefined(formData.companySlug);
  if (companySlug) payload.companySlug = companySlug;

  return payload;
};

const getDisplayMessage = (data, fallback) => data?.message || data?.detail || fallback;

const FormField = ({ label, name, type = 'text', value, onChange, placeholder, required = false, autoComplete }) => (
  <label className="auth-field" htmlFor={name}>
    <span className="auth-label">{label}</span>
    <input
      id={name}
      name={name}
      className="auth-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
    />
  </label>
);

const SelectField = ({ label, name, value, onChange, children, required = false }) => (
  <label className="auth-field" htmlFor={name}>
    <span className="auth-label">{label}</span>
    <select
      id={name}
      name={name}
      className="auth-input auth-select"
      value={value}
      onChange={onChange}
      required={required}
    >
      {children}
    </select>
  </label>
);

const ChoiceStep = ({ onChooseFlow, onLogin }) => (
  <div className="login-step welcome-step">
    <div className="login-logo-wrapper">
      <img src="/OPTUSLOGO.png" alt="OPTUS Logo" className="login-logo-img" />
    </div>

    <div className="login-welcome-text">
      <h1 className="login-title">Acceso a <span className="accent-text">OPTUS</span></h1>
    </div>

    <div className="login-divider" />

    <div className="auth-choice-grid">
      <button type="button" className="auth-choice-card" onClick={() => onChooseFlow('join')}>
        <span className="auth-choice-tag">Registro</span>
        <strong>Unirme a una empresa</strong>
        <span>Ingresa con un código de empresa y completa tus datos de usuario.</span>
      </button>

      <button type="button" className="auth-choice-card" onClick={() => onChooseFlow('create')}>
        <span className="auth-choice-tag">Registro</span>
        <strong>Crear empresa</strong>
        <span>Registra tu compañía con sus datos base y habilita el acceso del equipo.</span>
      </button>
    </div>

    <button type="button" className="btn-text-action" onClick={onLogin}>Ya tengo cuenta, iniciar sesión</button>

  </div>
);

const AuthFormStep = ({ flow, formData, loading, error, onChange, onSubmit, onBack }) => {
  const isLogin = flow === 'login';
  const isJoin = flow === 'join';
  const isCreate = flow === 'create';

  return (
    <div className="login-step auth-form-step">
      <div className="step-icon-wrapper">
        <i className="fas fa-lock step-icon" />
      </div>

      <h2 className="step-title">
        {isLogin && 'Iniciar sesión'}
        {isJoin && 'Unirme a una empresa'}
        {isCreate && 'Crear empresa'}
      </h2>

      <p className="step-subtitle">
        {isLogin && 'Usa tu correo y contraseña para entrar al panel.'}
        {isJoin && 'Completa tus datos y el código de la empresa para registrarte.'}
        {isCreate && 'Completa tus datos personales y los datos base de tu empresa.'}
      </p>

      {error && (
        <div className="login-error">
          <i className="fas fa-exclamation-circle" /> {error}
        </div>
      )}

      <form className="auth-form" onSubmit={onSubmit}>
        {!isLogin && (
          <div className="form-section">
            <div className="form-section-title">Datos del usuario</div>
            <div className="field-grid">
              <FormField
                label="Nombre completo"
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Tu nombre y apellido"
                required
                autoComplete="name"
              />
              <FormField
                label="Teléfono (opcional)"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="70000000"
                autoComplete="tel"
              />
            </div>
          </div>
        )}

        <div className="form-section">
          <div className="form-section-title">Acceso</div>
          <div className="field-grid">
            <FormField
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="correo@empresa.com"
              required
              autoComplete="email"
            />
            <FormField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={onChange}
              placeholder="••••••••"
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>
        </div>

        {isJoin && (
          <div className="form-section">
            <div className="form-section-title">Empresa</div>
            <FormField
              label="Código de empresa"
              name="companyCode"
              value={formData.companyCode}
              onChange={onChange}
              placeholder="Ingresa el código de tu empresa"
              required
            />
          </div>
        )}

        {isCreate && (
          <div className="form-section">
            <div className="form-section-title">Empresa</div>
            <div className="field-grid">
              <FormField
                label="Nombre de la empresa"
                name="companyName"
                value={formData.companyName}
                onChange={onChange}
                placeholder="OPTUS"
                required
              />
              <FormField
                label="Slug de empresa (opcional)"
                name="companySlug"
                value={formData.companySlug}
                onChange={onChange}
                placeholder="optus"
              />
              <SelectField
                label="Industria"
                name="industry"
                value={formData.industry}
                onChange={onChange}
                required
              >
                <option value="" disabled>Selecciona una industria</option>
                {INDUSTRY_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </SelectField>
              <SelectField
                label="Tamaño"
                name="size"
                value={formData.size}
                onChange={onChange}
                required
              >
                <option value="" disabled>Selecciona el tamaño</option>
                {COMPANY_SIZE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </SelectField>
              <SelectField
                label="Zona horaria"
                name="timeZone"
                value={formData.timeZone}
                onChange={onChange}
                required
              >
                {TIME_ZONE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </SelectField>
              <SelectField
                label="Moneda"
                name="currency"
                value={formData.currency}
                onChange={onChange}
                required
              >
                {CURRENCY_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </SelectField>
            </div>
          </div>
        )}

        {!isLogin && (
          <label className="terms-row" htmlFor="acceptTerms">
            <input id="acceptTerms" name="acceptTerms" type="checkbox" checked={formData.acceptTerms} onChange={onChange} />
            <span>Acepto los términos y autorizo el alta de mi cuenta.</span>
          </label>
        )}

        <button className="btn-login-primary" type="submit" disabled={loading}>
          {loading ? (
            <><i className="fas fa-spinner fa-spin" /> Procesando...</>
          ) : (
            <>
              <i className="fas fa-arrow-right" />
              {isLogin && 'Entrar'}
              {isJoin && 'Registrar y unirme'}
              {isCreate && 'Registrar empresa'}
            </>
          )}
        </button>
      </form>

      <button type="button" className="btn-back-step" onClick={onBack}>
        <i className="fas fa-arrow-left" /> Volver
      </button>
    </div>
  );
};

const VerificationStep = ({ email, token, loading, error, message, onTokenChange, onVerify, onResend, onBack }) => (
  <div className="login-step auth-form-step">
    <div className="step-icon-wrapper success">
      <i className="fas fa-envelope-open-text step-icon" />
    </div>

    <h2 className="step-title">Verifica tu correo</h2>
    <p className="step-subtitle">
      Enviamos un token a <strong>{email || 'tu correo registrado'}</strong>. Ingrésalo para activar tu acceso.
    </p>

    {message && (
      <div className="login-success">
        <i className="fas fa-circle-check" /> {message}
      </div>
    )}

    {error && (
      <div className="login-error">
        <i className="fas fa-exclamation-circle" /> {error}
      </div>
    )}

    <form className="auth-form" onSubmit={onVerify}>
      <FormField
        label="Token de verificación"
        name="verificationToken"
        value={token}
        onChange={onTokenChange}
        placeholder="Ingresa el token del correo"
        required
        autoComplete="one-time-code"
      />

      <div className="verification-actions">
        <button className="btn-login-primary" type="submit" disabled={loading}>
          {loading ? (
            <><i className="fas fa-spinner fa-spin" /> Verificando...</>
          ) : (
            <><i className="fas fa-shield-halved" /> Verificar email</>
          )}
        </button>

        <button className="btn-secondary-action" type="button" onClick={onResend} disabled={loading}>
          <i className="fas fa-rotate-right" /> Reenviar token
        </button>
      </div>
    </form>

    <button type="button" className="btn-back-step" onClick={onBack}>
      <i className="fas fa-arrow-left" /> Volver al formulario
    </button>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialFlow = getInitialFlow(searchParams);
  const [flow, setFlow] = useState(initialFlow);
  const [step, setStep] = useState(initialFlow ? 'form' : 'choice');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlFlow = getInitialFlow(searchParams);
    const urlStep = searchParams.get('step');
    const urlEmail = searchParams.get('email');

    if (urlFlow) {
      setFlow(urlFlow);
      setStep('form');
    }

    if (urlStep === 'verify') {
      setStep('verify');
    }

    if (urlEmail) {
      setFormData((current) => ({ ...current, email: urlEmail }));
      setVerificationEmail(urlEmail);
    }
  }, [searchParams]);

  const handleChange = useCallback((event) => {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleChooseFlow = useCallback((nextFlow) => {
    setFlow(nextFlow);
    setStep('form');
    setError('');
    setMessage('');
  }, []);

  const handleLogin = useCallback(() => {
    setFlow('login');
    setStep('form');
    setError('');
    setMessage('');
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (flow !== 'login' && !formData.acceptTerms) {
      setError('Debes aceptar los términos para continuar.');
      return;
    }

    if (flow !== 'login' && !trimOrEmpty(formData.fullName)) {
      setError('El nombre completo es obligatorio.');
      return;
    }

    if (flow === 'join' && !trimOrEmpty(formData.companyCode)) {
      setError('Necesitas un código de empresa válido.');
      return;
    }

    if (flow === 'create' && (!trimOrEmpty(formData.companyName) || !trimOrEmpty(formData.industry) || !trimOrEmpty(formData.size))) {
      setError('Completa los datos mínimos de la empresa.');
      return;
    }

    setLoading(true);

    try {
      if (flow === 'login') {
        const data = await requestJson(AUTH_ENDPOINTS.login, {
          email: trimOrEmpty(formData.email),
          password: formData.password,
        });

        const requiresVerification = Boolean(data.requiresVerification || data.needsVerification || data.verificationRequired);

        if (requiresVerification) {
          setVerificationEmail(data.email || trimOrEmpty(formData.email));
          setVerificationToken('');
          setStep('verify');
          setMessage(getDisplayMessage(data, 'Tu cuenta necesita verificación.'));
          return;
        }

        navigate(data.redirectTo || data.redirect || '/dashboard', { replace: true });
        return;
      }

      if (flow === 'join') {
        const data = await requestJson(AUTH_ENDPOINTS.registerJoin, {
          user: buildUserPayload(formData),
          companyCode: trimOrEmpty(formData.companyCode),
          acceptTerms: formData.acceptTerms,
        });

        setVerificationEmail(data.email || trimOrEmpty(formData.email));
        setVerificationToken('');
        setStep('verify');
        setMessage(getDisplayMessage(data, 'Revisa tu correo para verificar tu cuenta.'));
        return;
      }

      if (flow === 'create') {
        const data = await requestJson(AUTH_ENDPOINTS.registerCreate, {
          user: buildUserPayload(formData),
          company: buildCompanyPayload(formData),
          acceptTerms: formData.acceptTerms,
        });

        setVerificationEmail(data.email || trimOrEmpty(formData.email));
        setVerificationToken('');
        setStep('verify');
        setMessage(getDisplayMessage(data, 'Tu empresa fue creada. Verifica tu correo para continuar.'));
      }
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }, [flow, formData, navigate]);

  const handleVerify = useCallback(async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await requestJson(AUTH_ENDPOINTS.verifyEmail, {
        token: trimOrEmpty(verificationToken),
      });

      navigate(data.redirectTo || data.redirect || '/dashboard', { replace: true });
    } catch (verifyError) {
      setError(verifyError.message);
    } finally {
      setLoading(false);
    }
  }, [navigate, verificationToken]);

  const handleResend = useCallback(async () => {
    if (!verificationEmail) {
      setError('No tenemos un correo para reenviar la verificación.');
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    try {
      const data = await requestJson(AUTH_ENDPOINTS.resendVerification, {
        email: verificationEmail,
      });

      setMessage(getDisplayMessage(data, 'Te enviamos un nuevo token de verificación.'));
    } catch (resendError) {
      setError(resendError.message);
    } finally {
      setLoading(false);
    }
  }, [verificationEmail]);

  const handleBack = useCallback(() => {
    setError('');
    setMessage('');

    if (step === 'verify') {
      setStep('form');
      return;
    }

    setFlow(null);
    setStep('choice');
  }, [step]);

  const handleBackToChoice = useCallback(() => {
    setFlow(null);
    setStep('choice');
    setError('');
    setMessage('');
  }, []);

  const progressSteps = ['choice', 'form', 'verify'];

  return (
    <div className="login-page">
      <button className="btn-back" onClick={() => navigate('/')} aria-label="Volver al inicio">
        <i className="fas fa-arrow-left" />
        Volver
      </button>

      {step !== 'choice' && (
        <div className="step-progress" aria-label="Progreso de acceso">
          {progressSteps.map((currentStep) => {
            const currentIndex = progressSteps.indexOf(step);
            const stepIndex = progressSteps.indexOf(currentStep);
            const stepClass = step === currentStep ? 'active' : currentIndex > stepIndex ? 'done' : '';

            return <div key={currentStep} className={`step-dot ${stepClass}`} />;
          })}
        </div>
      )}

      <div className="login-card">
        <div className="card-logo">
          <img src="/OPTUSLOGO.png" alt="OPTUS Logo" className="card-logo-img" />
        </div>

        {step === 'choice' && <ChoiceStep onChooseFlow={handleChooseFlow} onLogin={handleLogin} />}

        {step === 'form' && flow && (
          <AuthFormStep
            flow={flow}
            formData={formData}
            loading={loading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBackToChoice}
          />
        )}

        {step === 'verify' && (
          <VerificationStep
            email={verificationEmail}
            token={verificationToken}
            loading={loading}
            error={error}
            message={message}
            onTokenChange={(event) => setVerificationToken(event.target.value)}
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={handleBack}
          />
        )}
      </div>

      <p className="login-footer-brand">© {new Date().getFullYear()} OPTUS · Todos los derechos reservados</p>
    </div>
  );
};

export default Login;