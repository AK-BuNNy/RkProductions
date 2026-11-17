import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useAnimations';
import './Services.css';

export interface EventItem {
  id: string;
  title: string;
  category: string;
  description: string;
  // Thumbnail image shown on the card before hover (e.g. /thumbnails/cover.jpg)
  thumbnail?: string;
  // Supports: Google Drive preview/view links, YouTube, Vimeo, or direct MP4/WebM files
  videoSrc: string;
  // Optional lightweight teaser (e.g. 1-3MB MP4) for card hover preview
  previewSrc?: string;
  // Optional alias for thumbnail
  poster?: string;
  tags: string[];
  gallery?: string[];
}

export interface VideoSourceInfo {
  type: 'drive' | 'youtube' | 'vimeo' | 'direct';
  embedUrl: string;
  thumbnailUrl?: string;
}

/**
 * Automatically inspects a video URL to detect Google Drive, YouTube, Vimeo,
 * or direct video files, and produces the corresponding embed/preview URL.
 */
export function parseVideoSource(url: string): VideoSourceInfo {
  if (!url) return { type: 'direct', embedUrl: '' };

  // Google Drive (view, open, preview, or direct formats)
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]+)/;
  const driveMatch = url.match(driveRegex);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return {
      type: 'drive',
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`
    };
  }

  // YouTube (standard, shorts, embed, or youtu.be)
  const ytRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
    };
  }

  // Direct video file (.mp4, .webm, local /videos/..., etc.)
  return {
    type: 'direct',
    embedUrl: url
  };
}

// Sample events data
const events: EventItem[] = [
  {
    id: 'doc-1',
    title: 'KAANALIN THAAGAM',
    category: 'Short Film',
    description: 'Every frame tells a story, every moment captures an emotion. Through cinematic visuals, creative cinematography, and thoughtful storytelling, this short film brings ideas and emotions to life, creating an immersive experience that connects with the audience.',
    thumbnail: '/thumbnails/kaanalin-thaagam_thump.png',
    videoSrc: '/videos/kaanalin thaagam teaser.mp4',
    previewSrc: '/videos/kaanalin thaagam teaser_hover.mp4',
    tags: ['Cinematic', 'Short Film', 'Drama', 'Emotional'],
  },
  {
    id: 'comm-1',
    title: 'More than just a property, it’s a lifestyle.',
    category: 'Real Estate',
    description: 'A cinematic showcase of exceptional architecture, elegant interiors, and thoughtfully designed spaces. Captured with a creative eye to bring every detail and experience to life.',
    thumbnail: '/thumbnails/real estate thump1.png',
    videoSrc: '/videos/1768709495680465 (2).mp4',
    previewSrc: '/videos/1768709495680465 (2)_hover.mp4',
    tags: ['Cinematic', 'Real Estate', 'Architecture', 'Interior Design'],
  },
  {
    id: 'conc-1',
    title: 'Every property has a story. We make it unforgettable.',
    category: 'Real Estate',
    description: 'A cinematic showcase of exceptional architecture, elegant interiors, and thoughtfully designed spaces. Captured with a creative eye to bring every detail and experience to life.',
    thumbnail: '/thumbnails/Video-23653_thump.png',
    videoSrc: '/videos/Video-23653.mp4',
    previewSrc: '/videos/Video-23653_hover.mp4',
    tags: ['Cinematic', 'Real Estate', 'Architecture', 'Interior Design'],
  }
];

function CardMedia({ event, isHovered }: { event: EventItem; isHovered: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoInfo = parseVideoSource(event.videoSrc);
  const directVideoUrl = event.previewSrc || (videoInfo.type === 'direct' ? event.videoSrc : null);
  const thumbnailImg = event.thumbnail || event.poster || videoInfo.thumbnailUrl || (event.gallery && event.gallery[0]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered && directVideoUrl) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, directVideoUrl]);

  return (
    <div className="services__card-media">
      {/* 1. Static Thumbnail (Visible before hover) */}
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt={event.title}
          className={`services__card-thumbnail ${isHovered && directVideoUrl ? 'services__card-thumbnail--fade' : ''}`}
          loading="lazy"
        />
      ) : (
        <div className="services__card-placeholder">
          <span>{event.title}</span>
        </div>
      )}

      {/* 2. Hover Video Preview (Cross-fades in and plays on hover) */}
      {directVideoUrl && (
        <video
          ref={videoRef}
          src={directVideoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className={`services__card-video ${isHovered ? 'services__card-video--active' : ''}`}
        />
      )}

      {/* Gradient Vignette Overlay & Badges */}
      <div className="services__card-overlay" />
      <div className="services__badge">{event.category}</div>

      <div className={`services__play-pill ${isHovered ? 'services__play-pill--hovered' : ''}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span>{directVideoUrl && isHovered ? 'Playing' : 'Preview'}</span>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<EventItem | null>(null);
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

  // Keyboard shortcut (Escape) to close modal and timer cleanup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedEvent) {
        closeExpanded();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      document.body.style.overflow = 'auto';
    };
  }, [expandedEvent]);

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
                <CardMedia event={service} isHovered={hoveredEventId === service.id} />
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
      {expandedEvent && (() => {
        const videoInfo = parseVideoSource(expandedEvent.videoSrc);
        return (
          <div className="services__modal-overlay" onClick={closeExpanded}>
            <div className="services__modal" onClick={e => e.stopPropagation()}>
              <button className="services__modal-close" onClick={closeExpanded} aria-label="Close modal">×</button>

              <div className="services__modal-media">
                {videoInfo.type === 'direct' ? (
                  <video
                    src={expandedEvent.videoSrc}
                    poster={expandedEvent.thumbnail || expandedEvent.poster}
                    controls
                    autoPlay
                    muted={false}
                    playsInline
                    preload="auto"
                    className="services__modal-video"
                  />
                ) : (
                  <iframe
                    src={videoInfo.embedUrl}
                    className="services__modal-iframe"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={expandedEvent.title}
                  />
                )}
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

                {Boolean(expandedEvent.gallery && expandedEvent.gallery.length > 0) && (
                  <>
                    <h4 className="services__gallery-title">Event Gallery</h4>
                    <div className="services__gallery">
                      {expandedEvent.gallery!.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Gallery image ${index + 1}`}
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
