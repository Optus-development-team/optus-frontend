import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import TrustLogos from '../components/sections/TrustLogos';
import WhyOptus from '../components/sections/WhyOptus';
import Contact from '../components/sections/Contact';
import './Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <Hero />
        <TrustLogos />
        <WhyOptus />
        <Contact />
      </div>
    </>
  );
};

export default Home;
