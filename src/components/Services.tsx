import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useAnimations';
import './Services.css';

// Mock data for events
const events = [
  {
    id: 'doc-1',
    title: 'The Mountain Journey',
    category: 'Documentary',
    description: 'A compelling visual narrative capturing real stories with cinematic depth in the heart of the Himalayas. Shot entirely on RED V-Raptor.',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
    tags: ['Narrative', 'Wildlife', '8K', 'Post-Production'],
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'comm-1',
    title: 'Speed & Style',
    category: 'Commercial',
    description: 'High-impact commercial content that elevates the brand. Studio and on-location shoots with premium production value for Porsche.',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['TVC', 'Automotive', 'Action', 'Brand Films'],
    gallery: [
      'https://images.unsplash.com/photo-1503376712353-c045b5465224?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'conc-1',
    title: 'Neon Nights',
    category: 'Mega Concert',
    description: 'Multi-camera live event coverage for the Coldplay concert in Mumbai. We captured every moment with an 8-camera setup.',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['Multi-Cam', 'Live Music', 'Aerial', 'Stage Coverage'],
    gallery: [
      'https://images.unsplash.com/photo-1540039155733-d7696d4eb98b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c090be5f524?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'brand-1',
    title: 'Launch 2026',
    category: 'Brand Experience',
    description: 'Immersive brand activations and corporate event coverage for the Apple product launch. Creating memorable visual experiences.',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['Events', 'Activations', 'Corporate', 'Live Stream'],
    gallery: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721028070-2051152cbceb?auto=format&fit=crop&w=800&q=80'
    ]
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<typeof events[0] | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (eventId: string) => {
    setHoveredEventId(eventId);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    
    // Trigger expanded box after 1 second hover
    hoverTimer.current = setTimeout(() => {
      const event = events.find(e => e.id === eventId);
      if (event) {
        setExpandedEvent(event);
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    setHoveredEventId(null);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  };

  const handleCardClick = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setExpandedEvent(event);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
  };

  const closeExpanded = () => {
    setExpandedEvent(null);
    document.body.style.overflow = 'auto'; // Unlock background scroll
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <div className={`services__header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Our Work</p>
          <h2 className="section-title section-title--lg">
            Featured Projects<br />
            & Events
          </h2>
          <p className="section-description" style={{ marginTop: '20px' }}>
            From intimate documentaries to large-scale concert productions, explore
            our cinematic excellence across every format and genre.
          </p>
        </div>

        {/* Horizontal Slider */}
        <div className="services__slider-container">
          <div className="services__slider">
            {events.map((service, i) => (
              <article
                key={service.id}
                className={`services__card animate-on-scroll delay-${i + 1} ${isVisible ? 'visible' : ''} ${hoveredEventId === service.id ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick(service.id)}
              >
                <div className="services__card-media">
                  {/* Video plays automatically on hover */}
                  <video 
                    src={service.videoSrc} 
                    muted 
                    loop 
                    playsInline 
                    autoPlay={hoveredEventId === service.id}
                    className="services__card-video"
                  />
                  <div className="services__card-overlay" />
                  <div className="services__badge">{service.category}</div>
                </div>
                <div className="services__card-content">
                  <h3 className="services__card-title">{service.title}</h3>
                  <div className="services__card-tags">
                    {service.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="services__tag">{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Progress bar to indicate hover duration until expansion */}
                <div className={`services__hover-progress ${hoveredEventId === service.id ? 'active' : ''}`} />
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Detailed Modal */}
      {expandedEvent && (
        <div className="services__modal-overlay" onClick={closeExpanded}>
          <div className="services__modal" onClick={e => e.stopPropagation()}>
            <button className="services__modal-close" onClick={closeExpanded}>×</button>
            
            <div className="services__modal-media">
              <video 
                src={expandedEvent.videoSrc} 
                controls
                autoPlay 
                muted={false}
                className="services__modal-video"
              />
            </div>
            
            <div className="services__modal-body">
              <div className="services__modal-header">
                <span className="services__badge">{expandedEvent.category}</span>
                <h3 className="services__modal-title">{expandedEvent.title}</h3>
              </div>
              
              <div className="services__modal-tags">
                {expandedEvent.tags.map(tag => (
                  <span key={tag} className="services__tag">{tag}</span>
                ))}
              </div>
              
              <p className="services__modal-desc">{expandedEvent.description}</p>
              
              <h4 className="services__gallery-title">Event Gallery</h4>
              <div className="services__gallery">
                {expandedEvent.gallery.map((img, index) => (
                  <img key={index} src={img} alt={`Gallery image ${index + 1}`} loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
