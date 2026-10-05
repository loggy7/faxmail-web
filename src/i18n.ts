export type InvitationLanguage = 'fr' | 'en' | 'es' | 'pt';

type InvitationTextKey =
  | 'invitationNotFound'
  | 'invalidLink'
  | 'envelopeAlt'
  | 'senderUnknown'
  | 'sentYou'
  | 'specialInvitation'
  | 'openLetter'
  | 'dearGuest'
  | 'dear'
  | 'signoff'
  | 'at'
  | 'photoAlt'
  | 'noPhoto'
  | 'replyInvitation'
  | 'thanksSoon'
  | 'thanksNo'
  | 'responseThanks'
  | 'responseError'
  | 'restart'
  | 'acceptQuestion'
  | 'accept'
  | 'decline';

const supportedLanguages: InvitationLanguage[] = ['fr', 'en', 'es', 'pt'];

const copy: Record<InvitationLanguage, Record<InvitationTextKey, string>> = {
  fr: {
    invitationNotFound: 'Invitation introuvable',
    invalidLink: 'Ce lien n’est plus valide ou a expiré.',
    envelopeAlt: 'Enveloppe rose avec cachet de cire en forme de cœur',
    senderUnknown: 'Quelqu’un t’a envoyé',
    sentYou: 't’a envoyé',
    specialInvitation: 'une invitation spéciale',
    openLetter: 'Ouvre la lettre',
    dearGuest: 'Chère invitée,',
    dear: 'Chère',
    signoff: 'À très bientôt,',
    at: 'à',
    photoAlt: 'Photo de l’invitation',
    noPhoto: 'Aucune photo ajoutée',
    replyInvitation: 'Répondre à l’invitation',
    thanksSoon: 'Merci, à très vite !',
    thanksNo: 'Merci pour ta réponse',
    responseThanks: 'Votre réponse a été envoyée',
    responseError: 'Votre réponse n’a pas pu être enregistrée. Réessayez.',
    restart: 'Recommencer',
    acceptQuestion: 'Acceptez-vous cette invitation ?',
    accept: 'Oui, j’accepte',
    decline: 'Non, je ne peux pas',
  },
  en: {
    invitationNotFound: 'Invitation not found',
    invalidLink: 'This link is no longer valid or has expired.',
    envelopeAlt: 'Pink envelope with a heart-shaped wax seal',
    senderUnknown: 'Someone sent you',
    sentYou: 'sent you',
    specialInvitation: 'a special invitation',
    openLetter: 'Open the letter',
    dearGuest: 'Dear guest,',
    dear: 'Dear',
    signoff: 'See you soon,',
    at: 'at',
    photoAlt: 'Invitation photo',
    noPhoto: 'No photo added',
    replyInvitation: 'Reply to the invitation',
    thanksSoon: 'Thank you, see you soon!',
    thanksNo: 'Thank you for your response',
    responseThanks: 'Your response has been sent',
    responseError: 'Your response could not be saved. Please try again.',
    restart: 'Start again',
    acceptQuestion: 'Do you accept this invitation?',
    accept: 'Yes, I accept',
    decline: 'No, I can’t',
  },
  es: {
    invitationNotFound: 'Invitación no encontrada',
    invalidLink: 'Este enlace ya no es válido o ha caducado.',
    envelopeAlt: 'Sobre rosa con un sello de cera en forma de corazón',
    senderUnknown: 'Alguien te envió',
    sentYou: 'te envió',
    specialInvitation: 'una invitación especial',
    openLetter: 'Abre la carta',
    dearGuest: 'Hola,',
    dear: 'Hola',
    signoff: 'Hasta pronto,',
    at: 'a las',
    photoAlt: 'Foto de la invitación',
    noPhoto: 'No se añadió ninguna foto',
    replyInvitation: 'Responder a la invitación',
    thanksSoon: '¡Gracias, nos vemos pronto!',
    thanksNo: 'Gracias por tu respuesta',
    responseThanks: 'Tu respuesta ha sido enviada',
    responseError: 'No se pudo guardar tu respuesta. Inténtalo de nuevo.',
    restart: 'Volver a empezar',
    acceptQuestion: '¿Aceptas esta invitación?',
    accept: 'Sí, acepto',
    decline: 'No puedo',
  },
  pt: {
    invitationNotFound: 'Convite não encontrado',
    invalidLink: 'Este link não é mais válido ou expirou.',
    envelopeAlt: 'Envelope rosa com um selo de cera em forma de coração',
    senderUnknown: 'Alguém enviou a você',
    sentYou: 'enviou a você',
    specialInvitation: 'um convite especial',
    openLetter: 'Abra a carta',
    dearGuest: 'Olá,',
    dear: 'Olá',
    signoff: 'Até breve,',
    at: 'às',
    photoAlt: 'Foto do convite',
    noPhoto: 'Nenhuma foto adicionada',
    replyInvitation: 'Responder ao convite',
    thanksSoon: 'Obrigado, até logo!',
    thanksNo: 'Obrigado pela sua resposta',
    responseThanks: 'Sua resposta foi enviada',
    responseError: 'Não foi possível salvar sua resposta. Tente novamente.',
    restart: 'Recomeçar',
    acceptQuestion: 'Você aceita este convite?',
    accept: 'Sim, aceito',
    decline: 'Não posso',
  },
};

export function getInvitationLanguage(preferredLanguage?: string | null): InvitationLanguage {
  if (preferredLanguage) {
    const normalizedPreferred = preferredLanguage.toLowerCase().split(/[-_]/)[0];
    if (supportedLanguages.includes(normalizedPreferred as InvitationLanguage)) {
      return normalizedPreferred as InvitationLanguage;
    }
  }

  const locale = typeof navigator === 'undefined' ? 'fr' : navigator.language ?? 'fr';
  const normalized = locale.toLowerCase().split(/[-_]/)[0];

  if (normalized === 'fr') {
    return 'fr';
  }

  return 'fr';
}

export function invitationText(language: InvitationLanguage, key: InvitationTextKey): string {
  return copy[language][key];
}
