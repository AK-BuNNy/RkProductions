import { useScrollAnimation } from '../hooks/useAnimations';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Arjun Mehta',
    role: 'Independent Filmmaker',
    text: 'RK Production transformed our documentary with their exceptional cinematography. The gear quality and crew expertise are unmatched in Bangalore. They understand the craft deeply.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Creative Director, BrandWave',
    text: 'We\'ve worked with RK Production on 12+ commercials. Their attention to detail, lighting setups, and post-production quality consistently exceed our expectations. Truly world-class.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Vikram Rao',
    role: 'Event Producer, LiveNation India',
    text: 'Their concert coverage is spectacular. Multi-camera setups, aerial shots, and live editing — all handled seamlessly. The team delivered a 48-hour turnaround on a major festival.',
    rating: 5,
  },
];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-gold)" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="testimonials" id="about" ref={ref}>
      <div className="container">
        <div className="testimonials__layout">
          <div className={`testimonials__header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
            <p className="section-label">Testimonials</p>
            <h2 className="section-title section-title--lg">
              Built by<br />
              Cinematographers<br />
              <span style={{ color: 'var(--accent-gold)' }}>For Cinematographers</span>
            </h2>
            <p className="section-description" style={{ marginTop: '24px' }}>
              We're filmmakers first. Every service and rental is designed with the
              creator's workflow in mind — because we've been on set thousands of times ourselves.
            </p>
          </div>

          <div className="testimonials__cards">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`testimonials__card animate-on-scroll delay-${i + 1} ${isVisible ? 'visible' : ''}`}
              >
                <QuoteIcon />
                <p className="testimonials__text">{t.text}</p>
                <div className="testimonials__stars">
                  {Array.from({ length: t.rating }, (_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <div className="testimonials__author">
                  <div className="testimonials__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="testimonials__name">{t.name}</p>
                    <p className="testimonials__role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
