import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!canvasRef.current) return;

    const sizes = { width: window.innerWidth, height: window.innerHeight };

    // Escena y Cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Objeto: Icosaedro "Network" - LA FIGURA GEOMÉTRICA 3D
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x0A84FF, // Azul OPTUS
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Partículas internas para dar profundidad
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 6; // Spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x002B5B // Azul profundo de fondo
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Interacción con el Mouse
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animación Loop
    const animate = () => {
      requestAnimationFrame(animate);

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      // Rotación suave de la esfera (icosaedro)
      sphere.rotation.y += 0.005;
      sphere.rotation.x += 0.002;

      // Rotación interactiva con easing
      sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
      sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);

      // Rotación de partículas opuesta
      particlesMesh.rotation.y -= 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Responsive Resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} id="three-canvas"></canvas>
      <div className="container hero-content">
        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
          {t('hero.title').split('Bolivia').map((part, index) => 
            index === 0 ? (
              <span key={index}>
                {part}<span className="bolivia-flag"><span className="bo-red">Bo</span><span className="liv-yellow">liv</span><span className="ia-green">ia</span></span>
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </h1>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
          {t('hero.subtitle')}
        </p>
        <div className="hero-cta-group" data-aos="fade-up" data-aos-delay="500">
          <a href="#contact" className="btn btn-primary btn-lg">
            {t('hero.ctaPrimary')}
          </a>
          <a href="#services" className="btn btn-secondary btn-lg">
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
