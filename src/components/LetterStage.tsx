// src/components/LetterStage.tsx
// Écran 13 de la maquette : la lettre complète, avec le message de
// l'expéditeur, la date/lieu, et un bouton pour passer à la réponse.

import type { InvitationData } from '../types';
import { useEffect, useState } from 'react';
import type { InvitationLanguage } from '../i18n';
import { invitationText } from '../i18n';
import { FlowerIcon } from './DecorativeIcons';

type Props = {
  invitation: InvitationData;
  language: InvitationLanguage;
  onContinue: () => void;
};

export default function LetterStage({ invitation, language, onContinue }: Props) {
  const isBlackAndGold = invitation.themeColor?.toLowerCase() === '#10131c';
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    setVisibleCharacters(0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisibleCharacters(invitation.message.length);
      return;
    }

    const typingDelay = Math.min(28, Math.max(8, 5600 / Math.max(invitation.message.length, 1)));
    const timer = window.setInterval(() => {
      setVisibleCharacters((count) => {
        if (count >= invitation.message.length) {
          window.clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, typingDelay);

    return () => window.clearInterval(timer);
  }, [invitation.message]);

  return (
    <div className={`stage stage-letter ${isBlackAndGold ? 'stage-letter-dark' : ''}`}>
      <div className="letter-card">
        <span className="letter-decoration" aria-hidden="true">
          <FlowerIcon size={30} />
        </span>

        <h1 className="letter-title">{invitation.title} <FlowerIcon size={21} /></h1>

        <p className="letter-greeting">
          {invitation.guestName
            ? `${invitationText(language, 'dear')} ${invitation.guestName},`
            : invitationText(language, 'dearGuest')}
        </p>

        <p className="letter-message" aria-label={invitation.message}>
          <span aria-hidden="true">{invitation.message.slice(0, visibleCharacters)}</span>
          {visibleCharacters < invitation.message.length && <span className="typing-caret" aria-hidden="true" />}
        </p>

        <p className="letter-signoff">
          {invitationText(language, 'signoff')}
          <br />
          {invitation.senderName}
        </p>

        <div className="letter-meta">
          <p className="letter-meta-line">
            {invitation.date} {invitationText(language, 'at')} {invitation.time}
          </p>
          {invitation.location && <p className="letter-meta-line muted">{invitation.location}</p>}
        </div>

        <div className="letter-photo">
          {invitation.photoUrl ? (
            <img src={invitation.photoUrl} alt={invitationText(language, 'photoAlt')} />
          ) : (
            <div className="letter-photo-empty">{invitationText(language, 'noPhoto')}</div>
          )}
        </div>
      </div>

      <button className="primary-button" onClick={onContinue}>
        {invitationText(language, 'replyInvitation')}
      </button>
    </div>
  );
}
