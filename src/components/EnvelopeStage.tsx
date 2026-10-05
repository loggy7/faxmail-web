// src/components/EnvelopeStage.tsx
// Réunit les écrans 11 (fermée) et 12 (animation d'ouverture) de la maquette.
// Au tap, isOpening passe à true -> l'enveloppe joue son animation CSS ->
// après ANIMATION_DURATION_MS, onOpened() est appelé pour passer à la lettre.

import { useState } from 'react';
import type { InvitationLanguage } from '../i18n';
import { invitationText } from '../i18n';
import Envelope from './Envelope';
import { HeartIcon } from './DecorativeIcons';

const ANIMATION_DURATION_MS = 1400;

type Props = {
  senderName: string;
  language: InvitationLanguage;
  onOpened: () => void;
};

export default function EnvelopeStage({ senderName, language, onOpened }: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const sentYou = invitationText(language, 'sentYou');

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(onOpened, ANIMATION_DURATION_MS);
  };

  return (
    <div className="stage stage-envelope">
      <Envelope language={language} isOpen={isOpening} isOpening={isOpening} />

      <div className={`envelope-caption ${isOpening ? 'is-fading' : ''}`}>
        <p className="envelope-caption-title">
          {senderName ? `${senderName} ${sentYou}` : invitationText(language, 'senderUnknown')}
          <br />
          {invitationText(language, 'specialInvitation')} <HeartIcon size={16} />
        </p>

        <button className="open-button" onClick={handleOpen} disabled={isOpening} aria-label={invitationText(language, 'openLetter')}>
          <span>{invitationText(language, 'openLetter')}</span>
          <span className="open-arrow" aria-hidden="true">
            ↳
          </span>
        </button>
      </div>
    </div>
  );
}
