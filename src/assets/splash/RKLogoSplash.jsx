import React, {useEffect} from 'react';
import './rk-splash.css';

/** Drop this component at the top of your app. It preserves the original logo artwork
 * and adds a lightweight SVG/CSS cinematic reveal. Remove the component after onFinish
 * if you want it to disappear from the DOM. */
export default function RKLogoSplash({ onFinish, duration = 3800 }) {
  useEffect(() => {
    const t = setTimeout(() => onFinish?.(), duration);
    return () => clearTimeout(t);
  }, [onFinish, duration]);
  return (
    <div className="rk-splash">
      <img src="/rk-logo.png" alt="RK Production & Camera Rentals" className="rk-logo" />
      <div className="rk-iris rk-iris-1" />
      <div className="rk-iris rk-iris-2" />
      <div className="rk-sweep" />
    </div>
  );
}
