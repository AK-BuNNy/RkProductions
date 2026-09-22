import { useScrollAnimation, buildWhatsAppUrl } from '../hooks/useAnimations';
import gearCamera1 from '../assets/gear_camera_1.jpg';
import gearCamera2 from '../assets/gear_camera_2.jpg';
import gearCamera3 from '../assets/gear_camera_3.jpg';
import gearCamera4 from '../assets/gear_camera_4.jpg';
import gearLens from '../assets/gear_lens.jpg';
import gearLighting from '../assets/gear_lighting.jpg';
import gearGimbal from '../assets/gear_gimbal.jpg';
import gearDrone from '../assets/gear_drone.jpg';
import './GearRentals.css';

const gearItems = [
  {
    id: 'fx3',
    name: 'Sony FX3',
    category: 'Cinema Camera',
    price: '₹5,000',
    pricePer: '/day',
    image: gearCamera3, // Reusing existing import for camera
    specs: ['4K 120fps', 'Full Frame', 'Dual Base ISO'],
  },
  {
    id: 'lens-70-200',
    name: 'Sony FE 70-200mm f/2.8 GM',
    category: 'Lenses',
    price: '₹2,500',
    pricePer: '/day',
    image: gearLens, // Reusing existing import for lens
    specs: ['G Master Quality', 'Fast Autofocus', 'E-Mount'],
  },
  {
    id: 'gimbal-rs5',
    name: 'DJI RS 5',
    category: 'Stabilizer',
    price: '₹3,000',
    pricePer: '/day',
    image: gearGimbal, // Reusing existing import for gimbal
    specs: ['Heavy Payload', 'LiDAR Autofocus', 'Carbon Fiber Build'],
  },
  {
    id: 'lighting-kit',
    name: 'Pro Lighting Setup',
    category: 'Lighting',
    price: '₹4,000',
    pricePer: '/day',
    image: gearLighting, // Reusing existing import for lighting
    specs: ['High CRI LEDs', 'Softboxes', 'C-Stands Included'],
  },
];

export default function GearRentals() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  const handleEnquiry = (gearName: string) => {
    const message = `Hi RK Production! 👋\n\nI'm interested in renting the *${gearName}*.\n\nCould you share availability and pricing details?\n\nThank you!`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <section className="gear" id="gear" ref={ref}>
      <div className="container">
        <div className={`gear__header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Equipment</p>
          <h2 className="section-title section-title--lg">
            Camera Gear Rentals<br />
            <span style={{ color: 'var(--accent-gold)' }}>Bangalore</span>
          </h2>
          <p className="section-description" style={{ marginTop: '20px' }}>
            Industry-standard cinema cameras, lenses, lighting, and support equipment
            available for daily and weekly rental. All gear maintained to the highest standards.
          </p>
        </div>

        <div className="gear__grid">
          {gearItems.map((item, i) => (
            <article
              key={item.id}
              className={`gear__card animate-on-scroll delay-${(i % 4) + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="gear__card-badge">{item.category}</div>
              <div className="gear__card-image">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <div className="gear__card-body">
                <h3 className="gear__card-name">{item.name}</h3>
                <ul className="gear__card-specs">
                  {item.specs.map((spec) => (
                    <li key={spec}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="gear__card-footer">
                  <div className="gear__card-price">
                    <span className="gear__price-value">{item.price}</span>
                    <span className="gear__price-per">{item.pricePer}</span>
                  </div>
                  <button
                    className="btn btn--primary gear__card-btn"
                    onClick={() => handleEnquiry(item.name)}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
