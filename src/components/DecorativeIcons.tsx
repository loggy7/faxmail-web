type IconProps = {
  size?: number;
  className?: string;
};

export function FlowerIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg className={`svg-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 11.5c-3.4-5.8-8.2-4.5-7.5-.8.4 2.1 2 3.3 4.2 3.5-1.2 2.2-.6 4.2 1.1 4.7 2.2.6 3.2-1.1 4.2-3.1 1.3 1.7 3 2.7 4.5 1.5 1.4-1.1.8-3-1-4.6 2.3-.2 3.8-1.5 3.5-3.4-.5-3.1-4.9-3.8-7.5 2.2Z" fill="currentColor" opacity="0.82" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path d="M12 14v7m0 0c-1.8-1.2-3.3-1.2-4.7-.4M12 18c1.5-1.1 2.9-1.2 4.5-.7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg className={`svg-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20.2S4.2 15.7 4.2 9.8A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 7.8 2.6c0 5.9-7.8 10.4-7.8 10.4Z" fill="currentColor" />
    </svg>
  );
}

export function EnvelopeIcon({ size = 42, className = '' }: IconProps) {
  return (
    <svg className={`svg-icon ${className}`} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="6" y="10" width="36" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="m7 13 17 14 17-14M7 35l12-11m22 11L29 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CelebrationIcon({ size = 46, className = '' }: IconProps) {
  return (
    <svg className={`svg-icon ${className}`} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="m13 35 7-18 5 5-7 18a3 3 0 0 1-5-5Z" fill="currentColor" opacity="0.85" />
      <path d="m22 17 5-5 9 9-5 5-9-9Z" fill="currentColor" />
      <path d="M8 14h5m-2.5-2.5v5M35 8h5m-2.5-2.5v5M35 33l4 4m0-4-4 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ThanksIcon({ size = 30, className = '' }: IconProps) {
  return (
    <svg className={`svg-icon ${className}`} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 28S5 21.8 5 13.7C5 9.1 10.6 7 13.3 11c2.7-4 8.7-1.9 8.7 2.7C22 21.8 16 28 16 28Z" fill="currentColor" opacity="0.8" />
      <path d="M3 8 1.5 6.5M29 8l1.5-1.5M4 16H1.5m29 0H28.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}