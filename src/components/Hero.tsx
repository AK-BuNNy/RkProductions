import { useCountUp } from '../hooks/useAnimations';
import heroBg from '../assets/hero_bg.jpg';
import logo from '../assets/new_logo.png';
import './Hero.css';

const stats = [
  { value: 160, suffix: '+', label: 'Projects Delivered' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 48, suffix: ' Hr', label: 'Quick Turnaround' },
  { value: 99.8, suffix: '%', label: 'Client Satisfaction' },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const isDecimal = value % 1 !== 0;
  const target = isDecimal ? Math.floor(value * 10) : value;
  const { count, ref } = useCountUp(target, 2500);

  const display = isDecimal
    ? (count / 10).toFixed(1)
    : count.toString();

  return (
    <div className="hero__stat" ref={ref}>
      <span className="hero__stat-value">
        {display}<span className="hero__stat-suffix">{suffix}</span>
      </span>
      <span className="hero__stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src={heroBg} alt="Cinematic film production set" className="hero__bg-img" />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <p className="section-label">RK Production • Bangalore</p>
          <h1 className="hero__title">
            Cinematic{' '}
            <span className="hero__title-accent">Storytelling</span>
            <br />
            & Industry-Grade{' '}
            <span className="hero__title-accent">Rentals.</span>
          </h1>
          <p className="hero__subtitle">
            Top-tier cinematography services and professional camera gear rentals
            for filmmakers, agencies, and production houses across Bangalore.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Book a Consultation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#gear" className="btn btn--outline">
              Explore Gear
            </a>
          </div>
        </div>

        <div className="hero__stats">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
