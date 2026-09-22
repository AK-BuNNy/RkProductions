# RK Production — Website Splash

This package uses the original RK logo artwork without redrawing the lettering, so the typography and camera-aperture mark remain faithful to the supplied logo. The surrounding motion is SVG/CSS vector animation.

## Quickest option
Open `rk-splash.html`. It is completely self-contained and can be adapted directly into a website.

## Production integration
Copy the contents of `rk-splash.html` into your app or extract the `<div id="rk-splash">...</div>` and its CSS/JS. The animation lasts about 3.8 seconds and then fades away. Call `RKLogoSplash.hide()` when your application is ready sooner.

## React
Use `RKLogoSplash.jsx` and `rk-splash.css`. Put the original logo PNG at `public/rk-logo.png`.

The visual treatment is intentionally restrained: aperture rings, subtle particles, a metallic light sweep, a small scale-in, and a clean fade-out. No bounce or cartoon motion.
