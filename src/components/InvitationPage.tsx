// src/components/InvitationPage.tsx
// Orchestrateur des 4 écrans destinataire (11 à 14). Lit le code depuis
// l'URL, charge l'invitation, et fait avancer un état de "scène" simple.

import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useInvitation } from '../hooks/useInvitation';
import type { ResponseChoice } from '../types';
import { getInvitationLanguage, invitationText } from '../i18n';
import BrowserChrome from './BrowserChrome';
import EnvelopeStage from './EnvelopeStage';
import LetterStage from './LetterStage';
import ResponseStage from './ResponseStage';
import { EnvelopeIcon } from './DecorativeIcons';
import type { CSSProperties } from 'react';

type Scene = 'envelope' | 'letter' | 'response';

export default function InvitationPage() {
  const { code } = useParams<{ code: string }>();
  const [searchParams] = useSearchParams();
  const language = getInvitationLanguage(searchParams.get('lang'));
  const { invitation, isLoading, error } = useInvitation(code);
  const [scene, setScene] = useState<Scene>('envelope');

  const handleRespond = async (choice: ResponseChoice) => {
    if (!code || !invitation) {
      throw new Error(invitationText(language, 'invitationNotFound'));
    }

    const { error } = await supabase.rpc('submit_invitation_response', {
      p_code: code,
      p_choice: choice,
    });

    if (error) {
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="page-shell">
        <div className="phone-frame">
          <div className="stage stage-loading">
            <span className="loading-heart" aria-hidden="true">
              <EnvelopeIcon size={48} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="page-shell">
        <div className="phone-frame">
          <div className="stage stage-error">
            <h1 className="response-title">{invitationText(language, 'invitationNotFound')}</h1>
            <p className="response-subtitle">{invitationText(language, 'invalidLink')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div
        className="phone-frame"
        style={{
          '--invitation-color': invitation.themeColor || '#E85D8A',
          '--invitation-font': invitation.fontFamily || 'sans-serif',
        } as CSSProperties}
      >
        <BrowserChrome code={invitation.code} />

        {scene === 'envelope' && (
          <EnvelopeStage
            senderName={invitation.senderName}
            language={language}
            onOpened={() => setScene('letter')}
          />
        )}

        {scene === 'letter' && (
          <LetterStage invitation={invitation} language={language} onContinue={() => setScene('response')} />
        )}

        {scene === 'response' && (
          <ResponseStage language={language} onRespond={handleRespond} onRestart={() => setScene('envelope')} />
        )}
      </div>
    </div>
  );
}
