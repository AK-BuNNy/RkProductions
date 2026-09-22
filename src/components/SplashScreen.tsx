import { useEffect, useState } from 'react';
import newLogo from '../assets/new_logo.png';
import './SplashScreen.css';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({ onFinish, duration = 3000 }: SplashScreenProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll while splash is active
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        onFinish();
      }, 550); // wait for fade out animation
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onFinish, duration]);

  if (isDone && false) return null; // We let CSS handle the fade out visibility

  return (
    <div className={`splash-container ${isDone ? 'done' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1666 944" role="img" aria-label="RK Production Splash">
        <defs>
          <linearGradient id="splash-gold" x1="0" x2="1">
            <stop offset="0" stopColor="#b47b1c" />
            <stop offset="0.35" stopColor="#F5A623" />
            <stop offset="0.52" stopColor="#ffdb8c" />
            <stop offset="0.7" stopColor="#F5A623" />
            <stop offset="1" stopColor="#8d5b00" />
          </linearGradient>

          <filter id="splash-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Futuristic Lens / Iris Rings */}
        <g className="splash-iris" fill="none" stroke="url(#splash-gold)" strokeLinecap="round">
          <circle cx="833" cy="440" r="355" strokeWidth="1" opacity="0.3" />
          <circle cx="833" cy="440" r="340" strokeWidth="2" opacity="0.5" strokeDasharray="4 8" />
          <circle cx="833" cy="440" r="325" strokeWidth="1" opacity="0.4" strokeDasharray="20 40 10 40" />
          <circle cx="833" cy="440" r="285" strokeWidth="3" opacity="0.15" />
        </g>



        {/* Data points instead of dust */}
        <g className="splash-data-points" fill="#F5A623">
          <circle cx="400" cy="280" r="1.5" />
          <circle cx="1260" cy="240" r="1.5" />
          <circle cx="1370" cy="530" r="1.5" />
          <circle cx="300" cy="620" r="1.5" />
          <circle cx="1180" cy="700" r="1.5" />
          <circle cx="680" cy="150" r="1.5" />
          <circle cx="1030" cy="140" r="1.5" />
        </g>

        <g className="splash-logo-wrap">
          <image x="433" y="246" width="800" height="453" preserveAspectRatio="xMidYMid meet" href={newLogo} />

          {/* Laser Sweep */}

        </g>


      </svg>
    </div>
  );
}
