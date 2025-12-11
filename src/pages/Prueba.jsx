import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Prueba.css';

function Prueba() {
  return (
    <>
      <Navbar />
      <div className="prueba-page" style={{ backgroundColor: 'red', minHeight: '100vh' }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: '5rem' }}>PÁGINA PRUEBA - SIN FOOTER</h1>
          <p style={{ color: 'yellow', fontSize: '2rem' }}>Si ves un footer abajo, NO es de esta página</p>
        </div>
      </div>
      
    </>
  );
}

export default Prueba;