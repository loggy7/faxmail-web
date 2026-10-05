# Faxmail Web — Expérience destinataire

Page web (React + TypeScript + Vite) affichée quand un invité ouvre un lien
`invite.app/i/CODE`. Reproduit les écrans 11 à 14 de la maquette : enveloppe
fermée → animation d'ouverture → lettre → réponse Oui/Non.

## Installation (avec Bun)

```bash
bun install
bun run dev
```

Ouvre ensuite `http://localhost:5173/i/8Kx72P` (n'importe quel code fonctionne,
les données sont mockées pour l'instant — voir `src/hooks/useInvitation.ts`).

## Build de production

```bash
bun run build
bun run preview
```

## Arborescence

```
src/
  types.ts                    # Forme des données InvitationData
  hooks/
    useInvitation.ts          # Fetch par code — mock à remplacer par Supabase
  components/
    InvitationPage.tsx        # Orchestrateur : lit l'URL, gère la "scène" active
    BrowserChrome.tsx         # Barre d'adresse factice (décorative)
    EnvelopeStage.tsx         # Écrans 11-12 : enveloppe fermée + ouverture
    Envelope.tsx              # L'enveloppe en SVG animé (rabat, lettre, cachet)
    LetterStage.tsx           # Écran 13 : lettre complète
    ResponseStage.tsx         # Écran 14 : Oui/Non + remerciement
  styles/
    global.css                # Palette, typographie, animations, responsive
```

## Brancher les vraies données (Supabase)

1. Dans `src/hooks/useInvitation.ts`, remplace le mock par :
   ```ts
   const { data, error } = await supabase
     .from('invitations')
     .select('*')
     .eq('code', code)
     .single();
   ```
2. Dans `src/components/InvitationPage.tsx`, la fonction `handleRespond` doit
   faire un vrai insert :
   ```ts
   await supabase.from('responses').insert({ invitation_id: invitation.id, choice });
   ```
   C'est cet insert qui doit déclencher la mise à jour Realtime dans l'app
   mobile du créateur (déjà prévu côté mobile dans `InvitationDetailScreen`).
3. Pour utiliser les vraies images d'enveloppe (celles de l'app mobile) plutôt
   que le SVG généré, ajoute un champ `designImageUrl` dans les données et
   remplace le contenu de `Envelope.tsx` par une balise `<img>` — dans ce cas
   il faudra recréer l'animation d'ouverture avec un calque letter séparé
   qui glisse par-dessus l'image (plus complexe qu'avec du SVG pur).

## Déploiement

N'importe quel hébergeur de sites statiques fonctionne (Vercel, Netlify,
Cloudflare Pages...). Une seule chose à configurer : les rewrites doivent
rediriger toutes les routes vers `index.html` pour que `/i/CODE` fonctionne
au rechargement (c'est une SPA avec React Router).

Exemple pour Netlify (`public/_redirects`) :
```
/*  /index.html  200
```
