// src/hooks/useInvitation.ts
// Récupère les données d'une invitation à partir de son code court.
// TODO: remplacer le mock par un vrai fetch, ex:
//   const { data } = await supabase.from('invitations').select('*').eq('code', code).single();

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { InvitationData } from '../types';

type UseInvitationResult = {
  invitation: InvitationData | null;
  isLoading: boolean;
  error: string | null;
};

const WEB_FONTS: Record<string, string> = {
  'sans-serif': 'Trebuchet MS, sans-serif',
  serif: 'Georgia, serif',
  monospace: 'Courier New, monospace',
  'sans-serif-light': 'Segoe UI Light, Trebuchet MS, sans-serif',
  'sans-serif-medium': 'Segoe UI, Trebuchet MS, sans-serif',
  'sans-serif-condensed': 'Arial Narrow, Trebuchet MS, sans-serif',
  'sans-serif-smallcaps': 'Copperplate, Trebuchet MS, sans-serif',
  'sans-serif-black': 'Impact, Trebuchet MS, sans-serif',
  'serif-bold': 'Palatino Linotype, Georgia, serif',
};

const MOCK_INVITATION: InvitationData = {
  id: 'inv_mock_id',
  code: '8Kx72P',
  senderName: 'Charles',
  guestName: 'Lisa',
  title: 'Une invitation spéciale',
  message:
    "J'aimerais beaucoup que tu sois présente à mon anniversaire. Ta présence rendra cette journée encore plus spéciale. Je t'attends avec impatience !",
  date: '25 Mai 2026',
  time: '18:00',
  location: 'Jacmel, Haïti — Maison familiale, Rue du Bonheur',
};

export function useInvitation(code: string | undefined): UseInvitationResult {
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        if (!code) {
          throw new Error('Code d\'invitation manquant');
        }

        if (!cancelled) {
          if (!isSupabaseConfigured) {
            const params = new URLSearchParams(window.location.search);
            const requestedFont = params.get('font');
            const fontFamily = requestedFont && WEB_FONTS[requestedFont] ? WEB_FONTS[requestedFont] : WEB_FONTS['sans-serif'];
            const requestedColor = params.get('color');
            const themeColor = requestedColor && /^#[0-9a-f]{6}$/i.test(requestedColor) ? requestedColor : undefined;
            const requestedPhoto = params.get('photo');
            const photoUrl = requestedPhoto && /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(requestedPhoto)
              ? requestedPhoto
              : undefined;
            setInvitation({ ...MOCK_INVITATION, code, themeColor, fontFamily, photoUrl });
            return;
          }

          const { data, error } = await supabase.rpc('get_public_invitation', { p_code: code });
          if (error) throw error;

          const invitationData = data as any;
          const params = new URLSearchParams(window.location.search);
          const requestedFont = params.get('font');
          const fontFamily = requestedFont && WEB_FONTS[requestedFont] ? WEB_FONTS[requestedFont] : invitationData?.font_family || WEB_FONTS['sans-serif'];
          const requestedColor = params.get('color');
          const themeColor = requestedColor && /^#[0-9a-f]{6}$/i.test(requestedColor) ? requestedColor : invitationData?.theme_color || undefined;
          const requestedPhoto = params.get('photo');
          const photoUrl = requestedPhoto && /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(requestedPhoto)
            ? requestedPhoto
            : invitationData?.photo_url || undefined;

          setInvitation({
            id: invitationData.id,
            code,
            senderName: invitationData.sender_name || 'Votre ami',
            guestName: invitationData.guest_name,
            title: invitationData.title,
            message: invitationData.message,
            date: invitationData.date,
            time: invitationData.time,
            location: invitationData.location,
            designImageUrl: invitationData.design_image_url,
            photoUrl,
            themeColor,
            fontFamily,
          });
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erreur inconnue');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [code]);

  return { invitation, isLoading, error };
}
