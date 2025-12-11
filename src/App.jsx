import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import './styles/variables.css';
import './styles/global.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out', offset: 100 });       
  }, []);

  return (
    <div className="App">
      {!isLoginPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/login" element={<Login />} />
                  </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

