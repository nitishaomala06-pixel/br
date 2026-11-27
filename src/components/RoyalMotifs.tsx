import React, { useEffect, useRef } from 'react';
import { EventIllustrationType } from '../types/wedding';

export const LotusMandalaDivider: React.FC<{ className?: string; light?: boolean }> = ({
  className = '',
  light = false,
}) => {
  const stroke = light ? '#E6CE97' : '#A97E2A';
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span
        className="h-px flex-1 max-w-28"
        style={{
          background: `linear-gradient(to right, transparent, ${stroke})`,
        }}
      />
      <svg
        width="54"
        height="28"
        viewBox="0 0 54 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M27 3C24 9 23 15 27 21C31 15 30 9 27 3Z"
          stroke={stroke}
          strokeWidth="1.2"
        />
        <path
          d="M27 21C21 18 17 12 18 7C22 10 25 14 27 21Z"
          stroke={stroke}
          strokeWidth="1.15"
        />
        <path
          d="M27 21C33 18 37 12 36 7C32 10 29 14 27 21Z"
          stroke={stroke}
          strokeWidth="1.15"
        />
        <path
          d="M27 21C19 21 12 17 10 12C15 13 21 16 27 21Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <path
          d="M27 21C35 21 42 17 44 12C39 13 33 16 27 21Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <circle cx="27" cy="24.5" r="1.5" fill={stroke} />
        <circle cx="5" cy="14" r="1.2" fill={stroke} />
        <circle cx="49" cy="14" r="1.2" fill={stroke} />
      </svg>
      <span
        className="h-px flex-1 max-w-28"
        style={{
          background: `linear-gradient(to left, transparent, ${stroke})`,
        }}
      />
    </div>
  );
};

export const CornerFiligree: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#C69B45',
}) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 76V26C4 13.85 13.85 4 26 4H76" stroke={color} strokeWidth="1.2" />
    <path d="M11 76V30C11 19.5 19.5 11 30 11H76" stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />
    <path
      d="M17 17C22 17 26 21 26 26C21 26 17 22 17 17Z"
      stroke={color}
      strokeWidth="1.1"
    />
    <circle cx="10" cy="10" r="2" fill={color} />
    <circle cx="38" cy="7.5" r="1.3" fill={color} />
    <circle cx="7.5" cy="38" r="1.3" fill={color} />
  </svg>
);

export const JharokhaArchTop: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#C69B45',
}) => (
  <svg
    viewBox="0 0 360 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M8 54C26 54 38 42 54 32C70 22 90 22 108 30C124 20 140 16 156 22C168 12 174 6 180 3C186 6 192 12 204 22C220 16 236 20 252 30C270 22 290 22 306 32C322 42 334 54 352 54"
      stroke={color}
      strokeWidth="1.35"
    />
    <path
      d="M24 54C42 54 54 44 68 36C82 28 98 28 114 35C128 26 144 23 158 28C168 20 175 14 180 11C185 14 192 20 202 28C216 23 232 26 246 35C262 28 278 28 292 36C306 44 318 54 336 54"
      stroke={color}
      strokeWidth="0.85"
      strokeOpacity="0.6"
    />
    <circle cx="180" cy="3" r="2.2" fill={color} />
    <circle cx="108" cy="30" r="1.5" fill={color} />
    <circle cx="252" cy="30" r="1.5" fill={color} />
  </svg>
);

