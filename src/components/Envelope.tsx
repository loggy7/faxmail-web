// src/components/Envelope.tsx
// Enveloppe illustrée en SVG (cachet de cire cœur, fermée par défaut).
// isOpen contrôle l'animation d'ouverture : le rabat pivote et la lettre
// blanche glisse vers le haut, avec une lueur douce derrière.
// Tout est dessiné en SVG plutôt qu'avec une photo pour rester léger,
// net à toutes les résolutions, et animable proprement en CSS.

import type { InvitationLanguage } from '../i18n';
import { invitationText } from '../i18n';
import { FlowerIcon } from './DecorativeIcons';

type Props = {
  isOpen: boolean;
  isOpening?: boolean;
  language: InvitationLanguage;
};

export default function Envelope({ isOpen, isOpening = false, language }: Props) {
  return (
    <div className={`envelope-stage ${isOpening ? 'is-opening' : ''} ${isOpen ? 'is-open' : ''}`}>
      <div className="envelope-glow" aria-hidden="true" />

      <svg
        viewBox="0 0 280 220"
        className="envelope-svg"
        role="img"
        aria-label={invitationText(language, 'envelopeAlt')}
      >
        {/* Dos de l'enveloppe, puis la feuille est prise entre les deux plis. */}
        <path className="envelope-back" d="M15 62h250a5 5 0 0 1 5 5v137a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V67a5 5 0 0 1 5-5Z" fill="url(#envelopePaper)" />

        <g className="envelope-letter">
          <rect x="43" y="25" width="194" height="142" rx="3" fill="#FFFDF8" />
          <path d="M55 39h170" stroke="#E4D6D0" strokeWidth="1.5" />
          <path d="M64 62h145M64 75h145M64 88h104" stroke="#E9DCD6" strokeWidth="2" strokeLinecap="round" />
          <path d="M43 25l97 78 97-78" fill="none" stroke="#EEE3DC" strokeWidth="1" />
        </g>

        {/* Poche avant : elle masque la partie basse de la lettre pendant sa sortie. */}
        <path className="envelope-pocket" d="M10 76l130 91L270 76v128a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6Z" fill="url(#envelopePocket)" />
        <path className="envelope-fold envelope-fold-left" d="M10 76l130 91L10 205Z" fill="#C95F7C" opacity="0.2" />
        <path className="envelope-fold envelope-fold-right" d="M270 76l-130 91 130 38Z" fill="#8E2947" opacity="0.12" />

        {/* Rabat avant : pivote autour de sa base pour s'ouvrir vers l'arrière. */}
        <g className="envelope-flap" style={{ transformOrigin: '140px 60px' }}>
          <path d="M10 62h260L140 151Z" fill="url(#envelopeFlap)" />
          <path d="M14 65l126 86L266 65" fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
        </g>

        {/* Cachet de cire posé sur la pointe du rabat. */}
        <g className="envelope-seal">
          <path
            className="seal-wax"
            d="M140 130c7 0 16 3 20 9 5 7 4 17 0 24-5 8-14 11-22 10-10 0-18-4-22-11-4-7-3-17 2-24 5-6 14-8 22-8Z"
            fill="#741C32"
          />
          <path
            className="seal-wax-edge"
            d="M121 137c4-5 11-7 18-7m12 3c5 3 8 7 9 12m-3 20c-4 5-10 8-16 8"
            fill="none"
            stroke="#A6415C"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            className="seal-crack"
            d="M140 130l-3 8 5 6-6 8 5 7-3 12M137 144l-7-4M141 152l8-5"
            fill="none"
            stroke="#E9A0B4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="seal-mark"
            d="M133 151h14m-11-6v12m8-12v12"
            fill="none"
            stroke="#A94760"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        <defs>
          <linearGradient id="envelopePaper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F29AB5" />
            <stop offset="0.52" stopColor="#E47798" />
            <stop offset="1" stopColor="#B94768" />
          </linearGradient>
          <linearGradient id="envelopePocket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E982A1" />
            <stop offset="1" stopColor="#C34D70" />
          </linearGradient>
          <linearGradient id="envelopeFlap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5AEC4" />
            <stop offset="1" stopColor="#D86688" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pétales décoratifs — un seul accent animé, discret */}
      <span className="petal petal-1"><FlowerIcon size={24} /></span>
      <span className="petal petal-2"><FlowerIcon size={19} /></span>
      <span className="petal petal-3"><FlowerIcon size={17} /></span>
    </div>
  );
}
