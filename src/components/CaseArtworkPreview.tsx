import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { ArtworkPreviewVariant } from '../types/store';

interface CaseArtworkPreviewProps {
  title: string;
  imageUrl?: string;
  hasRealPhoto: boolean;
  artworkVariant: ArtworkPreviewVariant;
  cropPosition?: string;
  scale?: number;
  className?: string;
}

export const CaseArtworkPreview: React.FC<CaseArtworkPreviewProps> = ({
  title,
  imageUrl,
  hasRealPhoto,
  artworkVariant,
  cropPosition = 'center center',
  scale = 1,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  if (hasRealPhoto && imageUrl && !imgError) {
    return (
      <div
        className={`relative w-full h-full bg-[#FBF9F5] flex items-center justify-center overflow-hidden ${className}`}
      >
        <img
          src={imageUrl}
          alt={`Funda Pampa Cases ${title}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          style={{
            objectPosition: cropPosition,
            transform: scale > 1 ? `scale(${scale})` : undefined,
          }}
          className="w-full h-full object-contain p-4 transition-transform duration-300"
        />
      </div>
    );
  }

  // Fallback / Demo architectural SVG preview for placeholder catalog designs
  return (
    <div
      className={`relative w-full h-full bg-[#EFEAE0] flex items-center justify-center p-5 overflow-hidden ${className}`}
    >
      {imgError ? (
        <div className="flex flex-col items-center gap-2 text-[#5C574E]">
          <Smartphone className="w-8 h-8 text-[#C6A15B]" aria-hidden="true" />
          <span className="text-xs font-medium">{title}</span>
        </div>
      ) : (
        <DemoCaseSvg variant={artworkVariant} title={title} />
      )}
    </div>
  );
};

const DemoCaseSvg: React.FC<{ variant: ArtworkPreviewVariant; title: string }> = ({
  variant,
  title,
}) => {
  const paletteByVariant: Record<
    ArtworkPreviewVariant,
    { bg: string; accent: string; accent2: string; ink: string }
  > = {
    'sol-de-mayo': { bg: '#8EC9E8', accent: '#F7F4EE', accent2: '#C6A15B', ink: '#1C1A17' },
    'obelisco-diagonal': { bg: '#F7F4EE', accent: '#8EC9E8', accent2: '#C6A15B', ink: '#1C1A17' },
    'mate-manana': { bg: '#EFE8DA', accent: '#C6A15B', accent2: '#8EC9E8', ink: '#1C1A17' },
    'fileteado-colectivo': { bg: '#212529', accent: '#8EC9E8', accent2: '#C6A15B', ink: '#F7F4EE' },
    'cordillera-austral': { bg: '#DCEBF4', accent: '#8EC9E8', accent2: '#C6A15B', ink: '#1C1A17' },
    'postal-san-telmo': { bg: '#F4EFE4', accent: '#C6A15B', accent2: '#8EC9E8', ink: '#1C1A17' },
  };

  const p = paletteByVariant[variant];

  return (
    <svg
      viewBox="0 0 220 380"
      role="img"
      aria-label={`Vista previa ilustrativa de funda ${title}`}
      className="h-full max-h-[280px] w-auto drop-shadow-[0_12px_20px_rgba(28,26,23,0.12)]"
    >
      {/* Outer case shell */}
      <rect
        x="24"
        y="14"
        width="172"
        height="352"
        rx="32"
        fill={p.bg}
        stroke="#D4CBB8"
        strokeWidth="2.5"
      />

      {/* Camera island */}
      <rect
        x="38"
        y="28"
        width="66"
        height="68"
        rx="16"
        fill="#D6D3CD"
        stroke="#B9B3A6"
        strokeWidth="1.5"
      />
      <circle cx="56" cy="47" r="11" fill="#2A2927" stroke="#8C867B" strokeWidth="2" />
      <circle cx="56" cy="76" r="11" fill="#2A2927" stroke="#8C867B" strokeWidth="2" />
      <circle cx="85" cy="61" r="11" fill="#2A2927" stroke="#8C867B" strokeWidth="2" />
      <circle cx="85" cy="40" r="4" fill="#F7F4EE" />

      {/* Artwork per variant */}
      {variant === 'obelisco-diagonal' && (
        <g>
          <path d="M25 230 L195 160 L195 340 L25 340 Z" fill={p.accent} fillOpacity="0.35" />
          <path d="M104 128 L116 128 L121 295 L99 295 Z" fill={p.ink} />
          <polygon points="110,112 104,128 116,128" fill={p.accent2} />
          <line x1="56" y1="295" x2="164" y2="295" stroke={p.accent2} strokeWidth="2.5" />
          <text
            x="110"
            y="324"
            textAnchor="middle"
            fontSize="10"
            letterSpacing="2"
            fill={p.ink}
            fontFamily="Georgia, serif"
          >
            BUENOS AIRES
          </text>
        </g>
      )}

      {variant === 'mate-manana' && (
        <g>
          <circle cx="110" cy="212" r="56" fill={p.accent2} fillOpacity="0.22" />
          {/* Bombilla */}
          <line x1="126" y1="150" x2="108" y2="196" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
          {/* Mate cup */}
          <path
            d="M80 198 C 80 190, 140 190, 140 198 C 144 238, 130 264, 110 264 C 90 264, 76 238, 80 198 Z"
            fill={p.accent}
          />
          <rect x="82" y="193" width="56" height="9" rx="4" fill={p.ink} />
          {/* Steam waves */}
          <path d="M98 170 Q 92 158 100 148" stroke={p.ink} strokeWidth="1.8" fill="none" opacity="0.55" />
          <path d="M112 164 Q 106 152 114 142" stroke={p.ink} strokeWidth="1.8" fill="none" opacity="0.55" />
        </g>
      )}

      {variant === 'fileteado-colectivo' && (
        <g>
          <rect x="44" y="135" width="132" height="175" rx="18" fill="none" stroke={p.accent2} strokeWidth="2" />
          <path d="M44 185 C 88 160, 132 210, 176 185" stroke={p.accent} strokeWidth="4" fill="none" />
          <circle cx="110" cy="232" r="34" fill={p.accent} fillOpacity="0.16" stroke={p.accent2} strokeWidth="1.5" />
          <text
            x="110"
            y="243"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill={p.ink}
            fontFamily="Georgia, serif"
          >
            60
          </text>
          <text
            x="110"
            y="292"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="2"
            fill={p.accent2}
          >
            CONSTITUCIÓN · TIGRE
          </text>
        </g>
      )}

      {variant === 'cordillera-austral' && (
        <g>
          <circle cx="144" cy="148" r="18" fill={p.accent2} fillOpacity="0.85" />
          <polygon points="35,275 95,165 142,275" fill="#70A7C8" />
          <polygon points="82,275 135,180 185,275" fill="#4D7E9C" />
          <path
            d="M24 275 C 72 252, 138 292, 196 266 L 196 340 C 196 356 184 366 168 366 L 52 366 C 36 366 24 356 24 340 Z"
            fill={p.accent2}
            fillOpacity="0.8"
          />
        </g>
      )}

      {variant === 'postal-san-telmo' && (
        <g>
          <rect x="46" y="132" width="128" height="184" rx="6" fill="#FBF9F5" stroke={p.accent} strokeWidth="1.8" strokeDasharray="4 4" />
          <rect x="122" y="146" width="38" height="46" fill={p.accent2} fillOpacity="0.3" stroke={p.accent} strokeWidth="1.2" />
          <line x1="60" y1="224" x2="160" y2="224" stroke={p.ink} strokeWidth="1.2" opacity="0.5" />
          <line x1="60" y1="246" x2="146" y2="246" stroke={p.ink} strokeWidth="1.2" opacity="0.5" />
          <line x1="60" y1="268" x2="132" y2="268" stroke={p.ink} strokeWidth="1.2" opacity="0.5" />
          <text
            x="60"
            y="182"
            fontSize="12"
            fontWeight="600"
            fill={p.ink}
            fontFamily="Georgia, serif"
          >
            REPÚBLICA
          </text>
          <text
            x="60"
            y="196"
            fontSize="12"
            fontWeight="600"
            fill={p.ink}
            fontFamily="Georgia, serif"
          >
            ARGENTINA
          </text>
        </g>
      )}
    </svg>
  );
};
