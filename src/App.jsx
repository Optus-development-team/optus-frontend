import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Portafolio from './pages/Portafolio';
import Beneficios from './pages/Beneficios';
import Login from './pages/Login';
import Prueba from './pages/Prueba';
import TerminosServicio from './pages/TerminosServicio';
import Eliminar from './pages/Eliminar';
import Pago from './pages/Pago';
import './styles/variables.css';
import './styles/global.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isPagoPage = location.pathname.startsWith('/pago');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out', offset: 100 });       
  }, []);

  return (
    <div className="App">
      {!isLoginPage && !isPagoPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/terminos-servicio" element={<TerminosServicio />} />
          <Route path="/eliminar" element={<Eliminar />} />
          <Route path="/pago/:codigoOrden" element={<Pago />} />
        </Routes>
      </main>
      {!isLoginPage && !isPagoPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'google', 'apple'],
        appearance: {
          theme: 'light',
          accentColor: '#66AFFF',
          logo: '/OPTUSLO          accentColor: '#FF7A19',
dWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <Router>
        <AppContent />
      </Router>
    </PrivyProvider>
  );
}

export default App;
