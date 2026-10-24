export default function PumpkinLantern({
  className = '',
  size = 64,
  flicker = true,
  withWitchHat = true,
}) {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ width: size, height: withWitchHat ? size * 1.25 : size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 140"
        className="w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Pumpkin radial gradient */}
          <radialGradient
            id="pumpkinBody"
            cx="50%"
            cy="55%"
            r="45%"
            fx="45%"
            fy="45%"
          >
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="55%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </radialGradient>

          {/* Candle inner flame glow */}
          <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          {/* Hat velvet gradient */}
          <linearGradient id="witchHatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Hat band ribbon */}
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>

        {/* Ambient candle aura */}
        <circle
          cx="60"
          cy="92"
          r="46"
          fill="#f59e0b"
          opacity="0.2"
          filter="blur(14px)"
          className={flicker ? 'animate-pulse' : ''}
        />

        {/* Pumpkin Stem (hidden under hat if withWitchHat) */}
        {!withWitchHat && (
          <path
            d="M58 55 C57 44, 65 38, 70 34 C69 44, 63 48, 62 55 Z"
            fill="#15803d"
            stroke="#14532d"
            strokeWidth="1.5"
          />
        )}

        {/* Pumpkin Back Ribs */}
        <ellipse cx="60" cy="95" rx="46" ry="34" fill="#9a3412" />
        <ellipse cx="40" cy="95" rx="34" ry="33" fill="#c2410c" />
        <ellipse cx="80" cy="95" rx="34" ry="33" fill="#c2410c" />

        {/* Pumpkin Main Front Body */}
        <ellipse cx="60" cy="96" rx="36" ry="33" fill="url(#pumpkinBody)" />
        <ellipse cx="42" cy="96" rx="26" ry="32" fill="url(#pumpkinBody)" />
        <ellipse cx="78" cy="96" rx="26" ry="32" fill="url(#pumpkinBody)" />
        <ellipse cx="60" cy="96" rx="20" ry="31" fill="url(#pumpkinBody)" />

        {/* Carved Glowing Eyes (triangle shapes) */}
        <g className={flicker ? 'animate-pulse' : ''}>
          {/* Left Eye */}
          <polygon
            points="42,82 54,84 46,94"
            fill="url(#candleGlow)"
            stroke="#78350f"
            strokeWidth="1.2"
          />
          {/* Right Eye */}
          <polygon
            points="78,82 66,84 74,94"
            fill="url(#candleGlow)"
            stroke="#78350f"
            strokeWidth="1.2"
          />

          {/* Carved Nose */}
          <polygon
            points="60,93 56,101 64,101"
            fill="url(#candleGlow)"
            stroke="#78350f"
            strokeWidth="1"
          />

          {/* Jagged Jack-o'-lantern Grin with fangs */}
          <path
            d="M38 108 
               Q 44 116, 50 111 
               L 52 115 
               Q 60 120, 68 115 
               L 70 111 
               Q 76 116, 82 108 
               Q 76 126, 60 126 
               Q 44 126, 38 108 Z"
            fill="url(#candleGlow)"
            stroke="#78350f"
            strokeWidth="1.5"
          />
          {/* Top fangs carved */}
          <polygon points="50,111 53,116 56,111" fill="#78350f" />
          <polygon points="64,111 67,116 70,111" fill="#78350f" />
        </g>

        {/* Witch Hat */}
        {withWitchHat && (
          <g>
            {/* Crooked pointy hat cone */}
            <path
              d="M60 12 
                 C 55 24, 46 42, 38 58 
                 C 34 66, 30 70, 24 74 
                 C 36 73, 84 73, 96 74 
                 C 90 70, 86 66, 82 58 
                 C 74 42, 65 24, 60 12 Z"
              fill="url(#witchHatGrad)"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Bent tip with star or patch */}
            <path
              d="M60 12 C 58 8, 52 6, 46 8 C 50 12, 56 12, 60 14 Z"
              fill="#312e81"
            />

            {/* Hat Brim */}
            <ellipse
              cx="60"
              cy="74"
              rx="46"
              ry="11"
              fill="url(#witchHatGrad)"
              stroke="#0f172a"
              strokeWidth="2"
            />

            {/* Purple Ribbon Band */}
            <path
              d="M36 71 C 44 73, 76 73, 84 71 L 85 64 C 77 66, 43 66, 35 64 Z"
              fill="url(#ribbonGrad)"
            />

            {/* Gold Buckle */}
            <rect
              x="54"
              y="63"
              width="12"
              height="10"
              rx="2"
              fill="#fbbf24"
              stroke="#b45309"
              strokeWidth="1.5"
            />
            <rect
              x="57"
              y="65"
              width="6"
              height="6"
              rx="1"
              fill="#4338ca"
            />
          </g>
        )}
      </svg>
    </div>
  )
}
