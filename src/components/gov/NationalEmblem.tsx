import React from 'react';

export default function NationalEmblem({ className = 'w-8 h-10' }: { className?: string }) {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Authentic Ashoka Lion Capital / Emblem of India Silhouette Vector */}
      <svg
        viewBox="0 0 100 125"
        fill="currentColor"
        className="w-full h-full text-amber-400 drop-shadow-2xs"
        aria-label="Emblem of India"
      >
        {/* Ashoka Chakra & Lions Stylized Emblem Geometry */}
        <circle cx="50" cy="88" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="88" r="2" fill="currentColor" />
        {/* Base Pedestal */}
        <rect x="22" y="98" width="56" height="6" rx="2" fill="currentColor" />
        <rect x="15" y="106" width="70" height="8" rx="2" fill="currentColor" />
        {/* Lions / Pillar Silhouette */}
        <path
          d="M32 30 C32 18, 42 12, 50 12 C58 12, 68 18, 68 30 C68 40, 62 48, 62 58 L66 78 C66 82, 34 82, 34 78 L38 58 C38 48, 32 40, 32 30 Z"
          fill="currentColor"
        />
        {/* Left Lion Head */}
        <path
          d="M26 34 C20 34, 18 42, 22 50 C26 58, 34 60, 38 58 L36 74 C30 74, 22 66, 20 54 C18 40, 22 28, 30 26 Z"
          fill="currentColor"
        />
        {/* Right Lion Head */}
        <path
          d="M74 34 C80 34, 82 42, 78 50 C74 58, 66 60, 62 58 L64 74 C70 74, 78 66, 80 54 C82 40, 78 28, 70 26 Z"
          fill="currentColor"
        />
        {/* Satyameva Jayate Banner */}
        <text
          x="50"
          y="122"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill="currentColor"
          fontFamily="serif"
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
}
