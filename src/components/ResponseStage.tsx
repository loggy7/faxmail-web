// src/components/ResponseStage.tsx
// Écran 14 : boutons Oui/Non, puis état de remerciement une fois répondu.
// onRespond doit envoyer la réponse au backend (Supabase) — la réponse
// remonte alors en temps réel dans l'app mobile du créateur via Realtime.

import { useState } from 'react';
import type { ResponseChoice } from '../types';
import type { InvitationLanguage } from '../i18n';
import { invitationText } from '../i18n';
import { CelebrationIcon, EnvelopeIcon, HeartIcon, ThanksIcon } from './DecorativeIcons';
import type { CSSProperties } from 'react';

type Props = {
  language: InvitationLanguage;
  onRespond: (choice: ResponseChoice) => Promise<void> | void;
  onRestart: () => void;
};

export default function ResponseStage({ language, onRespond, onRestart }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [choice, setChoice] = useState<ResponseChoice | null>(null);
  const [error, setError] = useState(false);
  const fireworkParticles = Array.from({ length: 88 }, (_, index) => {
    const burst = Math.floor(index / 22);
    const angle = ((index % 22) * 360) / 22 + burst * 11;
    const distance = 54 + ((index * 37) % 88);
    const radians = (angle * Math.PI) / 180;
    const origins = [
      { x: 18, y: 27 },
      { x: 79, y: 31 },
      { x: 28, y: 65 },
      { x: 74, y: 70 },
    ];
    const origin = origins[burst];
    return {
      '--origin-x': `${origin.x}%`,
      '--origin-y': `${origin.y}%`,
      '--travel-x': `${Math.cos(radians) * distance}px`,
      '--travel-y': `${Math.sin(radians) * distance}px`,
      '--particle-hue': `${(index * 47 + 12) % 360}`,
      '--particle-delay': `${burst * 110}ms`,
    } as CSSProperties;
  });

  const handleChoice = async (value: ResponseChoice) => {
    if (status !== 'idle') return;
    setStatus('sending');
    setChoice(value);
    try {
      await onRespond(value);
      setStatus('sent');
    } catch {
      setError(true);
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <div className={`stage stage-response ${choice === 'yes' ? 'is-accepted' : ''}`}>
        {choice === 'yes' && (
          <div className="confetti" aria-hidden="true">
            {fireworkParticles.map((style, index) => <span key={index} style={style} />)}
          </div>
        )}
        <span className="response-emoji" aria-hidden="true">
          {choice === 'yes' ? <CelebrationIcon size={46} /> : <EnvelopeIcon size={46} />}
        </span>
        <h1 className="response-title">
          {choice === 'yes'
            ? invitationText(language, 'thanksSoon')
            : invitationText(language, 'thanksNo')}
        </h1>
        <p className="response-subtitle">{invitationText(language, 'responseThanks')} <ThanksIcon size={23} /></p>
        <button className="restart-button" onClick={onRestart}>
          {invitationText(language, 'restart')}
        </button>
      </div>
    );
  }

  return (
    <div className="stage stage-response">
      <h1 className="response-title">{invitationText(language, 'acceptQuestion')}</h1>
      <span className="response-emoji" aria-hidden="true"><HeartIcon size={34} /></span>

      <button
        className="response-button response-button-yes"
        onClick={() => handleChoice('yes')}
        disabled={status === 'sending'}
      >
        {invitationText(language, 'accept')} <HeartIcon size={17} />
      </button>

      <button
        className="response-button response-button-no"
        onClick={() => handleChoice('no')}
        disabled={status === 'sending'}
      >
        {invitationText(language, 'decline')}
      </button>
      {error && <p className="response-error" role="alert">{invitationText(language, 'responseError')}</p>}
    </div>
  );
}
