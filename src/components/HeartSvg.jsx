export default function HeartSvg({ className = '' }) {
  return (
    <svg className={`heart-svg ${className}`} viewBox="0 0 120 108" role="img" aria-label="Glowing heart">
      <path
        d="M60 100 C30 76 8 58 8 32 C8 16 20 6 35 6 C46 6 55 13 60 23 C65 13 74 6 85 6 C100 6 112 16 112 32 C112 58 90 76 60 100 Z"
        pathLength="1"
      />
    </svg>
  );
}
