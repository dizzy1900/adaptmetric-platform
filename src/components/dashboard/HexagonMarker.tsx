interface HexagonMarkerProps {
  isSimulating?: boolean;
  isAdaptation?: boolean;
}

export function HexagonMarker({ isSimulating = false, isAdaptation = false }: HexagonMarkerProps) {
  const gradientId = isAdaptation ? 'hexGradientAdaptation' : 'hexGradientCurrent';
  const glowId = isAdaptation ? 'hexGlowAdaptation' : 'hexGlowCurrent';

  const colors = isAdaptation
    ? { start: '#10b981', middle: '#059669', end: '#047857' }
    : { start: '#fb923c', middle: '#f97316', end: '#ea580c' };

  return (
    <div className={`relative ${isSimulating ? 'animate-pulse-marker' : ''}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.start} stopOpacity="0.9" />
            <stop offset="50%" stopColor={colors.middle} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.end} stopOpacity="1" />
          </radialGradient>

          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hexagon path */}
        <path
          d="M20 4 L32 12 L32 28 L20 36 L8 28 L8 12 Z"
          fill={`url(#${gradientId})`}
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.8"
          filter={`url(#${glowId})`}
        />

        {/* Inner highlight for depth */}
        <path
          d="M20 8 L28 13 L28 27 L20 32 L12 27 L12 13 Z"
          fill="white"
          fillOpacity="0.15"
        />
      </svg>

      <style>{`
        @keyframes pulse-marker {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        .animate-pulse-marker {
          animation: pulse-marker 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
