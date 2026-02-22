import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  useEffect(() => {
    // === ANIMACIÓN MALLA DE PUNTOS OPTUS HORIZONTAL ===
    const x_max = 42;
    const y_max = 8;
    const grid_el = document.getElementById('dot-grid');
    
    if (!grid_el) return;

    const generateGrid = () => {
      grid_el.innerHTML = ''; // Limpiar grid existente
      for (let y = 0; y < y_max; y++) {
        const row_el = document.createElement('div');
        row_el.classList.add('row');
        for (let x = 0; x < x_max; x++) {
          const cell_el = document.createElement('div');
          cell_el.classList.add('cell');
          cell_el.setAttribute('data-x', x);
          cell_el.setAttribute('data-y', y);
          row_el.appendChild(cell_el);
        }
        grid_el.appendChild(row_el);
      }
    };
    generateGrid();

    const rows = [...document.querySelectorAll('#dot-grid .row')];
    const cells = [...document.querySelectorAll('#dot-grid .cell')];

    // Matriz horizontal: y (filas) x (columnas)
    const TEXT_SHAPE = [];
    for (let y = 0; y < y_max; y++) {
      TEXT_SHAPE[y] = Array(x_max).fill(0);
    }

    // O (columnas 2-8)
    TEXT_SHAPE[1][2] = 0; TEXT_SHAPE[1][3] = 1; TEXT_SHAPE[1][4] = 1; TEXT_SHAPE[1][5] = 1; TEXT_SHAPE[1][6] = 1; TEXT_SHAPE[1][7] = 1; TEXT_SHAPE[1][8] = 0;
    TEXT_SHAPE[2][2] = 1; TEXT_SHAPE[2][3] = 1; TEXT_SHAPE[2][4] = 1; TEXT_SHAPE[2][5] = 0; TEXT_SHAPE[2][6] = 1; TEXT_SHAPE[2][7] = 1; TEXT_SHAPE[2][8] = 1;
    TEXT_SHAPE[3][2] = 1; TEXT_SHAPE[3][3] = 1; TEXT_SHAPE[3][4] = 0; TEXT_SHAPE[3][5] = 0; TEXT_SHAPE[3][6] = 0; TEXT_SHAPE[3][7] = 1; TEXT_SHAPE[3][8] = 1;
    TEXT_SHAPE[4][2] = 1; TEXT_SHAPE[4][3] = 1; TEXT_SHAPE[4][4] = 0; TEXT_SHAPE[4][5] = 0; TEXT_SHAPE[4][6] = 0; TEXT_SHAPE[4][7] = 1; TEXT_SHAPE[4][8] = 1;
    TEXT_SHAPE[5][2] = 1; TEXT_SHAPE[5][3] = 1; TEXT_SHAPE[5][4] = 1; TEXT_SHAPE[5][5] = 0; TEXT_SHAPE[5][6] = 1; TEXT_SHAPE[5][7] = 1; TEXT_SHAPE[5][8] = 1;
    TEXT_SHAPE[6][2] = 0; TEXT_SHAPE[6][3] = 1; TEXT_SHAPE[6][4] = 1; TEXT_SHAPE[6][5] = 1; TEXT_SHAPE[6][6] = 1; TEXT_SHAPE[6][7] = 1; TEXT_SHAPE[6][8] = 0;
    
    // P (columnas 10-16)
    TEXT_SHAPE[1][10] = 0; TEXT_SHAPE[1][11] = 1; TEXT_SHAPE[1][12] = 1; TEXT_SHAPE[1][13] = 1; TEXT_SHAPE[1][14] = 1; TEXT_SHAPE[1][15] = 1; TEXT_SHAPE[1][16] = 0;
    TEXT_SHAPE[2][10] = 1; TEXT_SHAPE[2][11] = 1; TEXT_SHAPE[2][12] = 1; TEXT_SHAPE[2][13] = 1; TEXT_SHAPE[2][14] = 1; TEXT_SHAPE[2][15] = 1; TEXT_SHAPE[2][16] = 1;
    TEXT_SHAPE[3][10] = 1; TEXT_SHAPE[3][11] = 1; TEXT_SHAPE[3][12] = 1; TEXT_SHAPE[3][13] = 0; TEXT_SHAPE[3][14] = 0; TEXT_SHAPE[3][15] = 1; TEXT_SHAPE[3][16] = 1;
    TEXT_SHAPE[4][10] = 1; TEXT_SHAPE[4][11] = 1; TEXT_SHAPE[4][12] = 1; TEXT_SHAPE[4][13] = 1; TEXT_SHAPE[4][14] = 1; TEXT_SHAPE[4][15] = 1; TEXT_SHAPE[4][16] = 1;
    TEXT_SHAPE[5][10] = 0; TEXT_SHAPE[5][11] = 1; TEXT_SHAPE[5][12] = 1; TEXT_SHAPE[5][13] = 1; TEXT_SHAPE[5][14] = 1; TEXT_SHAPE[5][15] = 1; TEXT_SHAPE[5][16] = 0;
    TEXT_SHAPE[6][10] = 0; TEXT_SHAPE[6][11] = 1; TEXT_SHAPE[6][12] = 1; TEXT_SHAPE[6][13] = 0; TEXT_SHAPE[6][14] = 0; TEXT_SHAPE[6][15] = 0; TEXT_SHAPE[6][16] = 0;

    // T (columnas 18-24)
    TEXT_SHAPE[1][18] = 1; TEXT_SHAPE[1][19] = 1; TEXT_SHAPE[1][20] = 1; TEXT_SHAPE[1][21] = 1; TEXT_SHAPE[1][22] = 1; TEXT_SHAPE[1][23] = 1; TEXT_SHAPE[1][24] = 1;
    TEXT_SHAPE[2][18] = 1; TEXT_SHAPE[2][19] = 1; TEXT_SHAPE[2][20] = 1; TEXT_SHAPE[2][21] = 1; TEXT_SHAPE[2][22] = 1; TEXT_SHAPE[2][23] = 1; TEXT_SHAPE[2][24] = 1;
    TEXT_SHAPE[3][18] = 0; TEXT_SHAPE[3][19] = 0; TEXT_SHAPE[3][20] = 1; TEXT_SHAPE[3][21] = 1; TEXT_SHAPE[3][22] = 1; TEXT_SHAPE[3][23] = 0; TEXT_SHAPE[3][24] = 0;
    TEXT_SHAPE[4][18] = 0; TEXT_SHAPE[4][19] = 0; TEXT_SHAPE[4][20] = 1; TEXT_SHAPE[4][21] = 1; TEXT_SHAPE[4][22] = 1; TEXT_SHAPE[4][23] = 0; TEXT_SHAPE[4][24] = 0;
    TEXT_SHAPE[5][18] = 0; TEXT_SHAPE[5][19] = 0; TEXT_SHAPE[5][20] = 1; TEXT_SHAPE[5][21] = 1; TEXT_SHAPE[5][22] = 1; TEXT_SHAPE[5][23] = 0; TEXT_SHAPE[5][24] = 0;
    TEXT_SHAPE[6][18] = 0; TEXT_SHAPE[6][19] = 0; TEXT_SHAPE[6][20] = 1; TEXT_SHAPE[6][21] = 1; TEXT_SHAPE[6][22] = 1; TEXT_SHAPE[6][23] = 0; TEXT_SHAPE[6][24] = 0;

    // U (columnas 26-33)
    TEXT_SHAPE[1][26] = 1; TEXT_SHAPE[1][27] = 1; TEXT_SHAPE[1][28] = 0; TEXT_SHAPE[1][29] = 0; TEXT_SHAPE[1][30] = 0; TEXT_SHAPE[1][31] = 1; TEXT_SHAPE[1][32] = 1;
    TEXT_SHAPE[2][26] = 1; TEXT_SHAPE[2][27] = 1; TEXT_SHAPE[2][28] = 0; TEXT_SHAPE[2][29] = 0; TEXT_SHAPE[2][30] = 0; TEXT_SHAPE[2][31] = 1; TEXT_SHAPE[2][32] = 1;
    TEXT_SHAPE[3][26] = 1; TEXT_SHAPE[3][27] = 1; TEXT_SHAPE[3][28] = 0; TEXT_SHAPE[3][29] = 0; TEXT_SHAPE[3][30] = 0; TEXT_SHAPE[3][31] = 1; TEXT_SHAPE[3][32] = 1; 
    TEXT_SHAPE[4][26] = 1; TEXT_SHAPE[4][27] = 1; TEXT_SHAPE[4][28] = 0; TEXT_SHAPE[4][29] = 0; TEXT_SHAPE[4][30] = 0; TEXT_SHAPE[4][31] = 1; TEXT_SHAPE[4][32] = 1;
    TEXT_SHAPE[5][26] = 1; TEXT_SHAPE[5][27] = 1; TEXT_SHAPE[5][28] = 1; TEXT_SHAPE[5][29] = 1; TEXT_SHAPE[5][30] = 1; TEXT_SHAPE[5][31] = 1; TEXT_SHAPE[5][32] = 1; 
    TEXT_SHAPE[6][26] = 0; TEXT_SHAPE[6][27] = 1; TEXT_SHAPE[6][28] = 1; TEXT_SHAPE[6][29] = 1; TEXT_SHAPE[6][30] = 1; TEXT_SHAPE[6][31] = 1; TEXT_SHAPE[6][32] = 0;

    // S (columnas 35-41)
    TEXT_SHAPE[1][35] = 1; TEXT_SHAPE[1][36] = 1; TEXT_SHAPE[1][37] = 1; TEXT_SHAPE[1][38] = 1; TEXT_SHAPE[1][39] = 1; TEXT_SHAPE[1][40] = 1; TEXT_SHAPE[1][41] = 1;
    TEXT_SHAPE[2][35] = 1; TEXT_SHAPE[2][36] = 1; TEXT_SHAPE[2][37] = 1; TEXT_SHAPE[2][38] = 0; TEXT_SHAPE[2][39] = 0; TEXT_SHAPE[2][40] = 0; TEXT_SHAPE[2][41] = 0;
    TEXT_SHAPE[3][35] = 1; TEXT_SHAPE[3][36] = 1; TEXT_SHAPE[3][37] = 1; TEXT_SHAPE[3][38] = 0; TEXT_SHAPE[3][39] = 0; TEXT_SHAPE[3][40] = 0; TEXT_SHAPE[3][41] = 0;
    TEXT_SHAPE[4][35] = 1; TEXT_SHAPE[4][36] = 1; TEXT_SHAPE[4][37] = 1; TEXT_SHAPE[4][38] = 1; TEXT_SHAPE[4][39] = 1; TEXT_SHAPE[4][40] = 1; TEXT_SHAPE[4][41] = 1;
    TEXT_SHAPE[5][35] = 0; TEXT_SHAPE[5][36] = 0; TEXT_SHAPE[5][37] = 0; TEXT_SHAPE[5][38] = 0; TEXT_SHAPE[5][39] = 1; TEXT_SHAPE[5][40] = 1; TEXT_SHAPE[5][41] = 1;
    TEXT_SHAPE[6][35] = 1; TEXT_SHAPE[6][36] = 1; TEXT_SHAPE[6][37] = 1; TEXT_SHAPE[6][38] = 1; TEXT_SHAPE[6][39] = 1; TEXT_SHAPE[6][40] = 1; TEXT_SHAPE[6][41] = 1;

    let clicked = false;
    let reset_all = false;
    const pull_distance = 120;

    const updateCellPositions = () => {
      cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        cell.center_position = {
          x: (rect.left + rect.right) / 2,
          y: (rect.top + rect.bottom) / 2,
        };
      });
    };

    const handleCellClick = (e, i) => {
      if (clicked) return;
      clicked = true;
      
      // Animación de dispersión sin physics2D
      cells.forEach((cell, index) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 400 + Math.random() * 600;
        const distance = velocity / 2;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        gsap.to(cell, {
          duration: 1.6,
          x: tx,
          y: ty + 800, // Simula gravedad
          rotation: Math.random() * 360,
          opacity: 0,
          ease: "power2.out",
          delay: ((x_max * y_max) - Math.abs(index - i)) / (x_max * y_max) * 0.3,
          onComplete: function() {
            // Revertir animación
            gsap.to(cell, {
              duration: 1.3,
              x: 0,
              y: 0,
              rotation: 0,
              opacity: cell.classList.contains('cell-text') ? 0.9 : 
                      cell.classList.contains('cell-bg') ? 0.5 : 0.05,
              ease: "elastic.out(1, 0.3)",
              onComplete: () => {
                if (index === cells.length - 1) {
                  clicked = false;
                  reset_all = true;
                  handlePointerMove();
                }
              }
            });
          }
        });
      });
    };

    const handlePointerMove = (e = { pageX: -pull_distance, pageY: -pull_distance }) => {
      if (clicked) return;
      const pointer_x = e.pageX || -pull_distance;
      const pointer_y = e.pageY || -pull_distance;
      cells.forEach((cell, i) => {
        const diff_x = pointer_x - cell.center_position.x;
        const diff_y = pointer_y - cell.center_position.y;
        const distance = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
        if (distance < pull_distance) {
          const percent = distance / pull_distance;
          cell.pulled = true;
          gsap.to(cell, {
            duration: 0.2,
            x: diff_x * percent,
            y: diff_y * percent,
          });
        } else {
          if (!cell.pulled) return;
          cell.pulled = false;
          gsap.to(cell, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
      if (reset_all) {
        reset_all = false;
        cells.forEach((cell) => {
          const cell_x = parseInt(cell.getAttribute('data-x'));
          const cell_y = parseInt(cell.getAttribute('data-y'));
          const shape_val = TEXT_SHAPE[cell_y] ? TEXT_SHAPE[cell_y][cell_x] : 0;
          const is_part_of_text = shape_val === 1;
          const is_part_of_bg = shape_val === 2;
          gsap.to(cell, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)",
            opacity: is_part_of_text ? 0.9 : (is_part_of_bg ? 0.5 : 0.05),
            scale: is_part_of_text || is_part_of_bg ? 1 : 0.2
          });
        });
      }
    };

    const init = () => {
      updateCellPositions();
      window.addEventListener('resize', updateCellPositions);
      window.addEventListener('pointermove', handlePointerMove);
      document.body.addEventListener('pointerleave', () => handlePointerMove());
      cells.forEach((cell, i) => {
        const cell_x = parseInt(cell.getAttribute('data-x'));
        const cell_y = parseInt(cell.getAttribute('data-y'));
        const shape_val = TEXT_SHAPE[cell_y] ? TEXT_SHAPE[cell_y][cell_x] : 0;
        cell.classList.remove('cell-text', 'cell-bg');
        if (shape_val === 1) {
          cell.classList.add('cell-text');
          gsap.set(cell, { opacity: 0.9, scale: 1 });
        } else if (shape_val === 2) {
          cell.classList.add('cell-bg');
          gsap.set(cell, { opacity: 0.5, scale: 1 });
        } else {
          gsap.set(cell, { opacity: 0.05, scale: 0.2 });
        }
        cell.addEventListener('pointerup', (e) => handleCellClick(e, i));
      });
    };

    init();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCellPositions);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-content">
          <h2 data-aos="fade-up">{t('contact.title')}</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            {t('contact.subtitle')}
          </p>
          <div className="contact-cta-group" data-aos="fade-up" data-aos-delay="200">
            <a href="https://wa.me/59177379190" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <i className="fab fa-whatsapp"></i> {t('contact.whatsappBtn')}
            </a>
            <a href="mailto:optus.aut@gmail.com" className="btn btn-secondary btn-lg">
              <i className="fas fa-envelope"></i> {t('contact.emailBtn')}
            </a>
          </div>
          
          <div className="contact-info" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>La Paz, Bolivia</span>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-phone"></i>
              <a href="tel:+59177379190">+591 77379190</a>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:optus.aut@gmail.com">optus.aut@gmail.com</a>
            </div>
          </div>

          <div id="dot-grid" className="dot-grid-container" data-aos="fade-up" data-aos-delay="400"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
