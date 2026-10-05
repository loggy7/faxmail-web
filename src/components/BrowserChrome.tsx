// src/components/BrowserChrome.tsx
// Barre d'adresse factice façon navigateur mobile, comme sur les captures
// de la maquette ("< faxmail.app/i/8Kx72P  ⋮"). Purement décoratif — le vrai
// navigateur du destinataire affichera sa propre barre par-dessus.

type Props = {
  code: string;
};

export default function BrowserChrome({ code }: Props) {
  return (
    <div className="browser-chrome" aria-hidden="true">
      <span className="browser-chrome-back">‹</span>
      <span className="browser-chrome-url">faxmail.app/i/{code}</span>
      <span className="browser-chrome-menu">⋮</span>
    </div>
  );
}