export const GaneshEmblem: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-16',
  color = '#C69B45',
}) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Sacred Ganesh Emblem"
  >
    <circle cx="40" cy="40" r="35" stroke={color} strokeWidth="0.9" strokeOpacity="0.45" />
    <circle cx="40" cy="40" r="31" stroke={color} strokeWidth="0.6" strokeDasharray="2 3" strokeOpacity="0.55" />
    <path d="M31 24L40 12L49 24H31Z" stroke={color} strokeWidth="1.35" strokeLinejoin="round" />
    <path d="M34 24H46" stroke={color} strokeWidth="1.35" />
    <circle cx="40" cy="10" r="1.7" fill={color} />
    <path d="M40 28V33" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="40" cy="35" r="1.2" fill={color} />
    <path
      d="M29 31C21 31 18 38 20 45C22 50 27 50 30 46"
      stroke={color}
      strokeWidth="1.35"
      strokeLinecap="round"
    />
    <path
      d="M51 31C59 31 62 38 60 45C58 50 53 50 50 46"
      stroke={color}
      strokeWidth="1.35"
      strokeLinecap="round"
    />
    <path
      d="M30 33C30 27 50 27 50 33C50 40 45 43 43 48C41 53 45 58 50 56C53 55 53 51 50 50"
      stroke={color}
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="35.5" cy="35.5" r="1.15" fill={color} />
    <circle cx="44.5" cy="35.5" r="1.15" fill={color} />
    <path d="M24 62C30 59 50 59 56 62" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M29 66C35 64 45 64 51 66" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const EventIllustration: React.FC<{
  type: EventIllustrationType;
  className?: string;
  lightMode?: boolean;
}> = ({ type, className = 'w-14 h-14', lightMode = false }) => {
  const stroke = lightMode ? '#E6CE97' : '#A97E2A';
  const accent = lightMode ? '#F3D89B' : '#631629';

  switch (type) {
    case 'haldi':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M12 34C12 45 20 52 32 52C44 52 52 45 52 34H12Z" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M9 34H55" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 52L20 56H44L42 52" stroke="#CA8A04" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M19 34C22 28 28 26 32 29C36 26 42 28 45 34" stroke="#EA580C" strokeWidth="1.4" />
          <path d="M32 28C32 21 38 14 44 13C43 20 38 26 32 28Z" stroke="#4D7C0F" strokeWidth="1.3" />
          <path d="M32 28C32 21 26 14 20 13C21 20 26 26 32 28Z" stroke="#4D7C0F" strokeWidth="1.3" />
          <circle cx="32" cy="17" r="3" stroke="#EC4899" strokeWidth="1.3" fill="#FACC15" fillOpacity="0.55" />
          {/* Sunshine rays */}
          <path d="M32 8V11M18 11L20 13M46 11L44 13" stroke="#EAB308" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    case 'mehendi':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M32 10C43 10 50 19 50 30C50 43 39 53 26 53C17 53 13 46 16 39C19 33 26 34 26 40"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="29" r="4" stroke={stroke} strokeWidth="1.35" />
          <circle cx="32" cy="29" r="1.4" fill={accent} />
        </svg>
      );

    case 'sangeet':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="15" y="29" width="8" height="23" stroke="#E6CE97" strokeWidth="1.35" />
          <path d="M19 29V25" stroke="#E6CE97" strokeWidth="1.2" />
          <path d="M19 15C21.5 18.5 22 22 19 24.5C16 22 16.5 18.5 19 15Z" stroke="#FBBF24" strokeWidth="1.35" fill="#FDE68A" fillOpacity="0.45" />
          <rect x="41" y="33" width="8" height="19" stroke="#D1D5DB" strokeWidth="1.35" />
          <path d="M45 33V29" stroke="#D1D5DB" strokeWidth="1.2" />
          <path d="M45 19C47.5 22.5 48 26 45 28.5C42 26 42.5 22.5 45 19Z" stroke="#FBBF24" strokeWidth="1.35" fill="#FDE68A" fillOpacity="0.45" />
          <path d="M31 38V17L39 14V34" stroke="#E6CE97" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28.5" cy="39" r="3" stroke="#E6CE97" strokeWidth="1.4" />
          <circle cx="36.5" cy="35" r="3" stroke="#D1D5DB" strokeWidth="1.4" />
          <path d="M11 52H53" stroke="#C69B45" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'varmala':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 14C14 34 21 48 30 48C39 48 44 34 44 14"
            stroke="#9F1239"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M20 14C20 34 25 48 34 48C43 48 50 34 50 14"
            stroke="#EA580C"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <circle cx="17" cy="24" r="2.6" fill="#BE185D" fillOpacity="0.85" />
          <circle cx="47" cy="24" r="2.6" fill="#F26B5B" fillOpacity="0.85" />
          <circle cx="32" cy="48" r="3.4" stroke="#9F1239" strokeWidth="1.2" fill="#FDE047" fillOpacity="0.55" />
          <circle cx="23" cy="39" r="2.2" fill="#E11D48" />
          <circle cx="41" cy="39" r="2.2" fill="#E11D48" />
          <path d="M27 14C29 9 35 9 37 14" stroke="#9F1239" strokeWidth="1.3" />
        </svg>
      );

    case 'pheras':
    case 'wedding':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M12 54V22C18 15 26 13 32 8C38 13 46 15 52 22V54" stroke="#C69B45" strokeWidth="1.5" />
          <path d="M8 54H56" stroke="#5F6F3A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 54V26C23 20 28 18 32 14C36 18 41 20 46 26V54" stroke="#5F6F3A" strokeWidth="1.1" strokeOpacity="0.65" />
          <path
            d="M32 26C37 33 38 39 32 45C26 39 27 33 32 26Z"
            stroke="#C2410C"
            strokeWidth="1.5"
            fill="#FDBA74"
            fillOpacity="0.45"
            strokeLinejoin="round"
          />
          <path d="M23 48H41L38 54H26L23 48Z" stroke="#C69B45" strokeWidth="1.35" strokeLinejoin="round" />
          <circle cx="32" cy="8" r="2" fill="#C69B45" />
        </svg>
      );

    case 'reception':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M32 8V18" stroke={stroke} strokeWidth="1.4" />
          <path d="M16 26C16 20 23 18 32 18C41 18 48 20 48 26" stroke={stroke} strokeWidth="1.4" />
          <path d="M12 32H52" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M20 32L24 44H40L44 32" stroke={stroke} strokeWidth="1.3" />
          <path d="M26 44L32 52L38 44" stroke={accent} strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="20" stroke={stroke} strokeWidth="1.4" />
          <path d="M32 16L36 28L48 32L36 36L32 48L28 36L16 32L28 28L32 16Z" stroke={accent} strokeWidth="1.3" />
        </svg>
      );
  }
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  kind: 'gold' | 'marigold' | 'rose';
}

export const FloatingPetalsCanvas: React.FC<{ density?: number; className?: string }> = ({
  density = 22,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const kinds: Particle['kind'][] = ['gold', 'marigold', 'rose'];
    const particles: Particle[] = Array.from({ length: density }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 2.5 + Math.random() * 4.5,
      speedY: 0.25 + Math.random() * 0.45,
      speedX: (Math.random() - 0.5) * 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.018,
      opacity: 0.22 + Math.random() * 0.38,
      kind: kinds[idx % kinds.length],
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.2;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 16) {
          p.y = -16;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 16) p.x = -16;
        if (p.x < -16) p.x = canvas.width + 16;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.kind === 'gold') {
          ctx.fillStyle = '#E6CE97';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'marigold') {
          ctx.fillStyle = '#DDA13B';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#9E2A45';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.05, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
