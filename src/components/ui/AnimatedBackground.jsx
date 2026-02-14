import './AnimatedBackground.css';

/**
 * AnimatedBackground Component
 * 
 * Fondo animado con gradientes radiales en movimiento.
 * Se posiciona absolutamente, por lo que el contenedor padre debe tener position: relative
 * 
 * @returns {JSX.Element} Componente de fondo animado
 */
const AnimatedBackground = () => {
  return <div className="animated-background" aria-hidden="true" />;
};

export default AnimatedBackground;
