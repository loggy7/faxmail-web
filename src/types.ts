// src/types.ts
// Forme des données d'une invitation, telle que reçue par la page web depuis
// l'API/Supabase (table `invitations` de l'app mobile). Le code court dans
// l'URL (ex: /i/8Kx72P) sert de clé pour retrouver ces données.

export type InvitationData = {
  id: string;
  code: string; // le code après /i/ dans l'URL, ex: "8Kx72P"
  senderName: string;
  guestName?: string;
  title: string;
  message: string;
  date: string; // déjà formatée côté serveur, ex: "25 Mai 2026"
  time: string; // ex: "18:00"
  location?: string;
  designImageUrl?: string; // image de l'enveloppe choisie par l'expéditeur
  photoUrl?: string;
  themeColor?: string;
  fontFamily?: string;
};

export type ResponseChoice = 'yes' | 'no';
